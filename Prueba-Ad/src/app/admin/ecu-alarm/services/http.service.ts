import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/consts/api.consts';
import { IEcuAlarmListModel } from '@shared/models/ecu-alarm.model';
import { IValue } from '@shared/models/general.model';
import { Observable } from 'rxjs';

@Injectable()
export class EcuAlarmHttpService {

  constructor(private httpClient: HttpClient) {
  }



  list(
    params: any = {},
    url: string = API_URL.ecuAlarm.general
  ): Observable<IEcuAlarmListModel> {
    return this.httpClient.get<IEcuAlarmListModel>(url, { params });
  }

  download(
    params: any = {},
    url: string = API_URL.ecuAlarm.download
  ): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  getChoices(
    params: any = {},
    url: string = API_URL.ecuAlarm.choices
  ): Observable<Array<IValue>> {
    return this.httpClient.get<Array<IValue>>(url, {params});
  }


}
