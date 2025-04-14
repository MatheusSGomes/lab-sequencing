import { updateStatusTracking } from "../../repository.js";

export async function updateReceived(req, res) {
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
