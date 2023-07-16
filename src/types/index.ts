export interface Presupuesto {
  _id?: string;
  origen: string;
  years: { year: number; value: number }[];
}
