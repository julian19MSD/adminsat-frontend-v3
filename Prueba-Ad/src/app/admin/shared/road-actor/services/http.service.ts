import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {IRoadActorDetail} from '@shared/models/road-actor.model';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';

@Injectable()
export class SharedRoadActorHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  details(id: number, params: any = {}): Observable<IRoadActorDetail> {
    const url = strFormat(API_URL.road_actor.details, {id});
    return this.httpClient.get<IRoadActorDetail>(url, {params});
  }
}
