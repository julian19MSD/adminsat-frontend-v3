import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {CommonDestroy} from '@shared/commons/destroy.common';
import {IDeviceDetails} from '@shared/models/devices.model';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {SharedDeviceHttpService} from '@admin/shared/devices/services/http.service';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'adms-device-detail',
  templateUrl: './details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceDetailsComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: IDeviceDetails;
  displayedColumns = ['INPUT_CODE', 'OUTPUT_CODE', 'TYPE'];

  constructor(public dialogRef: MatDialogRef<DeviceDetailsComponent>,
              public permissionsService: PermissionsService,
              private deviceHttp: SharedDeviceHttpService,
              private cdRef: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {
    this.deviceHttp.details(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(res => {
        this.instance = res;
        this.loading = false;
        this.cdRef.detectChanges();
      }, (err) => {
        this.dialogRef.close({error: err});
      });

  }

}
