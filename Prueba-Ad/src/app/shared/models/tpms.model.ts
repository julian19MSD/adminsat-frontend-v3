import { IDetailsHistorico, IValue } from '@shared/models/general.model';
import { IDeviceIdentificator } from '@shared/models/devices.model';


export interface ITpmsListModel {
  count: number;
  next: string;
  previous: string;
  results: ITpmsListItem[];
}

export interface ITpmsListItem {
  id: number;
  referencia: string;
  cliente: number;
  cliente_nombre: string;
  fabricante: number;
  fabricante_nombre: string;
  isSelected: boolean;
}

export interface ITpmsChoices {
  estado_choices: Array<IValue>;
  posicion_choices: Array<IValue>;
}


export interface ITpmsRetrieve {
  id: number;
  referencia: string;
  posicion: number;
  estado: number;
  presion: number;
  temperatura: number;
  cliente: number;
  fabricante: number;
}

export interface ITpmsDetail {
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
