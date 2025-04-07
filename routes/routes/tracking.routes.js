import { Router } from "express";
import { getAllTrackings, getAvailableTrackings } from "../../repository.js";

const router = Router();

router.get('/all', (req, res) =>
    getAllTrackings().then(trackings =>
        res.send(trackings))
);

router.get('/available', (req, res) => {
    getAvailableTrackings().then(trackings => res.send(trackings));
});

export default router;