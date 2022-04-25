import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IShiftAssignmentDetails} from '@shared/models/shift-assignment';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';

@Injectable()
export class SharedShiftAssignmentDetailsHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  details(id: number, enCurso: boolean, params: any = {}): Observable<IShiftAssignmentDetails> {
    const baseUrl = enCurso ? API_URL.routes.shiftAssignment.details : API_URL.routes.historicalShiftAssignment.details;
    const url = strFormat(baseUrl, {id});
    return this.httpClient.get<IShiftAssignmentDetails>(url, {params});
  }

  updateControlZone(id: number, controlZoneId: number, body: any): Observable<any> {
    const url = strFormat(API_URL.routes.shiftAssignment.controlZone.instance, {id, controlZoneId});
    return this.httpClient.patch<any>(url, body);
  }
}


@Injectable()
export class SharedShiftAssignmentDeparturesHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  departures(id: number, params: any = {}): Observable<any> {
    const baseUrl = API_URL.routes.historicalShiftAssignment.apertures;
    const url = strFormat(baseUrl, {id});
    return this.httpClient.get<any>(url, {params});
  }


  updateObservation(id: number, departure: number, body: any): Observable<any> {
    const url = strFormat(API_URL.routes.historicalShiftAssignment.observationDepartures, {id, departure});
    return this.httpClient.patch<any>(url,{observation:body});
  }

}
