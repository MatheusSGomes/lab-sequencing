import { Router } from "express";
import { updateStatusTracking } from '../../repository.js';
import { updateStatusReceivedController, updateStatusTransitController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.put('/received', updateStatusReceivedController);
orderRouter.put('/transit', updateStatusTransitController);

orderRouter.put('/delivered', (req, res) => {
    const tracking_id = req.body.tracking_id;
    const status = 'Entregue';

    updateStatusTracking(status, tracking_id).then(tracking =>
        res.send('Tracking update to delivered')).catch(console.log)
});

export default orderRouter;