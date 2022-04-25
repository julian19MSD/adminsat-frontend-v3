export interface IDashBoardGridItem {
  location: IDashBoardGridItemDetail;
}

export interface IDashBoardGridItemDetail {
  permission: string;
  available: boolean;
}

export interface IDashboardHeader {
  gridItems: string[];
}


export interface IDashBoardTracking {
  ubicacion_info: IDashBoardTrackingUbicacionInfo;
  ubicacion: Array<IDashBoardTrackingbicacion>;
}

export interface IDashBoardTrackingUbicacionInfo {
  doce_h: number;
  habilitados: number;
  inhabilitados: number;
  nunca: number;
  tres_h: number;
  un_dia: number;
  fuera_servicio: number;
}

export interface IDashBoardTrackingbicacion {
  activo_nombre: string;
  activo_placa: string;
  evento_nombre: string;
  fecha_hora_equipo: string;
  lat: number;
  latitud: string;
  lng: number;
  longitud: string;
}



