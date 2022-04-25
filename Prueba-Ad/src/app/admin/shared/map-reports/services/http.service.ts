import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { timeout} from 'rxjs/operators';
import {IReportListItem} from '@shared/models/tracking.models';
import {API_URL, API_URL1} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';
import {IEventsName} from '@shared/models/events.model';
import { ControlZoneDetailsModel } from '@shared/models/control-zones.model';
import { IName } from '@shared/models/general.model';
import { IControlZoneOperatingWindow } from '@shared/models/installations-control.models';

@Injectable()
export class SharedMapReportHttpService {

  constructor(private httpClient: HttpClient) {
  }


  lastReport(id: number): Observable<IReportListItem> {
    const url = strFormat(API_URL.tracking.asset_retrieve, {id});
    return this.httpClient.get<IReportListItem>(url);
  }

  getCommands(id: number): Observable<any> {
    const url = strFormat(API_URL.references.command.getAssetCommands, {id});
    return this.httpClient.get<any>(url);
  }

  getLocationCommands(id: number): Observable<any[]> {
    const url = strFormat(API_URL.references.command.getAssetLocationCommand, {id});
    return this.httpClient.get<any[]>(url);
  }

  requestLocation(identifier: string, typeDevice: number, params = {}): Observable<any[]> {
    const body = {};
    body[identifier] = typeDevice;
    return this.httpClient.post<any[]>(API_URL1.requestLocation, body, {params})
      .pipe(
        timeout(40000)
      );
  }

  getDetailZone(id: number, params: any = {}): Observable<ControlZoneDetailsModel> {
    const url = strFormat(API_URL.controlZone.details, {id});
    return this.httpClient.get<ControlZoneDetailsModel>(url, {params});
  }

  sendCommand(body, params = {}): Observable<any> {
    return this.httpClient.post<any>( API_URL.auditoria_commands.general, body, {params})
  }

  getLastCommands(body, params = {}): Observable<any> {
    return this.httpClient.post<any>( API_URL.auditoria_commands.general, body, {params})
  }

  getEventsName(params = {}): Observable<IEventsName[]> {
    return this.httpClient.get<IEventsName[]>(API_URL.references.events.select, {params});
  }

  updateStatusCommands(ids: any = {}): Observable<any[]> {
    return this.httpClient.post<any[]>(API_URL.auditoria_commands.get_status, ids
    );
  }



  //control de instalaciones
  retrieveControlInstallations(id: number, params: any = {}): Observable<any> {
    const url = strFormat(API_URL.controlZone.instance, {id});
    return this.httpClient.get<any>(url, {params});
  }

  getInstallationsType(params = {}): Observable<IEventsName[]> {
    return this.httpClient.get<IEventsName[]>(API_URL.references.installation_type.select, {params});
  }

  getSubinstallationsType(params = {}): Observable<IEventsName[]> {
    return this.httpClient.get<IEventsName[]>(API_URL.references.subinstallation_type.select, {params});
  }

  
  getZones(params = {}): Observable<IEventsName[]> {
    return this.httpClient.get<IEventsName[]>(API_URL.references.zone.select, {params});
  }


  getSubzones(params = {}): Observable<IEventsName[]> {
    return this.httpClient.get<IEventsName[]>(API_URL.references.subzone.select, {params});
  }

  getCountry(params = {}): Observable<IName[]> {
    return this.httpClient.get<IName[]>(API_URL.references.country.select, {params});
  }
  getDepartment(params = {}): Observable<IEventsName[]> {
    return this.httpClient.get<IEventsName[]>(API_URL.references.department.select, {params});
  }
  getMunicipality(params = {}): Observable<IEventsName[]> {
    return this.httpClient.get<IEventsName[]>(API_URL.references.municipality.select, {params});
  }
}



@Injectable()
export class ControlZonesWindowsHttpService {

  constructor(private httpClient: HttpClient) {
  }


  retrieve(idZone: number, id: number): Observable<IControlZoneOperatingWindow> {
    const url = strFormat(API_URL.controlZone.operativeWindow.instance, {idZone, id});
    return this.httpClient.get<IControlZoneOperatingWindow>(url);
  }
//IAssetDocument
  list(idZone: number, params: any = {}): Observable<any[]> {
    const url = strFormat(API_URL.controlZone.operativeWindow.general, {idZone});
    return this.httpClient.get<any[]>(url, {params});
  }

  select(idZone: number): Observable<IName[]> {
    const url = strFormat(API_URL.controlZone.operativeWindow.select, {idZone});
    return this.httpClient.get<IName[]>(url);
  }

  delete(idZone: number, id: number): Observable<any> {
    const url = strFormat(API_URL.controlZone.operativeWindow.instance, {idZone, id});
    return this.httpClient.delete<any>(url);
  }

  
  bulk_destroy(
    idZone: number,
    ids: number[],
    names: string[],
    url: string = API_URL.controlZone.operativeWindow.bulk_delete
  ): Observable<any> {
     url = strFormat(url, {idZone});
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }
  

}