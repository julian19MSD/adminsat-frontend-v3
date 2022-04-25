import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IClientOption} from '@shared/models/client.model';
import {API_URL} from '@shared/consts/api.consts';

@Injectable()
export class DashboardHttpService {

  constructor(private httpClient: HttpClient) {
  }

  selectClients(params: any = {}): Observable<IClientOption[]> {
    return this.httpClient.get<IClientOption[]>(API_URL.client.select, {params});
  }

}
