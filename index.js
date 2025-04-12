import express from 'express';
import 'dotenv/config'
import { startConnectionDatabase } from './connection.js';
import trackingRouter from './src/routes/tracking.routes.js';
import orderRouter from './src/routes/order.routes.js';
import routerGenerateTrackings from './src/cron/generate-trackings.js';

const app = express()

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    startConnectionDatabase();
    console.log(`Listening on port ${PORT}`);
});

app.get('/health', (req, res) => res.send('OK'));

app.use('/tracking', trackingRouter);
app.use('/order', orderRouter);
app.use('', routerGenerateTrackings);
