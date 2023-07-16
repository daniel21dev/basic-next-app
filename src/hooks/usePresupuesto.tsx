import { PresupuestoContext } from "@/context/presupuesto";
import { useContext } from "react";

export const usePresupuesto = () => {
  return useContext(PresupuestoContext);
};
