import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedDepartureMapsHttpService } from './services/http.service';
import { GoogleMapsService } from './services/google-maps.service';
import { RootAction } from '@store/root.action';
import { Store } from '@ngrx/store';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { PermissionsService } from '@core/services/permissions/permissions.service';
// import {DepartureMapsModel} from '@shared/models/control-zones.model';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'adms-departure-map-detail',
  templateUrl: './departures-map.component.html',
  providers: [GoogleMapsService]
})
export class DepartureMapComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: any;
  // DepartureMapsModel;
  permissions = PERMISSIONS;

  constructor(public dialogRef: MatDialogRef<DepartureMapComponent>,
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    private map: GoogleMapsService,
    private departureMapHttp: SharedDepartureMapsHttpService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {

    this.departureMapHttp.details(this.data.id, this.data.idDeparture)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        res => {
          this.instance = res;
          console.log("this.instance", this.instance);
          setTimeout(() => this.map.initMap({}, this.instance), 100);
          this.loading = false;
        },
        err => this.dialogRef.close({ error: err })
      );
  }


  /**
   * Se llama cada vez que se cambia la pesataña activa.
   * @param $event: El indice de la pestaña.
   */
  onTabChange($event: number) {
    if (!this.map.map && $event === 1) {
      setTimeout(() => this.map.initMap({}, this.instance), 100);
    }
  }
}
