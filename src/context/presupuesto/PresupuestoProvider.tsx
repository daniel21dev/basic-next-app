import { useReducer } from "react";
import { PresupuestoContext } from "./PresupuestoContext";
import { presupuestoReducer } from "./PresupuestoReducer";

export interface PresupuestoState {
  startYear?: number;
  endYear?: number;
  rows?: Record<string, any>[] | null;
  configOrigen?: string[];
  total: number;
}

const PRESUPUESTO_INICIAL_STATE: PresupuestoState = {
  startYear: new Date().getFullYear(),
  endYear: new Date().getFullYear() + 2,
  rows: null,
  configOrigen: ["Propio", "Mama", "Papa", "Hermanos", "Otros"],
  total: 0,
};

export const PresupuestoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    presupuestoReducer,
    PRESUPUESTO_INICIAL_STATE
  );

  const setYears = (startYear?: number, endYear?: number) => {
    dispatch({ type: "SET_YEARS", payload: { startYear, endYear } });
  };

  const setRows = (rows: PresupuestoState["rows"]) => {
    dispatch({ type: "SET_ROWS", payload: rows });
  };

  return (
    <PresupuestoContext.Provider
      value={{
        ...state,
        setYears,
        setRows,
      }}
    >
      {children}
    </PresupuestoContext.Provider>
  );
};
