import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {CommonDestroy} from '@shared/commons/destroy.common';
import {IRoadActorDetail} from '@shared/models/road-actor.model';
import {STATIC_URL} from '@shared/consts/api.consts';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {SharedRoadActorHttpService} from '@admin/shared/road-actor/services/http.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'adms-actor-road-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoadActorDetailsComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: IRoadActorDetail;
  staticUrl = STATIC_URL;
  permissions = PERMISSIONS;
  noImage = true;

  constructor(
    public permissionsService: PermissionsService,
    public dialogRef: MatDialogRef<RoadActorDetailsComponent>,
    private actorHttp: SharedRoadActorHttpService,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {
    this.actorHttp.details(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
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
