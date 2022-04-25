import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import {ITpmsDetail} from '@shared/models/tpms.model';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { STATIC_URL } from '@shared/consts/api.consts';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { SharedAssetHttpService } from '@admin/shared/assets/services/http.service';
import { SharedTpmsHttpService } from '../services/http.service';

@Component({
  selector: 'adms-tpms-details-dialog',
  templateUrl: './details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TpmsDetailsComponent extends CommonDestroy implements OnInit {

  id: number;
  loading = true;
  instance: ITpmsDetail = {} as ITpmsDetail;
  staticUrl = STATIC_URL;
  permissions = PERMISSIONS;
  selectedIndex = 0;
  noImage = true;

  constructor(
    public dialogRef: MatDialogRef<TpmsDetailsComponent>,
    public permissionsService: PermissionsService,
    private tpmsDeviceHttp: SharedTpmsHttpService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {
    this.tpmsDeviceHttp.details(this.data.id)
    .subscribe(
      res => {
        this.instance = res;
        this.loading = false;
        this.cdRef.detectChanges();
      },
      (err) => this.dialogRef.close({error: err})
    );

  }
}
