import {IDetailsHistorico, IDetailsHistoricoCambio} from '@shared/models/general.model';

export interface IRoutesDetails {
  id: number;
  cliente: number;
  cliente_nombre: string;
  zonascontrol: IRoutesDetailsZonaControlGeo;
  is_active: boolean;
  nombre: string;
  origen: string;
  destino: string;
  via: string;
  divipola: string;
  poli_linea: any;
  creacion: IDetailsHistorico;
  historico_cambios: IDetailsHistoricoCambio[];
}


export interface IRoutesDetailsZonaControlGeo {
  features: Array<IRoutesDetailsZonaControlGeoPropeties>
}

export interface IRoutesDetailsZonaControlGeoPropeties {
  properties: IRoutesDetailsZonaControl;
  id: number;
}


export interface IRoutesDetailsZonaControl {
  tipo: number;
  nombre: string;
  tipo_zona_nombre: string;
  tiempo_origen: string;
  zonascontrol: number;
  velocidad_maxima: string;
  tiempo_maximo: string;
  riesgo: number;
  riesgo_nombre: string;
}
