import { getAllTrackings } from "../../repository.js";

export async function getAllController(req, res) {
    try {
        const result = await getAllTrackings();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar trackings" });
    }
}