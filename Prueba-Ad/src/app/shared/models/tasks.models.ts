export interface ITasksList {
  count: number;
  next: string;
  previous: string;
  results: Array<ITasks>;
}


export interface ITasks {
  id: number;
  archivo: string;
  descripcion: string;
  detalles: { data: ITasksData };
  detalles_json: ITasksDetallesJSON;
  estado: number;
  estado_nombre: string;
  fecha_hora: string;
  fecha_hora_actualizacion: string;
  porcentaje: number;
  usuario: number;
}

export interface ITasksDetallesJSON {
  task_id: number;
  task_error: string;
}

export interface ITasksData {
  ids: Array<number>;
  names: Array<string>;
  activos: Array<number>;
  actor_vial: Array<number>;
  eventos: Array<number>;
  cliente: number;
  desde: string;
  hasta: string;
}


export interface ITasksDetail {
  params: {
    id: number;
    archivo: string;
    descripcion: string;
    detalles: { data: ITasksData };
    detalles_json: ITasksDetallesJSON;
    estado: number;
    estado_nombre: string;
    fecha_hora: string;
    fecha_hora_actualizacion: string;
    porcentaje: number;
    usuario: number;
  };
}
