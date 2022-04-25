import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '@shared/consts/api.consts';
import {IHistoricalShiftAsingmentChoices, IHistoricalShiftAsingmentList} from '@shared/models/shift-assignment';

@Injectable()
export class HistoricalShiftAssignmentHttpService {

  constructor(private httpClient: HttpClient) {
  }

  getChoices(params: any = {}, url: string = API_URL.routes.historicalShiftAssignment.choices): Observable<IHistoricalShiftAsingmentChoices> {
    return this.httpClient.get<IHistoricalShiftAsingmentChoices>(url, {params});
  }

  list(params: any = {}, url: string = API_URL.routes.historicalShiftAssignment.general): Observable<IHistoricalShiftAsingmentList> {
    return this.httpClient.get<IHistoricalShiftAsingmentList>(url, {params});
  }

  restore(ids: number[], hardRestore: boolean, url: string = API_URL.routes.historicalShiftAssignment.reset): Observable<any> {
    return this.httpClient.post<any>(url, {ids, reiniciar_todo: hardRestore});
  }

}
