import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';
import { IEcuAlarmDetails } from '@shared/models/ecu-alarm.model';

@Injectable()
export class SharedPermanenceDetailsHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  details(id: number, params: any = {}): Observable<any> {
    const url = strFormat(API_URL.assetEfficiency.latest, {id});

    return this.httpClient.get<any>(url, {params});
  }



}
