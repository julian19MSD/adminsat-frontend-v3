import {IAssetPreview} from '@shared/models/assets.model';
import {IDetailsHistorico} from '@shared/models/general.model';

export interface IDeviceDetails {
  id: number;
  historico_cambios: IDetailsHistorico[];
  creacion: IDetailsHistorico;
  cliente_nombre: string;
  tipo_equipo_nombre: string;
  tipo_equipo_canal_comunicacion: string;
  operador_red_nombre: string;
  apn_nombre: string;
  activo: IAssetPreview;
  is_active: boolean;
  is_demo: boolean;
  identificador: string;
  plan_datos: string;
  fecha_instalacion: string;
  fecha_activacion: string;
  numero_celular: string;
  numero_sim: string;
  apn: number;
  datos_consumidos: string;
  notificacion_satelital: boolean;
  varios_json: any;
  redireccion_json: IDeviceRedireccion[];
  ultimo_reporte_fecha: string;
  cliente: number;
  tipo_equipo: number;
  operador_red: number;

}


export interface IDeviceRedireccion {
  servidor_nombre: string;
}


export interface IDevicePreview {
  id: number;
  identificador: string;
  tipo_equipo_nombre: string;
}

export interface IDeviceIdentificator {
  id: number;
  identificador: string;
}

