import {IDetailsHistorico, IDetailsHistoricoCambio, IName, IValue} from '@shared/models/general.model';
import {IAssetBasic} from '@shared/models/assets.model';
import {IRoacActorPreview} from '@shared/models/road-actor.model';

export interface IShiftAsingmentList {
  count: number;
  next: string;
  previous: string;
  results: IShiftAsingmentListItem[];
}

export interface IShiftAsingmentListItem {
  id: number;
  isSelected: boolean;
  departures : number;
  remolque: string;
  activo: IAssetBasic;
  cliente: IName;
  transportador: IName;
  cliente_enturne: IShiftAsingmentClienteEnturne;
  destino: string;
  estado: number;
  estado_nombre: string;
  eta: string;
  orden_cargue: string;
  id_carga: string;
  planilla: string;
  origen: string;
  producto: string;
  ruta: number;
  via: string;
  trailer: string;
  ultimo_reporte: IShiftAsingmentUltimoReporte;
  retraso_rango: number;
  alarmas: number;
  fecha_hora_asignacion_iso: any;
  enturnamientos: number;
}


export interface IShiftAsingmentClienteEnturne {
  id: number;
  nombre: string;
  codigo: string;
}

export interface IShiftAsingmentUltimoReporte {
  fecha: string;
  retraso_minutos: number;
  retraso: string;
  actor_vial: IName;
  zonascontrol: IName[];
  zona_actual: boolean;
}


export interface IShiftAsingmentChoices {
  inicializacion_choices: Array<IValue>;
  finalizacion_choices: Array<IValue>;
}


export interface IHistoricalShiftAsingmentList {
  count: number;
  next: string;
  previous: string;
  results: IHistoricalShiftAsingmentListItem[];
}

export interface IHistoricalShiftAsingmentListItem {
  id: number;
  activo: number;
  orden_cargue: string;
  cliente: number;
  ruta: number;
  estado: number;
  fecha_hora_asignacion: string;
  fecha_hora_inicio: string;
  fecha_hora_fin: string;
  cliente_nombre: string;
  activo_nombre: string;
  ruta_nombre: string;
  estado_nombre: string;
  finalizacion_nombre: string;
  inicializacion_nombre: string;
  isSelected: boolean;
}


export interface IHistoricalShiftAsingmentChoices {
  estado_choices: Array<IValue>;
}


export interface IShiftAssignmentDetails {
  id: number;
  activo: number;
  activo_nombre: string;
  activo_icono: string;
  activo_placa: string;
  activo_vehiculo_seguro: boolean;
  cliente: number;
  cliente_nombre: string;
  cliente_enturne_nombre: string;
  estado: number;
  estado_nombre: string;
  orden_cargue: string;
  planilla: string;
  id_carga: string;
  inicializacion: string;
  finalizacion: string;
  producto: string;
  fecha_hora_asignacion: string;
  fecha_orden_cargue: string;
  fecha_hora_inicio: string;
  fecha_hora_inicio_iso: string;
  fecha_hora_inicio_real: string;
  fecha_hora_inicio_real_iso: string;
  fecha_hora_fin: string;
  fecha_hora_fin_iso: string;
  origen: string;
  destino: string;
  via: string;
  duracion_estimada: string;
  eta: string;
  actores_viales: IRoacActorPreview[];
  creacion: IDetailsHistorico;
  historico_cambios: IDetailsHistoricoCambio[];
  observaciones: Array<IShiftAssignmentDetailsObservaciones>;
  zonascontrol: IShiftAssignmentDetailsZonaControlCambio[];
}



export interface IShiftAssignmentDepartures {
  id: number;
  leave_dt: string;
  obs_user: string;
  observation: string;
  reentry_dt: string;
}


export interface IShiftAssignmentDetailsZonaControlCambio {
  hora_ajustada: string;
  hora_entrada: string;
  hora_entrada_iso: string;
  hora_planeada: string;
  hora_salida: string;
  hora_salida_iso: string;
  id: number;
  nombre: string;
  orden: number;
  retraso: string;
  desventaja: boolean;
  tiempo_origen: string;
  tipo: number;
  tipo_zona: number;
  tipo_zona_nombre: string;
  zona_control: number;
}

export interface IShiftAssignmentDetailsObservaciones {
  fecha_hora: string;
  observacion: string;
  sub_tipo_nombre: string;
  tiempo_agregado: string;
  tipo_nombre: string;
  username: string;
}


export interface IShiftAssignmentAlarms {
  nombre: string;
  count: number;
}
