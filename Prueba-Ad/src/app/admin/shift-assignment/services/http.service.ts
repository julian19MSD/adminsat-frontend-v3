import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {API_URL} from '@shared/consts/api.consts';
import {IShiftAsingmentChoices, IShiftAsingmentList, IShiftAssignmentAlarms} from '@shared/models/shift-assignment';
import {strFormat} from '@shared/utils/general.utils';
import {IName} from '@shared/models/general.model';

@Injectable()
export class ShiftAssignmentHttpService {

  constructor(private httpClient: HttpClient) {
  }

  create(data, params: any = {}, url: string = API_URL.routes.shiftAssignment.general): Observable<any> {
    return this.httpClient.post<any>(url, data);
  }

  getChoices(params: any = {}, url: string = API_URL.routes.shiftAssignment.choices): Observable<IShiftAsingmentChoices> {
    return this.httpClient.get<IShiftAsingmentChoices>(url, {params});
  }


  finalize(ids: number[], names: string[], url: string = API_URL.routes.shiftAssignment.finish): Observable<any> {
    return this.httpClient.post(url, {ids});
  }

  start(id: number): Observable<any> {
    const url = strFormat(API_URL.routes.shiftAssignment.instance, {id});
    return this.httpClient.patch<any>(url, {});
  }

  pause(id: number): Observable<any> {
    const url = strFormat(API_URL.routes.shiftAssignment.pausar, {id});
    return this.httpClient.patch<any>(url, {});
  }

  reset(id: number): Observable<any> {
    const url = strFormat(API_URL.routes.shiftAssignment.reiniciar, {id});
    return this.httpClient.patch<any>(url, {});
  }

  alarmas(id: number): Observable<IShiftAssignmentAlarms[]> {
    const url = strFormat(API_URL.routes.shiftAssignment.alarms, {id});
    return this.httpClient.get<IShiftAssignmentAlarms[]>(url);
  }

  download(params: any = {}, url: string = API_URL.routes.shiftAssignment.download): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  list(params: any = {}, url: string = API_URL.routes.shiftAssignment.general): Observable<IShiftAsingmentList> {
    return this.httpClient.get<IShiftAsingmentList>(url, {params})
      .pipe(
        map(res => {
          res.results.forEach(item => {
            item.fecha_hora_asignacion_iso = new Date(item.fecha_hora_asignacion_iso);
            if (item.ultimo_reporte && ![undefined, null].includes(item.ultimo_reporte.retraso_minutos)) {
              if (item.ultimo_reporte.retraso_minutos > 120) {
                item.retraso_rango = 121;
              } else if (item.ultimo_reporte.retraso_minutos > 60) {
                item.retraso_rango = 61;
              } else if (item.ultimo_reporte.retraso_minutos > 30) {
                item.retraso_rango = 31;
              } else if (item.ultimo_reporte.retraso_minutos > 0) {
                item.retraso_rango = 1;
              } else if (item.ultimo_reporte.retraso_minutos === 0) {
                item.retraso_rango = 0;
                item.ultimo_reporte.retraso_minutos = 0.1;
              } else {
                item.retraso_rango = 0;
              }
            }
          });
          return res;
        })
      );
  }

  getAssets(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.asset.select, {params});
  }

  getRoutes(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.routes.select, {params});
  }


  getRoadActors(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.road_actor.select, {params});
  }

  getFinalClients(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.routes.clients.select, {params});
  }

  noveltysSelect(params: any = {}, url: string = API_URL.routes.novelty.select): Observable<IName[]> {
    return this.httpClient.get<IName[]>(url, {params});
  }

  controlZonesSelect(id: number, params: any = {}): Observable<any[]> {
    const url = strFormat(API_URL.routes.shiftAssignment.controlZone.select, {id});
    return this.httpClient.get<any[]>(url, {params});
  }

}


