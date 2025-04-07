import { Router } from "express";
import { updateStatusTracking } from '../../repository.js';

const orderRouter = Router();

orderRouter.put('/received', (req, res) => {
    const tracking_id = req.body.tracking_id;
    const status = 'Recebido';

    updateStatusTracking(status, tracking_id).then(tracking =>
        res.send('Tracking update to in transit')).catch(console.log)
})

orderRouter.put('/transit', (req, res) => {
    const tracking_id = req.body.tracking_id;
    const status = 'Em trânsito';

    updateStatusTracking(status, tracking_id).then(tracking =>
        res.send('Tracking update to in transit')).catch(console.log)
});

export default orderRouter;