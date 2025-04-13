import { Router } from "express";
import { getAllController, getAssignTrackingsController, getAvailableTrackingsController } from "../controllers/tracking.controller.js";

const trackingRouter = Router();

trackingRouter.get('/all', getAllController);
trackingRouter.get('/available', getAvailableTrackingsController);
trackingRouter.post('/assign', getAssignTrackingsController);

export default trackingRouter;