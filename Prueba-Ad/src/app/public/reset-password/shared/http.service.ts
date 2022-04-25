import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {strFormat} from '@shared/utils/general.utils';
import {API_URL} from '@shared/consts/api.consts';

@Injectable()
export class ResetPasswordHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public validate(uuid: string, token: string, currentLang: string): Observable<any> {
    const url = strFormat(API_URL.password.validate, {uuid, token});
    return this.httpClient.get<any>(url, {headers: {'Accept-Language': currentLang}});
  }
}
