import mongoose, { Document, Schema } from "mongoose";

interface fileType extends Document {
  userId: string;
  originalObjName: string;
  objFileType: string;
  objUniqueName: string;
  MessageId?: string;
  Timestamp?: string;
  eventName?: string;
  eventTime?: string;
  snsName?: string;
  bucketName?: string;
  arnId?: string;
  objSize?: number;
  objName?:string,
  objPath?: string;
  eNameTag?: string;
  status: "pending" | "success" | "failed";
}
const FileCreds = new Schema<fileType>(
  {
    userId: String,
    objFileType: String,
    originalObjName: String,
    objUniqueName: { type: String },
    MessageId: { type: String },
    Timestamp: { type: String },
    eventName: { type: String },
    eventTime: { type: String },
    snsName: { type: String },
    bucketName: { type: String },
    objName:String,
    objSize: { type: Number },
    objPath: { type: String },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);
export const FileStore = mongoose.model("FileCredentials", FileCreds);
