import { Router } from "express";
import { generateTrackingsIdsController, getAllController, getAssignTrackingsController, getAvailableTrackingsController } from "../controllers/tracking.controller.js";

const trackingRouter = Router();

trackingRouter.get('/all', getAllController);
trackingRouter.get('/available', getAvailableTrackingsController);
trackingRouter.post('/assign', getAssignTrackingsController);
trackingRouter.post('/generate', generateTrackingsIdsController);

export default trackingRouter;