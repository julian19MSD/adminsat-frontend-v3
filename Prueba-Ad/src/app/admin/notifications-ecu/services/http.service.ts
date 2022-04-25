import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/consts/api.consts';
import { IECUNotificationListModel, IECUNotificationRetrieve } from '@shared/models/ecu-notification.model';
import { strFormat } from '@shared/utils/general.utils';
import { Observable } from 'rxjs';

@Injectable()
export class ECUNotificationHttpService {

  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.notifications.ecu.general
  ): Observable<IECUNotificationListModel> {
    return this.httpClient.get<IECUNotificationListModel>(url, {params});
  }

  retrieve(id: number, params: any = {}): Observable<IECUNotificationRetrieve> {
    const url = strFormat(API_URL.notifications.ecu.instance, {id});
    return this.httpClient.get<IECUNotificationRetrieve>(url, {params});
  }

  bulk_destroy(ids: number[], names: string[], url: string = API_URL.notifications.ecu.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }




}
