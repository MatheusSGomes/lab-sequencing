import { getAllTrackings, getAvailableTrackings } from "../../repository.js";

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
        res.status(500).json({ error: "Erro ao buscar trackings id disponívveeis" })
    }
}