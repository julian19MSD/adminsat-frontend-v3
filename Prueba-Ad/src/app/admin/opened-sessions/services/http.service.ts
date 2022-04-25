import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_URL} from '@shared/consts/api.consts';
import {ISessionList} from '@shared/models/opened-sessions.model';
import {strFormat} from '@shared/utils/general.utils';

@Injectable()

export class OpenedSessionsHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  list(): Observable<ISessionList> {
    return this.httpClient.get<ISessionList>(API_URL.profile.sessions.list);
  }

  close(id: number): Observable<any> {
    const url = strFormat(API_URL.profile.sessions.item, {id});
    return this.httpClient.delete<any>(url);
  }

  closeAll(): Observable<any> {
    return this.httpClient.delete<any>(API_URL.profile.sessions.list);
  }

}
