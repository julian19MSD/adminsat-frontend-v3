import { IDetailsHistorico, IValue } from '@shared/models/general.model';
import { IDeviceIdentificator } from '@shared/models/devices.model';


export interface ICommandsListModel {
  count: number;
  next: string;
  previous: string;
  results: ICommandsListItem[];
}

export interface ICommandsListItem {
  action: number;
  activo: number;
  asset_name: string;
  client_name: string;
  cliente: number;
  command: string;
  command_type: number;
  device: number;
  id: number;
  identifier: string;
  order: number;
  response_message: string;
  retries: number;
  send_dt: string;
  status: number;
  status_nombre: string;
  technical_command: string;
  technical_response: string;
  user: number;
  username: string;
}

export interface ICommandsChoices {
  estado_choices: Array<IValue>;
  posicion_choices: Array<IValue>;
}


export interface ICommandsRetrieve {
  id: number;
  referencia: string;
  posicion: number;
  estado: number;
  presion: number;
  temperatura: number;
  cliente: number;
  fabricante: number;
}

export interface ICommandsDetail {
  id: number;
  cliente_nombre: string;
  fabricante_nombre: string;
  referencia: string;
  posicion: number;
  estado: number;
  presion: number;
  temperatura: number;
  cliente: number;
  fabricante:number;
  creacion: IDetailsHistorico;
  historico_cambios: Array<IDetailsHistorico>;
}
