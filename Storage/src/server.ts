import express from "express";
import { createServer } from "node:http";
// import { clerkMiddleware } from "@clerk/express";
import { Port } from "./config/index.js";
import routes from "./routes/Routes.js";
import { CreateConnection } from "./utils/dbConnection.js";
import cors from "cors";
import webhook_routes from "./routes/WebHooksRoutes.js";
import { s3Client } from "./utils/s3client.js";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3_routes from "./routes/S3Routes.js";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
export const io = new Server(server);
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

// app.use(clerkMiddleware());

app.use(express());
app.use(express.json()); //this must should present receives clerk webhook
app.use("/webhook", webhook_routes);
app.use("/api", routes);
app.use(express.text({ type: "*/*" }));
app.use("/s3", s3_routes);
app.get("/hi", (req, res) => {
  res.send("hello");
});
//making db connection
(async () => {
  await CreateConnection();
  // console.log("s3Client:", s3Client.config);
})();

server.listen(Port, () => {
  console.log(`Server is running at ${Port}`);
});
