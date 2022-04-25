import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as cloneDeep from 'lodash/cloneDeep';
import {getUserNotifications, RootAction} from '@store/root.action';
import {Store} from '@ngrx/store';
import {API_URL} from '@shared/consts/api.consts';
import {IListItems} from '@shared/models/tracking.models';
import {getListItem} from '@admin/shared/map-reports/reports.utils';
import {IControlZoneGeo} from '@shared/models/control-zones.model';

@Injectable()
export class SharedHistoricalReportsHttpService {

  constructor(private httpClient: HttpClient,
              private store: Store<RootAction>) {
  }

  reports(filters = {}, url = API_URL.reports.historical.general): Observable<IListItems[]> {
    return this.httpClient.post<IListItems[]>(url, filters)
      .pipe(
        map((res) => {
          this.store.select(getUserNotifications)
            .subscribe(notifications => {
              res.forEach((item, index) => {
                item.fecha_hora_equipo_iso = new Date(item.fecha_hora_equipo_iso);
                if (notifications.alarms.includes(item.evento)) {
                  item.tipo = 0;
                } else if (notifications.notifications.includes(item.evento)) {
                  item.tipo = 1;
                }
                item.id = index;
                res[index] = getListItem(cloneDeep(item));
              });
            });
          return res;
        })
      );
  }

  getControlZones(url: string, cliente: number): Observable<IControlZoneGeo> {
    let params = {};
    if (!url && cliente) {
      url = API_URL.controlZone.features;
      params = {cliente};
    }
    return this.httpClient.get<IControlZoneGeo>(url, params);
  }

}
