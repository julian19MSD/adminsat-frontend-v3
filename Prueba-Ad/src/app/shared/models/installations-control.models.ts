import {IName, IOnlyName} from '@shared/models/general.model';

export interface IMarkerItem {
  activo: number;
  actor_vial_nombre: string;
  calidad_gps: boolean;
  evento: number;
  evento_nombre: string;
  fecha_hora_equipo: string;
  fecha_hora_servidor: string;
  id: number;
  ignicion: boolean;
  lat: number;
  latitud: string;
  long: number;
  longitud: string;
  marcador: string;
  nombre: string;
  placa: string;
  rumbo: number;
  tipo: number;
  tiempo_evento: string;
  velocidad: number;
  marker: any;
  unCluster: boolean;
}


export interface IControlZoneOperatingWindow  {
  id: number;
  name: string;
  cliente: number;
  zona_control: number;
  start_time: string,
  end_time:string,
  day_0: boolean;
  day_1: boolean;
  day_2: boolean;
  day_3: boolean;
  day_4: boolean;
  day_5: boolean;
  day_6: boolean;
  total_daily_capacity:number;
  simultaneous_capacity:number;
  min_expected_daily:number;
  max_waiting_assets:number;
  expected_attention_time:number;
  min_permanence_time:number;
  level_1_time_alert:number;
  level_2_time_alert:number;
  level_3_time_alert:number;
  level_4_time_alert:number;
  
};


export interface IReportList {
  count: number;
  next: string;
  previous: string;
  results: IReportListItem[];
}


export interface IListItemsZones {
  id: number;
  activos: IName[];
  cliente:number;
  cliente_nombre: string;
  is_active: boolean;
  modo: number;
  nombre: string;
  poligono: any;
  punto:IPointZones;
  radio_punto:number;
  tiempo_maximo:number;
}

export interface IFeatureGometry{
  
}

export interface IPointZones{
  coordinates:Array<number>;
  type: string;
}

export interface IReportlocations {
  action:number;
  activo: number;
  id: number;
  identifier: string;
  response:string;
  status: string;
  tipo: string;
  technical_response : IReportLocationResponse;
}

export interface IReportLocationResponse{
  calidad_gps: boolean;
  direccion: string;
  latitud:number;
  longitud: number;
}


export interface IReportListItem {
  id: number;
  activo: number;
  activos: IOnlyName[];
  actor_vial: number;
  actor_vial_nombre: string;
  actor_vial_nombres: string;
  actor_vial_apellidos: string;
  bateria: number;
  calidad_gps: boolean;
  canal_comunicacion: number;
  cliente: number;
  cliente_nombre: string;
  showTrama: boolean;
  datos_json: IReportListItemDatosJson;
  estados: { [propName: string]: any }[];
  evento: number;
  evento_nombre: string;
  fecha_hora_equipo: string;
  fecha_hora_equipo_iso: Date;
  fecha_hora_servidor: string;
  fecha_hora_servidor_iso: Date;
  identificador: string;
  io_json: IReportListItemIOJson;
  lat: number;
  latitud: string;
  long: number;
  longitud: string;
  nombre: string;
  odometro: number;
  placa: string;
  punto_interes: IReportListItemPointOfInteres;
  rutas: Array<IReportListItemRutas>;
  sensores_json: any;
  tiempo_uso: string;
  velocidad: any;
  zonascontrol: Array<IReportListItemZonaControl>;
  tipo: number;
  no_report: IReportListItemNoReport;
  hasSensors: boolean;
  temp: number;
  mobile_eye: IReportListItemMobileye;
  setAsset: number;
  tiempo_evento: string;
  messages: Array<IReportListMessages>;

}

export interface IReportListMessages{
  direction: string;
  status: string;
  content: string;
  datetime: string;
  username: string;
}

export interface IReportListItemDatosJson {
  altitud: number;
  direccion: string;
  lift_bat:number;
  vel_max: any;
  rumbo: number;
  seg_evento: string;
  trama: string;
  foto: string;
  comentario: string;
  jamming: boolean;
  av_no_autorizado: boolean;
  av_enturne: boolean;
}

export interface IReportListItemIOJson {
  ign: boolean;
  cnt: boolean;
  alim_ext: boolean;
  simcard: boolean;
}

export interface IReportListItemNoReport {
  un_dia: string;
  doce_h: string;
  tres_h: string;
}

export interface IReportListItemZonaControl {
  id: number;
  nombre: string;
  poligono: any;
  datos_json: IReportListItemZonaControlDJSON;
  riesgo_nombre: string;
  velocidad_maxima: number;
  tiempo_maximo: number;
}


export interface IReportListItemZonaControlDJSON {
  seg: number;
  seg_parc: number;
}


export interface IReportListItemMobileye {
  count: any;
  updated: string;
}

export interface IReportListItemPointOfInteres {
  id: number;
  nombre: string;
  distancia: any;
}


export interface IReportListItemRutas {
  tt: string;
  ruta_id: number;
  fecha_hora_asignacion: any;
  planilla: string;
  cliente_enturne: string;
  id: number;
  destino: string;
  estado: number;
  estado_nombre: string;
  eta: string;
  orden_cargue: string;
  id_carga: string;
  origen: string;
  alarmas: number;
  retraso_minutos: number;
  retraso: string;
  via: string;
  producto: string;
  zonascontrol: IName[];
  zona_actual: boolean;
}


