import { Injectable } from '@angular/core';
import { strFormat } from '@shared/utils/general.utils';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/consts/api.consts';
import {
   IInstallationsListModel,
   IInstallationsRetrieve   
  } from '@shared/models/installations.model'
import { Observable } from 'rxjs';
import { IName } from '@shared/models/general.model';



@Injectable()
export class InstallationsHttpService {
  constructor(private httpClient: HttpClient) {
  }


  getIcons(params: any = {type: 1}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.references.icons.select, {
      params,
    });
  }

  list(
    params: any = {},
    url: string = API_URL.installations.general
  ): Observable<IInstallationsListModel> {
    return this.httpClient.get<IInstallationsListModel>(url, {params});
  }


  bulk_destroy(ids: number[], names: string[], url: string = API_URL.installations.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }

  select_manufacturers_tire( url: string = API_URL.references.tireManufacturers.select): Observable<IName[]> {
    return this.httpClient.get<IName[]>(url);
  }


  download(params: any = {}, url: string = API_URL.installations.download): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  update(data, params: any = {}): Observable<IInstallationsRetrieve> {
    const url = strFormat(API_URL.installations.instance, {id: params.id});
    if (params.partial) {
      return this.httpClient.patch<IInstallationsRetrieve>(url, data);
    }
    return this.httpClient.put<IInstallationsRetrieve>(url, data);
  }

  create(data, params: any = {}, url: string = API_URL.installations.general): Observable<IInstallationsRetrieve> {
    return this.httpClient.post<IInstallationsRetrieve>(url, data);
  }


  retrieve(id: number, params: any = {}): Observable<IInstallationsRetrieve> {
    const url = strFormat(API_URL.installations.instance, {id});
    return this.httpClient.get<IInstallationsRetrieve>(url, {params});
  }


}
