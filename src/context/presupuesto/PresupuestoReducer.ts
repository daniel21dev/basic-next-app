import { PresupuestoState } from "./PresupuestoProvider";

type PresupuestoAction = {
  type: "SET_YEARS";
  payload: { startYear?: number; endYear?: number };
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
    default:
      return state;
  }
};
