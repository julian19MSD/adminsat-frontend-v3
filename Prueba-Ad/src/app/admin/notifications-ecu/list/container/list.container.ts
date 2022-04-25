import { ECUNotificationHttpService } from '@admin/notifications-ecu/services/http.service';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CommonList } from '@shared/commons/list.common';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { IClientOption } from '@shared/models/client.model';
import { IListHeaderState } from '@shared/models/header.model';
import { RootAction } from '@store/root.action';
import { ECUNotificationFilterComponent } from '../filter/filter.component';
import { ECUNotificationSortComponent } from '../sort/sort.component';

@Component({
  selector: 'adms-notification-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss']
})
export class ECUNotificationListContainer extends CommonList {
  listHeaderState = {
    title: 'ECU_NOTIFICATIONS',
    createRoutePath: 'form',
    downloadList: false,
    defaultActionText: 'DELETE',
    defaultActionTooltip: 'DELETE_CRUD_HELP',
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.notificaciones.ver,
    delete: PERMISSIONS.notificaciones.eliminar,
    edit: PERMISSIONS.notificaciones.editar,
    create: PERMISSIONS.notificaciones.crear
  };

  sortComponent = ECUNotificationSortComponent;
  filterComponent = ECUNotificationFilterComponent;
  // choices: IAssetChoices;
  clients: IClientOption[] = [];

  constructor(
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public httpClient: HttpClient,
    public translate: TranslateService,
    public bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    public notificationService: NotificationService,
    public headerMessengerService: HeaderMessengerService,
    public permissionsService: PermissionsService,
    private notificationHttp: ECUNotificationHttpService
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
    this.httpListMethod = this.notificationHttp.list;
    this.httpMainActionMethod = this.notificationHttp.bulk_destroy;
  }


}
