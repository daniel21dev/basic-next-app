import mongoose, { Model } from "mongoose";

export interface IPresupuesto {
  fechaRegistro?: Date;
  Detalle: Record<
    string,
    {
      year: number;
    }
  >;
  tipoCambioDolar: number;
}

const PresupuestoSchema = new mongoose.Schema<IPresupuesto>({
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  Detalle: {
    type: Object,
    default: {},
  },
  tipoCambioDolar: {
    type: Number,
    required: true,
  },
});

export const Presupuesto: Model<IPresupuesto> =
  mongoose.models.Presupuesto ||
  mongoose.model("Presupuesto", PresupuestoSchema);
