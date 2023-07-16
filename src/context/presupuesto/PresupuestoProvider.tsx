import { useReducer } from "react";
import { PresupuestoContext } from "./PresupuestoContext";
import { presupuestoReducer } from "./PresupuestoReducer";

export interface PresupuestoState {
  startYear?: number;
  endYear?: number;
}

const PRESUPUESTO_INICIAL_STATE: PresupuestoState = {
  startYear: new Date().getFullYear(),
  endYear: new Date().getFullYear() + 2,
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

  return (
    <PresupuestoContext.Provider
      value={{
        ...state,
        setYears,
      }}
    >
      {children}
    </PresupuestoContext.Provider>
  );
};
