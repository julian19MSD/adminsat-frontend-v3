import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/consts/api.consts';
import { IWorkdayListModel, WorkdayNoveltySelectModel, WorkdayRoadActorModel } from '@shared/models/workday.model';
import { strFormat } from '@shared/utils/general.utils';
import { Observable } from 'rxjs';

@Injectable()
export class WorkdayHttpService {

  constructor(private httpClient: HttpClient) {
  }

  addObservation(info: any, params: any): Observable<any[]> {
    const url = strFormat(API_URL.routes.workday.observation.general, {id: params.id});
    return this.httpClient.post<any[]>(url, info);
  }

  list(
    params: any = {},
    url: string = API_URL.routes.workday.general
  ): Observable<IWorkdayListModel> {
    return this.httpClient.get<IWorkdayListModel>(url, { params });
  }

  download(
    params: any = {},
    url: string = API_URL.routes.workday.download
  ): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  create(data, params: any = {}, url: string = API_URL.routes.workday.general): Observable<any> {
    return this.httpClient.post<any>(url, data);
  }

  finalize(ids: number[], names: string[], url: string = API_URL.routes.workday.finish): Observable<any> {
    return this.httpClient.patch(url, { ids });
  }


  getRoadActors(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.road_actor.select, { params });
  }

  getAssets(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.asset.select, { params });
  }

  getShift(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.routes.workday.enturnamiento.select, { params });
  }



  noveltysSelect(params: any = {}, url: string = API_URL.routes.workday.novelty.select): Observable<WorkdayNoveltySelectModel[]> {
    return this.httpClient.get<WorkdayNoveltySelectModel[]>(url, {params});
  }


  actorsSelect(id: number, params: any = {}): Observable<WorkdayRoadActorModel[]> {
    const url = strFormat(API_URL.routes.workday.novelty.actores, {id});
    return this.httpClient.get<WorkdayRoadActorModel[]>(url, {params});
  }

  changeActor(info: any, params: any): Observable<any[]> {
    const url = strFormat(API_URL.routes.workday.novelty.cambiarActor, {id: params.id});
    return this.httpClient.patch<any[]>(url, info);
  }


  manualFinish(info: any, params: any): Observable<any[]> {
    const url = strFormat(API_URL.routes.workday.novelty.finalizacionManual, {id: params.id});
    return this.httpClient.patch<any[]>(url, info);
  }





}
