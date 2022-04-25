import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IName } from '@shared/models/general.model';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from '@shared/consts/api.consts';
import { ISendCommandDeviceSelect } from '@shared/models/send-command.model';

@Injectable()
export class SendCommandsHttpService {

  constructor(private httpClient: HttpClient) {
  }

  getTiposEquipos(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.references.tipo_equipos.select, {
      params,
    });
  }

  getEquipos(params: any = {}): Observable<ISendCommandDeviceSelect[]> {
    return this.httpClient.get<ISendCommandDeviceSelect[]>(API_URL.device.select, {
      params,
    });
  }

  getComandos(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.references.comandos_equipo.select, {
      params,
    }); 
  }


  updateStatusCommands(ids: any = {}): Observable<any[]> {
    return this.httpClient.post<any[]>(API_URL.auditoria_commands.get_status, ids
    );
  }
}
