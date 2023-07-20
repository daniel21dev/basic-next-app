import { PresupuestoState } from "./PresupuestoProvider";

type PresupuestoAction =
  | {
      type: "SET_YEARS";
      payload: { startYear?: number; endYear?: number };
    }
  | {
      type: "SET_ROWS";
      payload: PresupuestoState["rows"];
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
        total: action.payload?.reduce((acc, row) => {
          const { origen, key, ...years } = row;
          return (
            acc + Object.values(years).reduce((acc, value) => acc + value, 0)
          );
        }, 0),
      };
    default:
      return state;
  }
};
