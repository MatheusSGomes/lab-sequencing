import express from 'express';
import 'dotenv/config'
import { startConnectionDatabase } from '../connection.js';
import trackingRouter from './routes/tracking.routes.js';
import orderRouter from './routes/order.routes.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tracking', trackingRouter);
app.use('/order', orderRouter);

app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    startConnectionDatabase();
    console.log(`Listening on port ${PORT}`);
});
