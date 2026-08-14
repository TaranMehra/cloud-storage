import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import type { models } from "mongoose";

interface IUser extends Document {
  id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  storageUsed?: number;
  total_storage?: number;
  created_at: number;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  email: {
    type: String,
    required: true,
    // type: [String],
    // validate: [(arr: string[]) => arr.length > 0, "At least one email is required"],
  },
  storageUsed: { type: Number },
  total_storage: { type: Number },
  created_at: { type: Number, required: true },
});

// export const User = mongoose.<IUser>("User", userSchema);
// export const User = mongoose.model<IUser>()
export const User = mongoose.model<IUser>("userCred", userSchema);
