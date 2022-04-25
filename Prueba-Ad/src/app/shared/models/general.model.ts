export interface IGeneralObject {
  [propName: string]: any;
}


export interface IDetailsHistorico {
  fecha_hora: string;
  username: string;
  cambio: Array<IDetailsHistoricoCambio>;
}

export interface IDetailsHistoricoCambio {
  new: any;
  old: any;
  field: string;
}

export interface IName {
  id: number;
  nombre: string;
}

export interface IValue {
  id: number;
  value: string;
}

export interface IValue2 {
  id: string;
  value: string;
}

export interface IFeatureGometry {
  coordinates: any;
  type: string;
}

export interface IOnlyName {
  nombre: string;
}
