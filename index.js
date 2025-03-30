import express from 'express';
import 'dotenv/config'
import { startConnectionDatabase } from './connection.js';
import { getAllTrackings } from './repository.js';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    const trackings = getAllTrackings();
    res.send(trackings)
})

app.listen(port, () => {
    startConnectionDatabase();
    console.log(`Listening on port ${port}`)
})

// Regras
// tracking_id será UUID gerado pela própria aplicação
// o sistema ficará sendo executado através de uma cron
// o sistema gerará um número determinado de tracking_id's ex: 200. Eles vão fica aguardando uso.
// quando esse número for menor que o esperado livre 200, a cron irá executar no horário esperado e gerar mais 200 tracking id's.
// caso já tenha 200 tracking id's não gera
// caso tenha menos de 200, ele gera até chegar em 200. Ex: 150 tracking id's sem uso, o sistema gera 50 para completar 200.

// API Design
// Get getTracking {
//     tracking_id
//     order_id
//     freightcarrier_id
//     status
//     shipping_date
// }

// Post initTracking {
//     order_id
//     freightcarrier_id
// }

// Post chageTrackingStatus {
//     tracking_id
//     status // de 'Em transito' para 'Entregue'
//     shipping_date // Atualiza para a data da entrega
// }
