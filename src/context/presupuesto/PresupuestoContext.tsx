import { createContext } from "react";
import { PresupuestoState } from "./PresupuestoProvider";

interface ContextProps extends PresupuestoState {
  setYears: (startYear?: number, endYear?: number) => void;
  setRows: (rows: any) => void;
}

export const PresupuestoContext = createContext({} as ContextProps);
