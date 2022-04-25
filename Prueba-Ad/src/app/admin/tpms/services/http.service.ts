import { Injectable } from '@angular/core';
import { strFormat } from '@shared/utils/general.utils';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/consts/api.consts';
import {
   ITpmsListModel,
   ITpmsRetrieve, 
   ITpmsChoices
  } from '@shared/models/tpms.model'
import { Observable } from 'rxjs';
import { IName } from '@shared/models/general.model';



@Injectable()
export class TpmsHttpService {
  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.tpms.general
  ): Observable<ITpmsListModel> {
    return this.httpClient.get<ITpmsListModel>(url, {params});
  }


  bulk_destroy(ids: number[], names: string[], url: string = API_URL.tpms.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }

  select_manufacturers_tire( url: string = API_URL.references.tireManufacturers.select): Observable<IName[]> {
    return this.httpClient.get<IName[]>(url);
  }

 
  select(params: any = {}): Observable<IName[]> {
    return this.httpClient.get<IName[]>(API_URL.tpms.select, {params});
  }

  download(params: any = {}, url: string = API_URL.tpms.download): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  update(data, params: any = {}): Observable<ITpmsRetrieve> {
    const url = strFormat(API_URL.tpms.instance, {id: params.id});
    if (params.partial) {
      return this.httpClient.patch<ITpmsRetrieve>(url, data);
    }
    return this.httpClient.put<ITpmsRetrieve>(url, data);
  }

  create(data, params: any = {}, url: string = API_URL.tpms.general): Observable<ITpmsRetrieve> {
    return this.httpClient.post<ITpmsRetrieve>(url, data);
  }


  retrieve(id: number, params: any = {}): Observable<ITpmsRetrieve> {
    const url = strFormat(API_URL.tpms.instance, {id});
    return this.httpClient.get<ITpmsRetrieve>(url, {params});
  }

  getChoices(params: any = {}, url: string = API_URL.tpms.choices): Observable<ITpmsChoices> {
    return this.httpClient.get<ITpmsChoices>(url, {params});
  }
}
