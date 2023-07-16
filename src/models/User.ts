import mongoose, { Model } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);
