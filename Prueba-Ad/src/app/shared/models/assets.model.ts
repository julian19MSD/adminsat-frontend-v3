import {IDetailsHistorico, IValue} from '@shared/models/general.model';
import {IDeviceIdentificator} from '@shared/models/devices.model';

export interface IAssetListModel {
  count: number;
  next: string;
  previous: string;
  results: IAssetListItem[];
}

export interface IAssetListItem {
  id: number;
  activo_asociado: number;
  activo_asociado_nombre: string;
  cliente: number;
  cliente_nombre: string;
  documentos_json: any;
  equipos: IDeviceIdentificator[];
  icono: string;
  is_active: boolean;
  nombre: string;
  placa: string;
  tipo_activo: number;
  tipo_activo_nombre: string;
  tipo_vehiculo: number;
  tipo_vehiculo_nombre: string;
  ultimo_reporte_fecha: string;
  ultimo_reporte_valido_fecha: string;
  ignicion: boolean;
  vehiculo_seguro: boolean;
  varios_json: any;
  isSelected: boolean;
}


export interface IAssetChoices {
  combustible_choices: Array<IValue>;
  servicio_choices: Array<IValue>;
  tipo_activo_choices: Array<IValue>;
}

export interface IAssetRetrieve {
  id: number;
  equipos: Array<IAssetEquipo>;
  is_active: boolean;
  is_demo: boolean;
  nombre: string;
  tipo_activo: number;
  placa: string;
  servicio: number;
  foto: string;
  vehiculo_seguro: boolean;
  odometro: number;
  unidad_odometro: number;
  horas_uso: number;
  propietario_json: {};
  propietario_tarjeta: string;
  documentos_json: {};
  especificaciones_tecnicas: string;
  lista_verificacion_documentos: string;
  seguridad_json: any;
  varios_json: any;
  ultimo_reporte_tabla: string;
  ultimo_reporte_fecha: string;
  ultimo_reporte_id: number;
  ultimo_reporte_valido_tabla: string;
  ultimo_reporte_valido_fecha: string;
  ultimo_reporte_valido_id: number;
  filtro_tiempo_reporte: number;
  datos_json: {};
  estados_id: number;
  contacto_json: {};
  observaciones: string;
  activo_asociado_json: {};
  tipo_vehiculo: number;
  cliente: number;
  icono: number;
  activo_asociado: number;
  circulo_servicios: number;
}

export interface IAssetEquipo {
  id: number;
  identificador: string;
  is_active?: boolean;
  numero_celular?: string;
  tipo_equipo?: number;
  tipo_equipo_nombre: string;
}

export interface IAssetDocument {
  activo: number;
  valor:string;
  compania: string;
  comprobante: string;
  correos_notificaciones_m2m: Array<string>;
  dias_notificacion: number;
  fecha_expedicion: string;
  id: number;
  nombre_otro: string;
  numero_documento: string;
  tipo_documento: number;
  tramites_json: any;
  vigencia_desde: string;
  vigencia_hasta: string;
  open: boolean;
}

export interface IAssetDetail {
  id: number;
  cliente: number;
  cliente_nombre: string;
  contacto_json: IAssetContacto;
  creacion: IDetailsHistorico;
  documentos_json: IAssetDocumentosJSON;
  equipos: Array<IAssetEquipo>;
  especificaciones_tecnicas: string;
  foto: string;
  historico_cambios: Array<IDetailsHistorico>;
  icono: string;
  is_active: boolean;
  lista_verificacion_documentos: string;
  nombre: string;
  observaciones: string;
  odometro: number;
  pais: number;
  placa: string;
  propietario_json: IAssetDetailsPropietarioJSON;
  propietario_tarjeta: string;
  protocolo_alarmas: string;
  seguridad_json: any;
  servicio_nombre: string;
  tiempo_uso: string;
  tipo_activo: number;
  tipo_activo_nombre: string;
  tipo_vehiculo_nombre: string;
  varios_json: any;
  vehiculo_seguro: boolean;
  activo_asociado_nombre: string;
  activo_asociado: number;
}

export interface IAssetContacto {
  apellidos: string;
  cargo: string;
  ceular: number;
  ciudad: string;
  correo: string;
  departamento: string;
  nombre: string;
  telefono: number;
  celular: number;
  asignado:string;
  cargo_asignado:string;}

export interface IAssetDocumentosJSON {
  capacidad_pasajeros: number;
  chasis: string;
  cilindraje: number;
  color: string;
  linea: string;
  marca: string;
  modelo: number;
  motor: string;
  peso: number;
  puertas: number;
  radio_accion: string;
  serie: string;
  servicio: number;
  tipo_carroceria: string;
  tipo_combustible: string;
  transito: string;
  vin: string;
  modalidad_servicio: string;
  potencia: number;
  numero_thermo: string;
  serie_thermo: string;
  linea_thermo: string;
  controlador_thermo: string;
}

export interface IAssetDetailsPropietarioJSON {
  ciudad: string;
  correo: string;
  direccion: string;
  identificacion: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  celular: string;
}

export interface IAssetPreview {
  id: number;
  nombre: string;
  placa: string;
  vehiculo_seguro: string;
  icono: string;
}

export interface IAssetBasic {
  id: number;
  nombre: string;
  placa?: string;
  vehiculo_seguro?: boolean;
}

