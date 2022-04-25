import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/consts/api.consts';
import { IPermanenceListModel } from '@shared/models/permanence.model';
import { Observable } from 'rxjs';

@Injectable()
export class PermanenceHttpService {

  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.assetEfficiency.general
  ): Observable<IPermanenceListModel> {
    return this.httpClient.get<IPermanenceListModel>(url, { params });
  }

  // download(
  //   params: any = {},
  //   url: string = API_URL.messaging.download
  // ): Observable<any> {
  //   return this.httpClient.get<any>(url, {params});
  // }




}
