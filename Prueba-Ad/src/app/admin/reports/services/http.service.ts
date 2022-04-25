import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IName } from '@shared/models/general.model';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from '@shared/consts/api.consts';
import { ITypesReports } from '../reports.forms';

@Injectable()
export class ReportsHttpService {

  constructor(private httpClient: HttpClient) {
  }

  getTipos(params: any = {}): Observable<ITypesReports[]> {
    return this.httpClient.get<ITypesReports[]>(API_URL.reports.tipos, {
      params,
    });
  }
}
