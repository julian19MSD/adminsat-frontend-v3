import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';
import { IZonesRetrieve } from '@shared/models/zones.model';

@Injectable()
export class SharedZonesHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  retrieve(id: number, params: any = {}): Observable<IZonesRetrieve> {
    const url = strFormat(API_URL.zones.instance, {id});

    return this.httpClient.get<IZonesRetrieve>(url, {params});
  }

  updateSubzone(id: number, body: any): Observable<any> {
    const url = strFormat(API_URL.subzones.instance, {id});
    return this.httpClient.patch<any>(url, body);
  }


  bulk_destroy(ids: number[], names: string[], url: string = API_URL.subzones.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }


}
