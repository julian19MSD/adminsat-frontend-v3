import { Injectable } from '@angular/core';
import { strFormat } from '@shared/utils/general.utils';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/consts/api.consts';
import {
   IZonesListModel,
   IZonesRetrieve   
  } from '@shared/models/zones.model'
import { Observable } from 'rxjs';
import { IName } from '@shared/models/general.model';



@Injectable()
export class ZonesHttpService {
  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.zones.general
  ): Observable<IZonesListModel> {
    return this.httpClient.get<IZonesListModel>(url, {params});
  }


  bulk_destroy(ids: number[], names: string[], url: string = API_URL.zones.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }

  select_manufacturers_tire( url: string = API_URL.references.tireManufacturers.select): Observable<IName[]> {
    return this.httpClient.get<IName[]>(url);
  }


  download(params: any = {}, url: string = API_URL.zones.download): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  update(data, params: any = {}): Observable<IZonesRetrieve> {
    const url = strFormat(API_URL.zones.instance, {id: params.id});
    if (params.partial) {
      return this.httpClient.patch<IZonesRetrieve>(url, data);
    }
    return this.httpClient.put<IZonesRetrieve>(url, data);
  }

  create(data, params: any = {}, url: string = API_URL.zones.general): Observable<IZonesRetrieve> {
    return this.httpClient.post<IZonesRetrieve>(url, data);
  }


  retrieve(id: number, params: any = {}): Observable<IZonesRetrieve> {
    const url = strFormat(API_URL.zones.instance, {id});
    return this.httpClient.get<IZonesRetrieve>(url, {params});
  }


}
