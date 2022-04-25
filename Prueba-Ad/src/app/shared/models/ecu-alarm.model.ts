export interface IEcuAlarmListModel {
  count: number;
  next: string;
  previous: string;
  results: IEcuAlarmListItem[];
}

export interface IEcuAlarmListItem {
  id: number;
  isSelected: boolean;
  activo: number;
  activo_nombre: string;
  activo_placa: string;
  alarm_value: number;
  cliente: number;
  cliente_nombre: string;
  report_dt: string;
  report_id: number;
  magnitude: string;
  actor_vial: number;
  actor_vial_celular:string;
  actor_vial_nombre: string;
  report_value: number;
  value_name: string;
}

export interface IEcuAlarmCliente {
  id: number;
  nombre: string;
}


export interface IEcuAlarmActorVial {
  id: number;
  full_name: string;
}

export interface IEcuAlarmDetails {
activo: number;
activo_nombre:string;
activo_placa: string;
actor_vial:string;
actor_vial_celular: number;
actor_vial_nombre: string;
alarm_value: number;
cliente:number;
cliente_nombre:string;
data: Array<Array<any>>
id: number;
magnitude: string;
report_dt: string;
report_id:string;
report_value:string;
value_name: string;
}


export interface WorkDayEventsModel {
  id: number;
  actor_vial_nombre: string;
  event: string;
  datetime: string;
  duration: number;
  durationParse: string;
  status: string;
  added_time: string;

}


export interface WorkDayShiftModel {
  id: number;
  estado: string;
  orden_cargue: string;
  origen: string;
  destino: string;
  via: string;
  fecha_hora_inicio_real: string;
  fecha_hora_fin: string;
  fecha_hora_asignacion: string;
  actores_viales: Array<EcuAlarmRoadActorModel>

}

export interface WorkDayObservationsModel {

  username: string;
  observation: string;
  added_time: number;
  observation_dt: string;

}


export interface EcuAlarmRoadActorModel {
  id: number;
  full_name: string;
}

export interface EcuAlarmSimpleItemModel {
  id: number;
  nombre: string;
}


export interface EcuAlarmNoveltySelectModel {
  id: number;
  event: string;
}
