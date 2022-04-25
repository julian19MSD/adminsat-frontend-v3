import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { RootAction } from '@store/root.action';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { CommonList } from '@shared/commons/list.common';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { IClientOption } from '@shared/models/client.model';
import { IAssetChoices } from '@shared/models/assets.model';
import { AssetHttpService } from '@admin/assets/services/http.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { IListHeaderState } from '@shared/models/header.model';
import { AssetFilterComponent } from '@admin/assets/list/filter/filter.component';
import { AssetSortComponent } from '@admin/assets/list/sort/sort.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'adms-assets-crud',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// tslint:disable-next-line:component-class-suffix
export class AssetsListContainer extends CommonList {
  listHeaderState = {
    title: 'ASSETS',
    createRoutePath: 'form',
    downloadList: true,
    defaultActionText: 'DELETE',
    defaultActionTooltip: 'DELETE_CRUD_HELP',
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.activos.eliminar,
    delete: PERMISSIONS.activos.eliminar,
    edit: PERMISSIONS.activos.editar,
    create: PERMISSIONS.activos.crear,
  };


  sortComponent = AssetSortComponent;
  filterComponent = AssetFilterComponent;
  choices: IAssetChoices;
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
    private assetsHttp: AssetHttpService
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
    this.httpListMethod = this.assetsHttp.list;
    this.httpMainActionMethod = this.assetsHttp.bulk_destroy;
    this.httpDownloadMethod = this.assetsHttp.download;
  }

  initialContent(): void {
    this.assetsHttp.getChoices()
      .subscribe(
        (res) => {
          this.choices = res;
          super.initialContent();
        },
        (err) => {
          this.fetching = false;
          this.notificationService.sendErrorNotification({}, err)
        }
      );
  }
}
