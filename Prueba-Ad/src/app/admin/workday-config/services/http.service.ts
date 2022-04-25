import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/consts/api.consts';
import { IWorkDayConfigListModel, IWorkdayConfigRetrieve } from '@shared/models/workday-config.model';
import { strFormat } from '@shared/utils/general.utils';
import { Observable } from 'rxjs';

@Injectable()
export class WorkdayConfigHttpService {

  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.routes.workday.config.general
  ): Observable<IWorkDayConfigListModel> {
    return this.httpClient.get<IWorkDayConfigListModel>(url, {params});
  }

  retrieve(id: number, params: any = {}): Observable<IWorkdayConfigRetrieve> {
    const url = strFormat(API_URL.routes.workday.config.instance, {id});
    return this.httpClient.get<IWorkdayConfigRetrieve>(url, {params});
  }

  bulk_destroy(ids: number[], names: string[], url: string = API_URL.routes.workday.config.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }




}
