import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ControlZoneDetailsModel} from '@shared/models/control-zones.model';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';

@Injectable()
export class SharedDepartureMapsHttpService {

  constructor(private httpClient: HttpClient) {
  }

  details(id: number, departure: number, params: any = {}): Observable<any> {
    const url = strFormat(API_URL.routes.historicalShiftAssignment.aperturesDetails, {id, departure});
    return this.httpClient.get<any>(url, {params});
  }
}
