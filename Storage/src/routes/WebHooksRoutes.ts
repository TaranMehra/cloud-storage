import { Router } from "express";
import { clerkMiddleware } from "@clerk/express";
import getDataController from "../controllers/getDataController.js";
import getDashboardController from "../controllers/getDashboardController.js";
import { handleClerWebhook } from "../controllers/webhooksController.js";
const webhook_routes = Router();

webhook_routes.post("/user", handleClerWebhook);
export default webhook_routes;
