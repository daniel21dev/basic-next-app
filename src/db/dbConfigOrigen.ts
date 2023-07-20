import { ConfigOrigenAhorro } from "@/models";
import { dbConnect } from "./connect";

export const getOrigenesAhorro = async () => {
  await dbConnect();
  const origenesAhorro = await ConfigOrigenAhorro.findOne({}).lean();

  return JSON.parse(JSON.stringify(origenesAhorro));
};
