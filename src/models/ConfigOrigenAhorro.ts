import mongoose, { Model } from "mongoose";

export interface IConfigOrigenAhorro {
  origenes: string[];
  user: mongoose.Schema.Types.ObjectId;
}

const ConfigOrigenAhorroSchema = new mongoose.Schema<IConfigOrigenAhorro>({
  origenes: {
    type: [String],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const ConfigOrigenAhorro: Model<IConfigOrigenAhorro> =
  mongoose.models.ConfigOrigenAhorro ||
  mongoose.model("ConfigOrigenAhorro", ConfigOrigenAhorroSchema);
