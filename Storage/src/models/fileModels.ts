// import mongoose, { Document, Schema } from "mongoose";

// interface FileI extends Document {
//   userid: string;
//   original_file_name: string;
//   original_file_type: string;
//   storage_unique_name: string;
//   file_size_mb?: number;
//   status: "pending" | "successfull";
// }

// const FileSchema = new Schema<FileI>({
//   userid: { type: String, required: true },
//   original_file_name: { type: String, required: true },
//   original_file_type: { type: String, required: true },
//   storage_unique_name: { type: String, required: true },
//   file_size_mb: { type: Number },
//   status: { type: String, required: true },
// });

// export const FileTrigger = mongoose.model('FileData', FileSchema)