import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/consts/api.consts';
import { Observable } from 'rxjs';



@Injectable()
export class CommandsHttpService {
  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.auditoria_commands.general
  ): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }


  download(
    params: any = {},
    url: string =  API_URL.auditoria_commands.download
  ): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

}
