import { Router } from "express";
import { clerkMiddleware } from "@clerk/express";
import getDataController from "../controllers/getDataController.js";
import getDashboardController from "../controllers/getDashboardController.js";
import s3StoreData from "../controllers/s3StoreDataInit.js";
const routes = Router();

routes.get("/hello", getDataController);
routes.post("/dash", clerkMiddleware(), getDashboardController);
routes.post("/meta-data-list", clerkMiddleware(), getDashboardController);
// routes.get("/store-data", s3StoreData);

export default routes;
