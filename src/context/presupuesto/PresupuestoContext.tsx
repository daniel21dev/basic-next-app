import { createContext } from "react";

interface ContextProps {
  startYear: number;
  endYear: number;
  setYears: (startYear?: number, endYear?: number) => void;
}

export const PresupuestoContext = createContext({} as ContextProps);
