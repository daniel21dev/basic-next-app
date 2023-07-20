import { IPresupuesto, Presupuesto } from "@/models";

const create = async (presupuesto: IPresupuesto) => {
  const newPresupuesto = new Presupuesto(presupuesto);
  return newPresupuesto.save();
};
