import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ITpmsDetail } from '@shared/models/tpms.model';
import { API_URL } from '@shared/consts/api.consts';
import { strFormat } from '@shared/utils/general.utils';

@Injectable()

export class SharedTpmsHttpService {

  constructor(private httpClient: HttpClient) { }

  
  details(id: number, params: any = {}): Observable<ITpmsDetail> {
    const url = strFormat(API_URL.tpms.details, {id});
    return this.httpClient.get<ITpmsDetail>(url, {params});
  }
}
