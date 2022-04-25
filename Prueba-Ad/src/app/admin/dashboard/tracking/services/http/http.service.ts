import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDashBoardTracking} from '@shared/models/dashboard.model';
import {API_URL} from '@shared/consts/api.consts';

@Injectable()
export class DashboardTrackingHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  trracking(params: any = {}): Observable<IDashBoardTracking> {
    return this.httpClient.get<IDashBoardTracking>(API_URL.dashboard.tracking, {params});
  }
}
