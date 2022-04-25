import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ControlZoneDetailsModel} from '@shared/models/control-zones.model';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';

@Injectable()
export class SharedControlZoneDetailsHttpService {

  constructor(private httpClient: HttpClient) {
  }

  details(id: number, params: any = {}): Observable<ControlZoneDetailsModel> {
    const url = strFormat(API_URL.controlZone.details, {id});
    return this.httpClient.get<ControlZoneDetailsModel>(url, {params});
  }
}
