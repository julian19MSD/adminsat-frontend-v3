import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';
import { IInstallationsRetrieve } from '@shared/models/installations.model';

@Injectable()
export class SharedInstallationsHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  retrieve(id: number, params: any = {}): Observable<IInstallationsRetrieve> {
    const url = strFormat(API_URL.installations.instance, {id});

    return this.httpClient.get<IInstallationsRetrieve>(url, {params});
  }

  updateSubinstallation(id: number, body: any): Observable<any> {
    const url = strFormat(API_URL.subinstallations.instance, {id});
    return this.httpClient.patch<any>(url, body);
  }


  bulk_destroy(ids: number[], names: string[], url: string = API_URL.subinstallations.bulk_delete): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }


}
