import {IAssetPreview} from '@shared/models/assets.model';
import {IDetailsHistorico, IValue} from '@shared/models/general.model';


export interface ISendCommandPreview {
  comando: number;
  comando_nombre:string;
  id: number;
  nombre: string;
  tipo_equipo:number;
}

export interface ITypesSendCommands {
  id: number;
  name: string;
  url: string;
  download: string;
  }


  export interface IListCommands {
    id: number;
    cliente: number;
    client_name: string;
    device: number;
    identifier: string;
    activo:number;    
    asset_name:string;
    command_type: number;
    technical_command: string;
    command:string;
    fecha: string;
    order:number;
    retries: number;
    technical_response : string;
    response_message:string;
    status: number;
    status_nombre: string;
  
    }
  

    export interface ISendCommandDeviceSelect {
      activo_id: number;
      activo_nombre: string;
      id: number;
      identificador: string;
      tipo_equipo_nombre: string;
      nombre: string;
    }
    