import { Router } from "express";
import { clerkMiddleware } from "@clerk/express";
import getDataController from "../controllers/getDataController.js";
import getDashboardController from "../controllers/getDashboardController.js";
import s3SnsReceiver from "../controllers/s3SnsReceiver.js";
import s3StoreDataInit from "../controllers/s3StoreDataInit.js";
import { getUserIdFn } from "../middleware/getUserId.js";
const s3_routes = Router();

s3_routes.post("/initial-store-data", clerkMiddleware(), getUserIdFn, s3StoreDataInit);
s3_routes.post("/sns-receiver", s3SnsReceiver);

//correction in FileStore ->
/* 1. originalObjName, objFileType, objName -> arnId for that object, 
2. make socket connection or db webhooks so i can know when ask for data 
(make frontend functional)
3. make frontend demand for getObject 
  */

export default s3_routes;
