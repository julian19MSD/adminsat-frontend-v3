import { Component,  EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { IName } from '@shared/models/general.model';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { PermissionsService } from '@core/services/permissions/permissions.service';

@Component({
  selector: 'app-simple-preview',
  templateUrl: './simple-preview.component.html',
  styleUrls: ['./simple-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimplePreviewComponent extends CommonDestroy {

  @Input() data: IName;
  @Output() details: EventEmitter<void> = new EventEmitter();
  permissions = PERMISSIONS;

  constructor(
    public permissionsService: PermissionsService
  ) {
    super();
  }
}
