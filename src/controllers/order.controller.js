import { updateStatusTracking } from "../../repository.js";

export async function updateStatusReceivedController(req, res) {
    try {
        const tracking_id = req.body.tracking_id;
        const status = 'Recebido';

        await updateStatusTracking(status, tracking_id);
        res.send('Tracking update to in transit');
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error on update tracking" });
    }
}

export async function updateStatusTransitController(req, res) {
    try {
        const tracking_id = req.body.tracking_id;
        const status = 'Em trânsito';

        await updateStatusTracking(status, tracking_id);
        res.send('Tracking update to in transit');
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error on update tracking" });
    }
}

export async function updateStatusDelivered(req, res) {
    try {
        const tracking_id = req.body.tracking_id;
        const status = 'Entregue';

        updateStatusTracking(status, tracking_id).then(tracking =>
            res.send('Tracking update to delivered')).catch(console.log)
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error on update tracking" });
    }
}
