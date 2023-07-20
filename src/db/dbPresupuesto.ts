import { IPresupuesto, Presupuesto } from "@/models";
import { dbConnect } from "./connect";

export const create = async (presupuesto: IPresupuesto) => {
  dbConnect();
  const newPresupuesto = new Presupuesto(presupuesto);
  return newPresupuesto.save();
};

export const getUltimo = async () => {
  dbConnect();

  const ultimo = await Presupuesto.findOne().sort({ _id: -1 }).lean();

  return JSON.parse(JSON.stringify(ultimo));
};
