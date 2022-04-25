import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IDeviceDetails} from '@shared/models/devices.model';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';

@Injectable()
export class SharedDeviceHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  details(id: number, params: any = {}): Observable<IDeviceDetails> {
    const url = strFormat(API_URL.device.details, {id});
    return this.httpClient.get<IDeviceDetails>(url, {params});
  }
}
