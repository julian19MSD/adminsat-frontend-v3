

export interface IECUNotificationListModel {
  count: number;
  next: string;
  previous: string;
  results: IECUNotificationListItem[];
}

export interface IECUNotificationListItem {
  id: number;
  cliente: number;
  cliente_nombre: string;
  module:number;
  correos_notificaciones_m2m: Array<string>;
  validate_mail: Array<string>;
  ecu: {
    odometro: number;
    combustible_total: number;
    combustible_muerto: number;
    combustible_ahorrado: number;
    velocidad: number;
    temperatura_refrigerante_motor: number;
    presion_aceite: number;
    rpm_motor: number;
    dtc_motor: number;
    tiempo_muerto_motor: number;
    tiempo_crucero_activo: number;
    carga_motor: number;
    temperatura_aire_admision: number;
    presion_combustible: number;
    porcentaje_torque_motor: number
}
  isSelected: boolean;
}


export interface IECUNotificationRetrieve {
  id: number;
  cliente: number;
  cliente_nombre: string;
  module:number;
  correos_notificaciones_m2m: Array<string>;
  ecu: {
    odometro: number;
    combustible_total: number;
    combustible_muerto: number;
    combustible_ahorrado: number;
    velocidad: number;
    temperatura_refrigerante_motor: number;
    presion_aceite: number;
    rpm_motor: number;
    dtc_motor: number;
    tiempo_muerto_motor: number;
    tiempo_crucero_activo: number;
    carga_motor: number;
    temperatura_aire_admision: number;
    presion_combustible: number;
    porcentaje_torque_motor: number
}
  validate_mail: Array<string>;
  recaptcha: number;
}
