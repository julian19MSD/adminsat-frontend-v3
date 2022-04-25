import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/consts/api.consts';
import { IMessagingListModel } from '@shared/models/messaging.model';
import { IValue } from '@shared/models/general.model';
import { Observable } from 'rxjs';

@Injectable()
export class MessagingHttpService {

  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.messaging.general
  ): Observable<IMessagingListModel> {
    return this.httpClient.get<IMessagingListModel>(url, { params });
  }

  download(
    params: any = {},
    url: string = API_URL.messaging.download
  ): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  getAssets(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.asset.select, { params });
  }

  getDevices(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.device.select, { params });
  }



}
