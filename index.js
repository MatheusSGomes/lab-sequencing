import express from 'express';
import 'dotenv/config'
import { startConnectionDatabase } from './connection.js';
import { generateTrackings, getAllTrackings, getNumberOfTrackingsUnassigned, getTrackingByOrder, initTracking, updateStatusTracking } from './repository.js';
import trackingRouter from './routes/routes/tracking.routes.js';
import orderRouter from './routes/routes/order.routes.js';

const app = express()
const port = 3000

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    startConnectionDatabase();
    console.log(`Listening on port ${port}`);
});

app.get('/health', (req, res) => res.send('OK'));

app.use('/tracking', trackingRouter);
app.use('/order', orderRouter);



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
