import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {IAlarmItem, IAlarmList} from '@shared/models/alarm.model';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';


@Injectable()
export class AlarmsHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  list(params: any = {}, url: string = API_URL.alarm.general): Observable<IAlarmList> {
    return this.httpClient.get<IAlarmList>(url, {params});
  }

  retrieve(id: number, params: any = {}): Observable<IAlarmItem> {
    const url = strFormat(API_URL.alarm.instance, {id});
    return this.httpClient.get<IAlarmItem>(url, {params}).pipe(
      map(res => {
        if (res.marcador.length > 0) {
          const item = res.marcador[0];
          res.marcador = [];
          res.marcador[item.activo] = item;
        }
        return res;
      })
    );
  }
}
