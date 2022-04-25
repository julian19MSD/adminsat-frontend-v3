import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';
import {INovletyList} from '@shared/models/novlety.models';
import {IName} from '@shared/models/general.model';

@Injectable()
export class NoveltyHttpService {


  constructor(private httpClient: HttpClient) {
  }

  list(params: any = {}, url: string = API_URL.routes.novelty.general): Observable<INovletyList> {
    return this.httpClient.get<INovletyList>(url, {params});
  }

  select(params: any = {}, url: string = API_URL.routes.novelty.select): Observable<IName[]> {
    return this.httpClient.get<IName[]>(url, {params});
  }

  create(info: any, params: any, url: string = API_URL.routes.novelty.general): Observable<any> {
    return this.httpClient.post<any>(url, info);
  }

  retrieve(id: number): Observable<any> {
    const url = strFormat(API_URL.routes.novelty.instance, {id});
    return this.httpClient.get<any>(url);
  }

  update(info: any, params: any): Observable<any> {
    const url = strFormat(API_URL.routes.novelty.instance, {id: params.id});
    if (params.partial) {
      return this.httpClient.patch<any>(url, info);
    } else {
      return this.httpClient.put<any>(url, info);
    }
  }


  bulk_destroy(ids: number[], names: string[], url: string = API_URL.routes.novelty.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }

}
