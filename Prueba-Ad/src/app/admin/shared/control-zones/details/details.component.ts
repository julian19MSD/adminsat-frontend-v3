import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SharedControlZoneDetailsHttpService} from './services/http.service';
import {GoogleMapsService} from './services/google-maps.service';
import {RootAction} from '@store/root.action';
import {Store} from '@ngrx/store';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {ControlZoneDetailsModel} from '@shared/models/control-zones.model';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'adms-control-zone-detail',
  templateUrl: './details.component.html',
  providers: [GoogleMapsService]
})
export class ControlZoneDetailComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: ControlZoneDetailsModel;
  permissions = PERMISSIONS;

  constructor(public dialogRef: MatDialogRef<ControlZoneDetailComponent>,
              public store: Store<RootAction>,
              public permissionsService: PermissionsService,
              private map: GoogleMapsService,
              private controlZoneHttp: SharedControlZoneDetailsHttpService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {
    this.controlZoneHttp.details(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        res => {
          this.instance = res;
          this.loading = false;
        },
        err => this.dialogRef.close({error: err})
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
