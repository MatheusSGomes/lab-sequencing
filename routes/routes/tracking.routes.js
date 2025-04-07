import { Router } from "express";
import { getAllTrackings } from "../../repository.js";

const router = Router();

router.get('/all', (req, res) =>
    getAllTrackings().then(trackings =>
        res.send(trackings))
);

export default router;