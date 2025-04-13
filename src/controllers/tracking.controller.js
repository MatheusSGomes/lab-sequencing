import { generateTrackings, getAllTrackings, getAvailableTrackings, getNumberOfTrackingsUnassigned, getTrackingByOrder, initTracking } from "../../repository.js";

export async function getAllController(req, res) {
    try {
        const result = await getAllTrackings();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar trackings" });
    }
}

export async function getAvailableTrackingsController(req, res) {
    try {
        const result = await getAvailableTrackings();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar trackings id disponíveis" })
    }
}

export async function getAssignTrackingsController(req, res) {
    try {
        const orderId = req.body.order_id;
        const freightcarrierId = req.body.freightcarrier_id;
        const order = await getTrackingByOrder(orderId);

        if (!order.length) {
            const tracking = await initTracking(orderId, freightcarrierId);

            if (tracking.rowCount >= 1) {
                res.send('Created tracking');
            }
        } else {
            res.send('Order already tracking or no trackings id available');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erro ao buscar assigned trackings" })
    }
}

export async function generateTrackingsIdsController(req, res) {
    try {
        let desiredNumberGenerateTrackingsIds = 200;

        const number = await getNumberOfTrackingsUnassigned();
        const numTrackingsUnassigned = number.rows[0].count;

        if (numTrackingsUnassigned <= 200) {
            const numberToGenerate =
                (desiredNumberGenerateTrackingsIds - numTrackingsUnassigned);

            desiredNumberGenerateTrackingsIds = numberToGenerate;
        } else {
            desiredNumberGenerateTrackingsIds = 0;
        }

        await generateTrackings(desiredNumberGenerateTrackingsIds);
        res.send(`Trackings generated`)
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erro ao buscar gerar novos trackings ids" })
    }
}
