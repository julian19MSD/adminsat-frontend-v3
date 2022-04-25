import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_URL} from '@shared/consts/api.consts';
import { Observable } from 'rxjs';
import { IName } from '@shared/models/general.model';
import { strFormat } from '@shared/utils/general.utils';
import { IBeneficiosChoices, IRoadActorChoices, IRoadActorListModel, IRoadActorRetrieve, IRoadActorTicket } from '@shared/models/road-actor.model';

@Injectable()
export class RoadActorHttpService {

  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.road_actor.general
  ): Observable<IRoadActorListModel> {
    return this.httpClient.get<IRoadActorListModel>(url, {params});
  }

  bulk_destroy(
    ids: number[],
    names: string[],
    url: string = API_URL.road_actor.bulk_delete
  ): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }

  select(params: any = {}): Observable<IName[]> {
    return this.httpClient.get<IName[]>(API_URL.road_actor.select, {
      params,
    });
  }


  retrieve(id: number, params: any = {}): Observable<IRoadActorRetrieve> {
    const url = strFormat(API_URL.road_actor.instance, {id});
    return this.httpClient.get<IRoadActorRetrieve>(url, {params});
  }

  download(
    params: any = {},
    url: string = API_URL.road_actor.download
  ): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  getChoices(
    params: any = {},
    url: string = API_URL.road_actor.choices
  ): Observable<IRoadActorChoices> {
    return this.httpClient.get<IRoadActorChoices>(url, {params});
  }

  getVehicleTypes(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.references.vehicleType.select, {
      params,
    });
  }

  getRoadActorTypes(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.references.road_actor.select, {
      params,
    });
  }
  getBenefits(params: any = {}): Observable<IBeneficiosChoices[]> {

    return this.httpClient.get<IBeneficiosChoices[]>(API_URL.references.benefits.choices, {params});
  }


}


@Injectable()
export class ActorTicketsHttpService {

  constructor(private httpClient: HttpClient) {
  }


  retrieve( id: number): Observable<any> {
    const url = strFormat(API_URL.road_actor.tickets.instance, { id});
    return this.httpClient.get<any>(url);
  }

  list( params: any = {}): Observable<IRoadActorTicket[]> {
    // const url = strFormat(API_URL.road_actor.tickets.general, {actorId});
    return this.httpClient.get<IRoadActorTicket[]>(API_URL.road_actor.tickets.general, {params});
  }

  select(actorId: number): Observable<IName[]> {
    const url = strFormat(API_URL.road_actor.tickets.select, {actorId});
    return this.httpClient.get<IName[]>(url);
  }

  delete(actorId: number, id: number): Observable<any> {
    const url = strFormat(API_URL.road_actor.tickets.instance, {actorId, id});
    return this.httpClient.delete<any>(url);
  }

  bulk_destroy(
    ids: number[],
    names: string[],
    url: string = API_URL.road_actor.tickets.bulk_delete
  ): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }
}

