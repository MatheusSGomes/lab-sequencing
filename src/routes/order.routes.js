import { Router } from "express";
import { updateStatusDelivered, updateStatusReceivedController, updateStatusTransitController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.put('/received', updateStatusReceivedController);
orderRouter.put('/transit', updateStatusTransitController);
orderRouter.put('/delivered', updateStatusDelivered);

export default orderRouter;