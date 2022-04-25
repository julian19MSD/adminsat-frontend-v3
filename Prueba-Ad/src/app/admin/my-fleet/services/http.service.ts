import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IClientOption} from '@shared/models/client.model';
import {API_URL} from '@shared/consts/api.consts';
import { IFleetInfo } from '@shared/models/my-fleet';
import { strFormat } from '@shared/utils/general.utils';

@Injectable()
export class MyFleetHttpService {

  constructor(private httpClient: HttpClient) {
  }

  selectClients(params: any = {}): Observable<IClientOption[]> {
    return this.httpClient.get<IClientOption[]>(API_URL.client.select, {params});
  }


}

@Injectable()
export class MyFleetDashboardHttpService {

  constructor(private httpClient: HttpClient) {
  }


  fleet(params: any = {}): Observable<IFleetInfo> {
    return this.httpClient.get<IFleetInfo>(API_URL.fleet.fleet, {params});
  }

  subinstallations(id: number, params: any = {}):Observable<any>{
    const url = strFormat(API_URL.fleet.subinstallations, {id});

    return this.httpClient.get<any>(url,  {params})
  }

  

}
