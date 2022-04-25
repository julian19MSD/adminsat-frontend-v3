export interface IAlarmList {
  count: number;
  next: string;
  previous: string;
  results: IAlarmListItem[];
}

export interface IAlarmListItem {
  id: number;
  reporte_fecha: string;
  evento_nombre: string;
  activo: number;
  activo_nombre: string;
  placa: string;
  cliente_nombre: string;
  cliente: number;
  color: string;
  isSelected: boolean;
}

export interface IAlarmItem {
  id: number;
  reporte_fecha: string;
  reporte: any;
  marcador: any;
  actualizaciones: IAlarmUpdate[],
  protocolo: string;
  activo_nombre: string;
}

export interface IAlarmUpdate {
  descripcion: string;
  detalles_json: any;
  creado: string;
  usuario: string;
}
