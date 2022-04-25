export interface IMessagingListModel {
  count: number;
  next: string;
  previous: string;
  results: IMessagingListItem[];
}

export interface IMessagingListItem {
  id: number;
  activo: number
  activo_nombre: string;
  activo_placa: string;
  cliente: number;
  cliente_nombre: string;
  content: string;
  datetime: string;
  direction: string
  identifier: string;
  last_report_date: string;
  status: string;
  username: string;
  device: number;
}

