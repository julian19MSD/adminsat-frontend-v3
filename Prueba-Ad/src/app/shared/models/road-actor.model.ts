import {IAssetPreview} from '@shared/models/assets.model';
import {IDetailsHistorico, IValue} from '@shared/models/general.model';

export interface IRoadActorListModel {
  count: number;
  next: string;
  previous: string;
  results: IRoadActorListItem[];
}


export interface IRoadActorChoices {
  tipo_documento: Array<IValue>;
  estado_civil: Array<IValue>;
  nivel_estudios: Array<IValue>;
  grupo_trabajo: Array<IValue>;
  tipo_contrato: Array<IValue>;
  tipo_vinculacion: Array<IValue>;
  tipo_licencia: Array<IValue>;
  genero: Array<IValue>;
}

export interface IRoadActorListItem {
  nombre: string;
  apellidos: string;
  id: number;
  cliente: number;
  cliente_nombre: string;
  tipo_documento_identidad: string;
  numero_documento_identidad: string;
  full_name: string;
  is_active: boolean;
  actor_seguro: boolean;
  tipo_actor_nombre: string;
  telefono: number;
  correo: string;
  celular: number;
  foto: string;
  isSelected: boolean;
}


export interface IRoadActorRetrieve {
  id: number;
  activo: number;
  actor_seguro: boolean;
  apellidos: string;
  celular: number;
  ciudad: string;
  cliente_id: number;
  correo_id: string;
  correos_notificaciones_m2m: Array<any>;
  datos_medicos_json: {};
  datos_personales_json: {}
  fecha_nacimiento: string;
  nacionalidad: string;
  sexo: string;
  detalles_json: {};
  direccion: string;
  examen_agudeza: string;
  examen_atencion: string;
  examen_audiometria: string;
  examen_coordinacion_motriz: string;
  examen_habilidad: string;
  examen_medico: string;
  examen_prueba_ingreso: string;
  examen_prueba_practica: string;
  examen_prueba_teorica: string;
  examen_psicologia: string;
  examen_psicosensorica: string;
  examen_visiometria: string;
  fecha_creacion: string;
  formacion_json: {};
  foto: string;
  gettze: boolean;
  habeasdata: boolean;
  ibutton: number;
  informacion_laboral_json: {};
  is_active: boolean;
  is_demo: boolean;
  nombre: string;
  numero_documento_identidad: string;
  prestacionessociales: Array<number>;
  prestacionessociales_detalles: Array<IPrestacionesSociales>;
  runt: string;
  sesion_activo: boolean;
  telefono: number
  tipo_actor_id: number
  tipo_documento_identidad: string;
  validate_mail: Array<string>;
}


export interface IPrestacionesSociales {
  id: number;
  nombre: string;
  tipo_nombre: string;
  tipo: string;
}

export interface IBeneficiosChoices {
  tipo_nombre: string;
  values: Array<IPrestacionesSociales>;
}


export interface IRoadActorDetail {
  id: number;
  activo: IAssetPreview;
  actor_seguro: boolean;
  apellidos: string;
  celular: string;
  ciudad: string;
  cliente: number;
  cliente_nombre: string;
  correo: string;
  correos_notificaciones_m2m: any;
  creacion: IDetailsHistorico;
  datos_personales_json: any;
  direccion: string;
  examen_agudeza: any;
  examen_atencion: any;
  examen_audiometria: any;
  examen_coordinacion_motriz: any;
  examen_habilidad: any;
  examen_medico: any;
  examen_prueba_ingreso: any;
  examen_prueba_practica: any;
  examen_prueba_teorica: any;
  examen_psicologia: any;
  examen_psicosensorica: any;
  examen_visiometria: any;
  formacion_json: any;
  foto: string;
  gettze: boolean;
  habeasdata: boolean;
  historico_cambios: IDetailsHistorico[];
  ibutton: string;
  informacion_laboral_json: any;
  is_active: boolean;
  nombre: string;
  numero_documento_identidad: string;
  prestacionessociales: any[];
  runt: string;
  telefono: string;
  tipo_actor: number;
  tipo_actor_nombre: string;
  tipo_documento_identidad: number;
  unsafe_actor_details: any;
  eps_id: any;
  arl_id: any;
  pensiones_id: any;
  cesantias_id: any;
  caja_de_compensacion_familiar_id: any;
  comparendos: IRoadActorTicket[];

  [parameter: string]: any;
}


export interface IRoadActorTicket {
  actor_vial: number;
  codigo_infraccion: string;
  comparendo: string;
  comprobante_pago: string;
  descripcion: string;
  fecha: string;
  id: number;
  numero: string;
  pago: boolean;
  others: boolean;
  open: boolean;

  valor:number;
  interes: number;
  valor_total: number;
  resolucion: string;
  fecha_resolucion: string;
  activo: number;
  observacion: string;
  recaptcha: string;
}

export interface IRoacActorPreview {
  id: number;
  nombre: string;
  identificacion: string;
}

