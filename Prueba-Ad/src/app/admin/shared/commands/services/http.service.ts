import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ICommandsDetail } from '@shared/models/commands.model';
import { API_URL } from '@shared/consts/api.consts';
import { strFormat } from '@shared/utils/general.utils';

@Injectable()

export class SharedCommandsHttpService {

  constructor(private httpClient: HttpClient) { }

  
  details(id: number, params: any = {}): Observable<ICommandsDetail> {
    const url = strFormat(API_URL.tpms.details, {id});
    return this.httpClient.get<ICommandsDetail>(url, {params});
  }
}
