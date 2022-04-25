import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IListHeaderState } from '@shared/models/header.model';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { ActorRoadSortComponent } from '../sort/sort.component';
import { IClientOption } from '@shared/models/client.model';
import { RootAction } from '@store/root.action';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { RoadActorHttpService } from '@admin/actor-road/services/http.service';
import { CommonList } from '@shared/commons/list.common';

import { ActorRoadFilterComponent } from '../filter/filter.component';
import { IRoadActorChoices } from '@shared/models/road-actor.model';

@Component({
  selector: 'adms-actor-road-crud',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorRoadListContainer extends CommonList  {

  listHeaderState = {
    title: 'ROAD_ACTOR',
    createRoutePath: 'form',
    downloadList: true,
    defaultActionText: 'DELETE',
    defaultActionTooltip: 'DELETE_CRUD_HELP',
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.actorVial.ver,
    delete: PERMISSIONS.actorVial.eliminar,
    edit: PERMISSIONS.actorVial.editar,
    create: PERMISSIONS.actorVial.crear,
  };

  sortComponent = ActorRoadSortComponent;
  filterComponent = ActorRoadFilterComponent;
  choices: IRoadActorChoices;
  clients: IClientOption[] = [];

  constructor(public store: Store<RootAction>,
    public route: ActivatedRoute,
    public httpClient: HttpClient,
    public translate: TranslateService,
    public bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    public notificationService: NotificationService,
    public headerMessengerService: HeaderMessengerService,
    public permissionsService: PermissionsService,
    private actorRoadHttp: RoadActorHttpService
    ) {

      super(
        store,
        route,
        httpClient,
        translate,
        bottomSheet,
        dialog,
        cdRef,
        notificationService,
        headerMessengerService,
        permissionsService
      );
     this.httpListMethod = this.actorRoadHttp.list;
     this.httpMainActionMethod = this.actorRoadHttp.bulk_destroy;
     this.httpDownloadMethod = this.actorRoadHttp.download;
    }

    initialContent(): void {
      // this.actorRoadHttp.getChoices()
      //   .subscribe(
      //     (res) => {
      //       this.choices = res;
            super.initialContent();
        //   },
        //   (err) => {
        //     this.fetching = false;
        //     this.notificationService.sendErrorNotification({}, err)
        //   }
        // );
    }

}
