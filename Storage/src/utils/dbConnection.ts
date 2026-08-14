/*  Key takeaway (this is the nuance)
You were right about:
“if connection exists → use it”
But the missing piece is:
“what if multiple calls happen at the same time?”
That’s why professionals don’t just do:
1. check exiting connection
2. track promise
3. reuse in flight connection
 */
import mongoose, { Mongoose } from "mongoose";
import { MONGO_URI, S3_CLUSTER_DB } from "../config/index.js";

if (!MONGO_URI) {
  console.error("Connection URL is not present");
  process.exit();
}
const MAX_RETRIES = 5;
let retries = 0;

export const CreateConnection = async (): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(`${MONGO_URI}/${S3_CLUSTER_DB}`, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      maxConnecting: 5,
    });

    console.log(`${conn.connection.name} is Connected`);

    //disconnected
    mongoose.connection.on("disconnected", () => {
      console.warn("mongoose Disconneted");
    });

    //error
    mongoose.connection.on("error", (err) => {
      console.error("Mongodb connection error", err);
    });

    return conn;
  } catch (error) {
    retries++;
    console.error(`MongoDB connection failed (${retries}):`, error);
    throw Error;
    // if (retries <= MAX_RETRIES) {
    //   console.log(`Retrying in 5 seconds...`);
    //   setTimeout(CreateConnection, 5000);
    // } else {
    //   console.error("Max retries reached. Exiting.");
    //   process.exit(1);
    // }
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("mongodb connection is closed ");
  process.exit(0);
});
