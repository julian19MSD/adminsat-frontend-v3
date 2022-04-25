import {Component, Inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SharedRouteDetailsHttpService} from './services/http.service';
import {GoogleMapsService} from './services/google-maps.service';
import {IRoutesDetails} from '@shared/models/routes.models';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RootAction} from '@store/root.action';
import {takeUntil} from 'rxjs/operators';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';

@Component({
  selector: 'adms-route-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [GoogleMapsService]
})
export class RouteDetailsComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: IRoutesDetails = {} as IRoutesDetails;
  permissions = PERMISSIONS;
  fullWidth: boolean;

  constructor(
    public permissionsService: PermissionsService,
    public dialogRef: MatDialogRef<RouteDetailsComponent>,
    public  mapService: GoogleMapsService,
    private routesDetailsHttp: SharedRouteDetailsHttpService,
    public store: Store<RootAction>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {
    this.routesDetailsHttp.details(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        res => {
          this.instance = res;
          this.loading = false;
        },
        err => this.dialogRef.close({error: err}),
      );
  }


  /**
   * Detecta si se activo la pestaña de zonas de control y si no se ha inicializado el mapa.
   */
  onTabChange($event: number): void {
    this.fullWidth = ($event === 1);
    if (!this.mapService.map && $event === 1) {
      setTimeout(() => this.mapService.initMap({}, this.instance.zonascontrol, this.instance.poli_linea), 100);
    }
  }


}
