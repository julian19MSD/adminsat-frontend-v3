import { AssetHttpService } from '@admin/assets/services/http.service';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { WorkdayConfigHttpService } from '@admin/workday-config/services/http.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { WorkdayConfigFilterComponent } from '../filter/filter.component';
import { WorkdayConfigSortComponent } from '../sort/sort.component';

@Component({
  selector: 'adms-workday-config-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class WorkdayConfigListContainer extends CommonList {


  listHeaderState = {
    title: 'WORKDAYS_SETTING',
    createRoutePath: 'form',
    downloadList: false,
    defaultActionText: 'DELETE',
    defaultActionTooltip: 'DELETE_CRUD_HELP',
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.rutas.enturnamientos.editar,
    delete: null,
    edit: PERMISSIONS.rutas.enturnamientos.editar,
    create: PERMISSIONS.rutas.enturnamientos.crear
  };

  sortComponent = WorkdayConfigSortComponent;
  filterComponent = WorkdayConfigFilterComponent;
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
    private workHttp: WorkdayConfigHttpService
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
    this.httpListMethod = this.workHttp.list;
    this.httpMainActionMethod = this.workHttp.bulk_destroy;
  }


}
