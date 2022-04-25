import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { IListHeaderState } from '@shared/models/header.model';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { IClientOption } from '@shared/models/client.model';
import { ITpmsChoices } from '@shared/models/tpms.model';
import { RootAction } from '@store/root.action';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { TpmsHttpService } from '@admin/tpms/services/http.service';
import { CommonList } from '@shared/commons/list.common';
import { TpmsSortComponent } from '../sort/sort.component';
import { TpmsFilterComponent } from '../filter/filter.component';



@Component({
  selector: 'adm.tpms-crud',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpmsListContainer extends CommonList {

  listHeaderState = {
    title: 'TPMS',
    createRoutePath: 'form',
    downloadList: true,
    defaultActionText: 'DELETE',
    defaultActionTooltip: 'DELETE_CRUD_HELP',
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.tpms.eliminar,
    delete: PERMISSIONS.tpms.eliminar,
    edit: PERMISSIONS.tpms.editar,
    create: PERMISSIONS.tpms.crear,
  };

  sortComponent = TpmsSortComponent;
  filterComponent = TpmsFilterComponent;
  choices: ITpmsChoices;
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
    private tpmsHttp: TpmsHttpService) {
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
    this.httpListMethod = this.tpmsHttp.list;
    this.httpMainActionMethod = this.tpmsHttp.bulk_destroy;
    this.httpDownloadMethod = this.tpmsHttp.download;
  }

  initialContent(): void {
    this.tpmsHttp.getChoices()
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
