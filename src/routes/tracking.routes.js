import { Router } from "express";
import { getAllTrackings, getAvailableTrackings, getTrackingByOrder, initTracking  } from "../../repository.js";
import { getAllController, getAvailableTrackingsController } from "../controllers/tracking.controller.js";

const trackingRouter = Router();

trackingRouter.get('/all', getAllController);

trackingRouter.get('/available', getAvailableTrackingsController);

trackingRouter.post('/assign', (req, res) => {
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

export default trackingRouter;