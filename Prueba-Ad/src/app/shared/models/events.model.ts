export interface IEvents {
  id: number;
  nombre: string;
  color: string;
}

export interface IEventsName {
  id: number;
  nombre: string;
  color: string;

  [propName: string]: any;
}
