

export interface INotificationListModel {
  count: number;
  next: string;
  previous: string;
  results: INotificationListItem[];
}

export interface INotificationListItem {
  id: number;
  cliente: number;
  cliente_nombre: string;
  module:number;
  correos_notificaciones_m2m: Array<string>;
  validate_mail: Array<string>;
  tracking :{
    assets: Array<number>,
    time_without_reporting:number
  };
  isSelected: boolean;
}


export interface INotificationRetrieve {
  id: number;
  cliente: number;
  cliente_nombre: string;
  module:number;
  correos_notificaciones_m2m: Array<string>;
  tracking :{
    assets: Array<number>,
    time_without_reporting:number
  };
  validate_mail: Array<string>;
  recaptcha: number;
}
