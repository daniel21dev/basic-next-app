import { useReducer } from "react";
import { PresupuestoContext } from "./PresupuestoContext";
import { presupuestoReducer } from "./PresupuestoReducer";
import { IPresupuesto } from "@/models";
import axios from "axios";
import { useRouter } from "next/router";

export interface PresupuestoState {
  startYear?: number;
  endYear?: number;
  rows?: Record<string, any>[] | null;
  configOrigen?: string[];
  total: number;
  tipoCambioDolar?: number;
  isLoading: boolean;
}

const PRESUPUESTO_INICIAL_STATE: PresupuestoState = {
  startYear: new Date().getFullYear(),
  endYear: new Date().getFullYear() + 2,
  rows: null,
  configOrigen: ["Propio", "Mama", "Papa", "Hermanos", "Otros"],
  total: 0,
  tipoCambioDolar: 0,
  isLoading: false,
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
  const router = useRouter();

  const setYears = (startYear?: number, endYear?: number) => {
    dispatch({ type: "SET_YEARS", payload: { startYear, endYear } });
  };

  const setRows = (rows: PresupuestoState["rows"]) => {
    dispatch({ type: "SET_ROWS", payload: rows });
  };

  const setTipoCambioDolar = (tipoCambioDolar: number) => {
    dispatch({ type: "SET_TIPO_CAMBIO_DOLAR", payload: tipoCambioDolar });
  };

  const setISLoading = (isLoading: boolean) => {
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  };

  const guardarPresupuesto = async () => {
    const presupuesto: IPresupuesto = {
      Detalle:
        state.rows?.reduce((acc, row) => {
          const { key, origen, ...years } = row;
          const origenYears: Record<string, number> = {};
          Object.keys(years).forEach((year: string) => {
            origenYears[year] = years[year];
          });
          acc[origen] = origenYears;
          return acc;
        }, {}) || {},
      tipoCambioDolar: state.tipoCambioDolar || 0,
    };

    try {
      await axios.post("/api/presupuesto", { presupuesto });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PresupuestoContext.Provider
      value={{
        ...state,
        setYears,
        setRows,
        guardarPresupuesto,
        setTipoCambioDolar,
        setISLoading,
      }}
    >
      {children}
    </PresupuestoContext.Provider>
  );
};
