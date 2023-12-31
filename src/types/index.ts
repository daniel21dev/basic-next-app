export interface Presupuesto {
  _id?: string;
  origen: string;
  years: { year: number; value: number }[];
}
// Generated by https://quicktype.io
export interface BanxicoSeries {
  bmx: Bmx;
}

export interface Bmx {
  series: Series[];
}

export interface Series {
  idSerie: string;
  titulo: string;
  datos: Dato[];
}

export interface Dato {
  fecha: string;
  dato: string;
}
