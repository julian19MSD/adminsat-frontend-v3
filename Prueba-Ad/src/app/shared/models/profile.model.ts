import {IValue} from '@shared/models/general.model';

export interface IProfile {
  alarmas: Array<any>;
  correo: string;
  correos_notificaciones_m2m: Array<string>;
  homepage: string;
  enviar_alarma_correo: boolean;
  enviar_notifi_correo: boolean;
  first_name: string;
  idioma: string;
  last_name: string;
  notificaciones: Array<any>;
  foto: string;
  formatos_json: IProfileListFormatsItem;
  validate_mail: Array<string>;
}

export interface IProfileListFormatsItem {
  velocity: string;
  timedelta: string;
  distance: string;
  datetime: string;
  coordinate: string;
}

export interface IProfileChoices {
  languages: IValue[];
  homepages: IValue[];
  velocity: IValue[];
  pressure: IValue[];
  volume: IValue[];
  coordinate: IValue[];
  distance: IValue[];
  timedelta: IValue[];
  date: IValue[];
  time: IValue[];
  date_report: IValue[];
  time_report: IValue[];
}


