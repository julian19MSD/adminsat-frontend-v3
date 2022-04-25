import {ChangeDetectorRef, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {IListHeaderState} from '@shared/models/header.model';
import {CommonList} from '@shared/commons/list.common';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {NoveltyFilterComponent} from '@admin/novelty/list/filter/filter.component';
import {NoveltySortComponent} from '@admin/novelty/list/sort/sort.component';
import {IClientOption} from '@shared/models/client.model';
import {RootAction} from '@store/root.action';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {NoveltyHttpService} from '@admin/novelty/services/http.service';

@Component({
  selector: 'adms-novelty',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class NoveltyListContainer extends CommonList {

  listHeaderState = {
    title: 'NOVELTYS',
    createRoutePath: 'form',
    defaultActionText: 'DELETE',
    defaultActionTooltip: 'DELETE_CRUD_HELP',
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.rutas.novedades.eliminar,
    delete: PERMISSIONS.rutas.novedades.eliminar,
    edit: PERMISSIONS.rutas.novedades.editar,
    create: PERMISSIONS.rutas.novedades.crear
  };

  clients: IClientOption[] = [];

  filterComponent = NoveltyFilterComponent;
  sortComponent = NoveltySortComponent;

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
    private noveltysHttp: NoveltyHttpService
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
    this.httpListMethod = this.noveltysHttp.list;
    this.httpMainActionMethod = this.noveltysHttp.bulk_destroy;
  }

}
