import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {strFormat} from '@shared/utils/general.utils';
import {API_URL} from '@shared/consts/api.consts';
import {IRoutesDetails} from '@shared/models/routes.models';

@Injectable()
export class SharedRouteDetailsHttpService {

  constructor(private httpClient: HttpClient) {
  }

  details(id: number, params: any = {}): Observable<IRoutesDetails> {
    const url = strFormat(API_URL.routes.details, {id});
    return this.httpClient.get<IRoutesDetails>(url, {params});
  }
}
