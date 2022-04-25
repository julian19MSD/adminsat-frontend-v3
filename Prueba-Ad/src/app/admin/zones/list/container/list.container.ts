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
import { ZonesHttpService } from '@admin/zones/services/http.service';
import { CommonList } from '@shared/commons/list.common';
import { ZonesSortComponent } from '../sort/sort.component';
import { ZonesFilterComponent } from '../filter/filter.component';
import { ZonesCreateComponent } from '@admin/zones/form/form.component';



@Component({
  selector: 'adm.zones-crud',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZonesListContainer extends CommonList {

  listHeaderState = {
    title: 'ZONES',
    createRoutePath: 'form',
    downloadList: true,
    defaultActionText: 'DELETE',
    defaultActionTooltip: 'DELETE_CRUD_HELP',
    customCreateFormState: true
  } as IListHeaderState;


  actionsPermissions = { 
    default: PERMISSIONS.zones.eliminar,
    delete: PERMISSIONS.zones.eliminar,
    edit: PERMISSIONS.zones.editar,
    create: PERMISSIONS.zones.crear,
  };

  formComponent = ZonesCreateComponent;
  sortComponent = ZonesSortComponent;
  filterComponent = ZonesFilterComponent;

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
    private zonesHttp: ZonesHttpService) {
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
    this.httpListMethod = this.zonesHttp.list;
    this.httpMainActionMethod = this.zonesHttp.bulk_destroy;
    this.httpDownloadMethod = this.zonesHttp.download;
  }

  initialContent(): void {
    super.initialContent();
  }
}
