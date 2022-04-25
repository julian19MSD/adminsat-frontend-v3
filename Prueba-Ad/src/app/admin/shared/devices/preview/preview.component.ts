import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {CommonDestroy} from '@shared/commons/destroy.common';
import {IDevicePreview} from '@shared/models/devices.model';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {DeviceDetailsComponent} from '@admin/shared/devices/details/details.component';

@Component({
  selector: 'adms-device-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class DevicePreviewComponent extends CommonDestroy {

  @Input() data: IDevicePreview;
  @Output() details: EventEmitter<void> = new EventEmitter();
  permissions = PERMISSIONS;

  constructor(
    private dialog: MatDialog,
    public permissionsService: PermissionsService
  ) {
    super();
  }

  openDetails() {
    this.dialog.open(DeviceDetailsComponent, {data: {id: this.data.id}, panelClass: 'full-screen'});
    this.details.emit();
  }
}
