import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';

import {RootAction} from '@store/root.action';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IRoacActorPreview} from '@shared/models/road-actor.model';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {RoadActorDetailsComponent} from '@admin/shared/road-actor/details/details.component';

@Component({
  selector: 'adms-road-actor-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoadActorPreviewComponent extends CommonDestroy {

  @Input() data: IRoacActorPreview;
  permissions = PERMISSIONS;

  constructor(private dialog: MatDialog,
              public permissionsService: PermissionsService,
              public store: Store<RootAction>) {
    super();
  }

  openDetails() {
    this.dialog.open(RoadActorDetailsComponent, {data: {id: this.data.id}, panelClass: 'full-screen'});
  }
}
