import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/consts/api.consts';
import { INotificationListModel, INotificationRetrieve } from '@shared/models/admin-notification.model';
import { strFormat } from '@shared/utils/general.utils';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationHttpService {

  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.notifications.tracking.general
  ): Observable<INotificationListModel> {
    return this.httpClient.get<INotificationListModel>(url, {params});
  }

  retrieve(id: number, params: any = {}): Observable<INotificationRetrieve> {
    const url = strFormat(API_URL.notifications.tracking.instance, {id});
    return this.httpClient.get<INotificationRetrieve>(url, {params});
  }

  bulk_destroy(ids: number[], names: string[], url: string = API_URL.notifications.tracking.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }




}
