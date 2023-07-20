import {
  PRESUPUESTO_INICIAL_STATE,
  PresupuestoState,
} from "./PresupuestoProvider";

type PresupuestoAction =
  | {
      type: "SET_YEARS";
      payload: { startYear?: number; endYear?: number };
    }
  | {
      type: "SET_ROWS";
      payload: PresupuestoState["rows"];
    }
  | {
      type: "SET_TIPO_CAMBIO_DOLAR";
      payload: number;
    }
  | {
      type: "SET_IS_LOADING";
      payload: boolean;
    }
  | {
      type: "RESET";
    }
  | {
      type: "SET_ORIGENES";
      payload: string[];
    };

export const presupuestoReducer = (
  state: PresupuestoState,
  action: PresupuestoAction
) => {
  switch (action.type) {
    case "SET_YEARS":
      return {
        ...state,
        startYear: action.payload.startYear || state.startYear,
        endYear: action.payload.endYear || state.endYear,
      };
    case "SET_ROWS":
      return {
        ...state,
        rows: action.payload,
        total:
          action.payload?.reduce((acc, row) => {
            const { origen, key, ...years } = row;
            return (
              acc + Object.values(years).reduce((acc, value) => acc + value, 0)
            );
          }, 0) || 0,
      };
    case "SET_TIPO_CAMBIO_DOLAR":
      return {
        ...state,
        tipoCambioDolar: action.payload,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "RESET":
      return {
        ...state,
        ...PRESUPUESTO_INICIAL_STATE,
      };
    case "SET_ORIGENES":
      return {
        ...state,
        configOrigen: action.payload,
      };
    default:
      return state;
  }
};
