export interface IGettingLocation {
  [parameter: number]: boolean;
}

export interface IRequestLocation {
  identificador: string;
  tipo: number;
  nombre: string;
}

export interface IListCommand {
  identificador: string;
  tipo: number;
  nombre: string;
  equipo_id: string;
  comandos: ICommand[];
  
}

export interface ICommand {
  id: number;
  comando: string;
  nombre: string;
  comando_equipo_id: number;
}


export interface ILocationCommandBody {
  aviableCommand: IListCommand;
  identifier: string;
  typeDevice: number;
}
