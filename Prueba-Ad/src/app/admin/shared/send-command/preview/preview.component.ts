import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';

import {RootAction} from '@store/root.action';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {RoadActorDetailsComponent} from '@admin/shared/road-actor/details/details.component';
import { ISendCommandPreview } from '@shared/models/send-command.model';

@Component({
  selector: 'adms-send-command-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendCommandPreviewComponent extends CommonDestroy {

  @Input() data: ISendCommandPreview;
  permissions = PERMISSIONS;

  constructor(private dialog: MatDialog,
              public permissionsService: PermissionsService,
              public store: Store<RootAction>) {
    super();
  }

  openDetails() {
  }
}
