import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { IListHeaderState } from '@shared/models/header.model';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { IClientOption } from '@shared/models/client.model';
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
import { InstallationsHttpService } from '@admin/installations/services/http.service';
import { CommonList } from '@shared/commons/list.common';
import { InstallationsSortComponent } from '../sort/sort.component';
import { InstallationsFilterComponent } from '../filter/filter.component';
import { InstallationsCreateComponent } from '@admin/installations/form/form.component';



@Component({
  selector: 'adm.installations-crud',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationsListContainer extends CommonList {

  listHeaderState = {
    title: 'INSTALLATIONS',
    createRoutePath: 'form',
    downloadList: true,
    defaultActionText: 'DELETE',
    defaultActionTooltip: 'DELETE_CRUD_HELP',
    customCreateFormState: true
  } as IListHeaderState;


  actionsPermissions = { 
    default: PERMISSIONS.instalacion.eliminar,
    delete: PERMISSIONS.instalacion.eliminar,
    edit: PERMISSIONS.instalacion.editar,
    create: PERMISSIONS.instalacion.crear,
  };

  formComponent = InstallationsCreateComponent;
  sortComponent = InstallationsSortComponent;
  filterComponent = InstallationsFilterComponent;

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
    private installationsHttp: InstallationsHttpService) {
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
    this.httpListMethod = this.installationsHttp.list;
    this.httpMainActionMethod = this.installationsHttp.bulk_destroy;
    this.httpDownloadMethod = this.installationsHttp.download;
  }

  initialContent(): void {
    super.initialContent();
  }
}
