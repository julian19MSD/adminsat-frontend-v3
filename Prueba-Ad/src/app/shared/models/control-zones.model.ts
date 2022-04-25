import {IDetailsHistorico, IFeatureGometry} from '@shared/models/general.model';
import {IAssetBasic, IAssetPreview} from '@shared/models/assets.model';


export interface IControlZoneGeo {
  features: IControlZoneFeature;
  type: string;
}

export interface IControlZoneFeature {
  id: number;
  geometry: IFeatureGometry;
  properties: IControlZoneFeatureProperty;
  type: string;
}

export interface IControlZoneFeatureProperty {
  activos: IAssetBasic;
  cliente: number;
  cliente_nombre: string;
  is_active: boolean;
  modo: number;
  nombre: string;
  punto: any;
  radio_punto: any;
  riesgo: number;
  riesgo_nombre: string;
  tiempo_maximo: string;
  velocidad_maxima: number;
}


export interface ControlZoneDetailsModel {
  activos: IAssetPreview[];
  calculo_tiempo: boolean;
  cliente: number;
  cliente_nombre: string;
  correos_notificaciones_m2m: string[];
  country_name: string;
  creacion: IDetailsHistorico;
  datos_json: any;
  department_name:string;
  historico_cambios: IDetailsHistorico[];
  icono:string;
  id: number;
  installation_type: number;
  installation_type_name: string;
  is_active: boolean;
  is_demo: boolean;
  mensaje: string;
  modo: number;
  modo_nombre: string;
  municipality:number;
  municipality_name: string;
  nombre: string;
  poligono: any;
  punto: any;
  radio_punto: number;
  riesgo: number;
  riesgo_nombre: string;
  sub_installation_type: number;
  sub_installation_type_name: string;
  sub_zone: number;
  sub_zone_name: string;
  tiempo_maximo: string
  uen_1: string;
  uen_2:string;
  velocidad_maxima: string;
  zone: number;
  zone_name: string;
  [parameter: string]: any;
}
