export interface IWorkdayListModel {
  count: number;
  next: string;
  previous: string;
  results: IWorkdayListItem[];
}

export interface IWorkdayListItem {
  id: number;
  isSelected: boolean;
  cliente: IWorkdayCliente;
  activo: number;
  enturnamiento: number;
  actor_vial: IWorkdayActorVial;
  status: string;
  status_color: string;
  start_dt:string;
  workday_duration:number;
  workday_alert:number;
  current_duration: number;
  rest_duration:number;
  rest_alert: number;
  activo_placa: string;
  activo_nombre:string;
  origen: string;
  destino: string;
  via: string;
  remolque: string;
  tt: string;
  ultimo_reporte_fecha: string;
  start_dt_iso:string;
  start_dt_parse: string;

}

export interface IWorkdayCliente {
  id: number;
  nombre: string;
}


export interface IWorkdayActorVial {
  id: number;
  full_name: string;
}

export interface IWorkdayDetails {
  id: number;
  cliente: WorkdaySimpleItemModel;
  activo: number;
  enturnamiento: number;
  actor_vial: WorkdayRoadActorModel;
  status: string;
  status_color:string;
  start_dt: string;
  workday_duration: number;
  workday_alert: number;
  rest_duration: number;
  rest_alert: number;
  activo_placa: string;
  activo_nombre:string;
  origen:string;
  destino:string;
  via:string;
  remolque: string;
  tt: string;
  events: Array<WorkDayEventsModel>;
  rutas: Array<WorkDayShiftModel>;
  observations: Array<WorkDayObservationsModel>;
  total_workdays: string;
  total_restdays: string,
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
  datetime_formated: string;

}


export interface WorkDayShiftModel {
  id: number;
  estado: string;
  orden_cargue: string;
  origen: string;
  destino: string;
  via: string;
  fecha_hora_inicio_real:string;
  fecha_hora_fin: string;
  fecha_hora_asignacion: string;
  actores_viales: Array<WorkdayRoadActorModel>

}

export interface WorkDayObservationsModel {

  username: string;
  observation: string;
  added_time: number;
  observation_dt: string;

}


export interface WorkdayRoadActorModel {
  id: number;
  full_name: string;
}

export interface WorkdaySimpleItemModel {
  id: number;
  nombre: string;
}


export interface WorkdayNoveltySelectModel {
  id: number;
  event: string;
}
