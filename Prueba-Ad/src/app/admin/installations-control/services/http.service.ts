import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getUserNotifications, RootAction} from '@store/root.action';
import {IMarkerItem, IReportList} from '@shared/models/installations-control.models';
import {API_URL} from '@shared/consts/api.consts';
import {IPointOfInteresGeo} from '@shared/models/point-of-interest.model';
import {IControlZoneGeo} from '@shared/models/control-zones.model';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable()
export class InstallationsControlHttpService {

  constructor(public httpClient: HttpClient,
             ) {
  }


    bulk_destroy(
      ids: number[],
      names: string[],
      url: string = API_URL.controlZone.bulk_delete
    ): Observable<any> {
      return this.httpClient.request('delete', url, {body: {ids, names}});
    }

    getControlZones(params: any = {}): Observable<IControlZoneGeo> {
      return this.httpClient.get<IControlZoneGeo>(API_URL.controlZone.features, {params});
    }
    
    getListZones(params: any = {}, url= API_URL.controlZone.general):Observable<any>{
      return this.httpClient.get<any>(url, {params})
    }
  }
  