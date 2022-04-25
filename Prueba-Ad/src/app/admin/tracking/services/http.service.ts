import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getUserNotifications, RootAction} from '@store/root.action';
import {IMarkerItem, IReportList} from '@shared/models/tracking.models';
import {API_URL} from '@shared/consts/api.consts';
import {IPointOfInteresGeo} from '@shared/models/point-of-interest.model';
import {IControlZoneGeo} from '@shared/models/control-zones.model';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable()
export class TrackingHttpService {

  constructor(public httpClient: HttpClient,
              private store: Store<RootAction>) {
  }

  getMarkerts(params: any = {}): Observable<IMarkerItem[]> {
    let notifications;
    return this.store.select(getUserNotifications)
      .pipe(
        take(1),
        switchMap((res) => {
          notifications = res;
          return this.httpClient.get<IMarkerItem[]>(API_URL.tracking.markers, {params})
        }),
        map((result) => {
          const markers = [];
          result.forEach((item) => {
            if (notifications.alarms.includes(item.evento)) {
              item.tipo = 0;
            } else if (notifications.notifications.includes(item.evento)) {
              item.tipo = 1;
            }
            markers[item.activo] = item;
          })
          return markers;
        })
      )
  }

  getReports(params: any = {}, url: string = API_URL.tracking.location): Observable<IReportList> {
    let notifications;
    return this.store.select(getUserNotifications)
      .pipe(
        take(1),
        switchMap((res) => {
          notifications = res;
          return this.httpClient.get<IReportList>(url, {params})
        }),
        map(result => {
            result.results = result.results.map((report) => {
              report.fecha_hora_equipo_iso = new Date(report.fecha_hora_equipo_iso);
              if (notifications.alarms.includes(report.evento)) {
                report.tipo = 0;
              } else if (notifications.notifications.includes(report.evento)) {
                report.tipo = 1;
              }
              return report
            })
            return result;
          }
        )
      )
  }

  getPointOfInterest(params: any = {}): Observable<IPointOfInteresGeo> {
    return this.httpClient.get<IPointOfInteresGeo>(API_URL.pointInterst.features, {params});
  }

  getControlZones(params: any = {}): Observable<IControlZoneGeo> {
    return this.httpClient.get<IControlZoneGeo>(API_URL.controlZone.features, {params});
  }

}
