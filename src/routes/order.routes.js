import { Router } from "express";
import { updateStatusTracking } from '../../repository.js';
import { updateReceived } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.put('/received', updateReceived);

orderRouter.put('/transit', (req, res) => {
    const tracking_id = req.body.tracking_id;
    const status = 'Em trânsito';

    updateStatusTracking(status, tracking_id).then(tracking =>
        res.send('Tracking update to in transit')).catch(console.log)
});

orderRouter.put('/delivered', (req, res) => {
    const tracking_id = req.body.tracking_id;
    const status = 'Entregue';

    updateStatusTracking(status, tracking_id).then(tracking =>
        res.send('Tracking update to delivered')).catch(console.log)
});

export default orderRouter;