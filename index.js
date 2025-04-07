import express from 'express';
import 'dotenv/config'
import { startConnectionDatabase } from './connection.js';
import { generateTrackings, getAllTrackings, getNumberOfTrackingsUnassigned, getTrackingByOrder, initTracking, updateStatusTracking } from './repository.js';

const app = express()
const port = 3000

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    startConnectionDatabase();
    console.log(`Listening on port ${port}`);
});

app.get('/health', (req, res) => res.send('OK'));

app.get('/trackings', (req, res) =>
    getAllTrackings().then(trackings =>
        res.send(trackings))
);

app.post('/assign-tracking', (req, res) => {
    const orderId = req.body.order_id;
    const freightcarrierId = req.body.freightcarrier_id;

    getTrackingByOrder(orderId).then(order => {
        if (order.length) {
            res.send('Order already tracking');
            process.exit();
        }
    }).catch(console.log);

    initTracking(orderId, freightcarrierId).then(insert =>{
        if (insert.rowCount >= 1){
            res.send('Created tracking');
            process.exit();
        }
    }).catch(console.log);
});

app.post('/generate-trackings', (req, res) => {
    let desiredNumberGenerateTrackingsIds = 200;

    getNumberOfTrackingsUnassigned().then(number => {
        const numTrackingsUnassigned = number.rows[0].count;

        if (numTrackingsUnassigned <= 200) {
            const numberToGenerate =
                (desiredNumberGenerateTrackingsIds - numTrackingsUnassigned);

            desiredNumberGenerateTrackingsIds = numberToGenerate;
        } else {
            desiredNumberGenerateTrackingsIds = 0;
        }

        return desiredNumberGenerateTrackingsIds;
    }).then(() =>

        // TODO: Verificar se o UUID gerado já não existe no banco.

        // TODO: Passar transaction para fora da Repository
        // Exemplo:
        // try {
        //      repository.beginTransaction()
        //      for (numberOf) {
        //          // VERIFICA SE O UUID JÁ EXISTE NO BANCO
        //          repository.generateTrackings(uuid)
        //      }
        //      repository.commitTransaction()
        // } catch (error) {
        //      repository.rollbackTransaction()
        // }

        generateTrackings(desiredNumberGenerateTrackingsIds).then(() =>
                res.send(`Trackings generated`))
    ).catch(console.log);
});


app.put('/order/received', (req, res) => {
    const tracking_id = req.body.tracking_id;
    const status = 'Recebido';

    updateStatusTracking(status, tracking_id).then(tracking =>
        res.send('Tracking update to in transit')).catch(console.log)
});

app.put('/order/transit', (req, res) => {
    const tracking_id = req.body.tracking_id;
    const status = 'Em trânsito';

    updateStatusTracking(status, tracking_id).then(tracking =>
        res.send('Tracking update to in transit')).catch(console.log)
});

app.put('/order/delivered', (req, res) => {
    const tracking_id = req.body.tracking_id;
    const status = 'Entregue';

    updateStatusTracking(status, tracking_id).then(tracking =>
        res.send('Tracking update to delivered')).catch(console.log)
});
