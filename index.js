import express from 'express';
import 'dotenv/config'
import { startConnectionDatabase } from './connection.js';
import trackingRouter from './routes/routes/tracking.routes.js';
import orderRouter from './routes/routes/order.routes.js';
import routerGenerateTrackings from './src/cron/generate-trackings.js';

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
app.use('', routerGenerateTrackings);
