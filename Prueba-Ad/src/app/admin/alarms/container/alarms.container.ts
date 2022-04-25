import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';

import {AlarmsHttpService} from '@admin/alarms/services/http.service';
import {RootAction} from '@store/root.action';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {ChangeAlarmsComponent} from '@admin/alarms/change/change.component';
import {filter} from 'rxjs/operators';
import {CommonList} from '@shared/commons/list.common';
import {IListHeaderState, IListPermission} from '@shared/models/header.model';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {IClientOption} from '@shared/models/client.model';
import {AlarmFilterComponent} from '@admin/alarms/filter/filter.component';
import {AlarmSortComponent} from '@admin/alarms/sort/sort.component';
import {NotificationService} from '@core/services/notification/notification.service';

@Component({
  selector: 'adms-alarms',
  templateUrl: './alarms.container.html',
  styleUrls: ['./alarms.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class AlarmsContainer extends CommonList {

  placeholderItems = Array(2).fill({});
  listHeaderState = {
    title: 'ALARMS',
    defaultActionText: 'ATTEND',
    defaultActionTooltip: 'ATTEND_CRUD_HELP',
    actionsCapabilities: {default: undefined}
  } as IListHeaderState;

  actionsPermissions: IListPermission = {
    default: PERMISSIONS.alarmas.atender
  };

  clients: IClientOption[] = [];

  sortComponent = AlarmSortComponent;
  filterComponent = AlarmFilterComponent;

  constructor(
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public httpClient: HttpClient,
    public translateService: TranslateService,
    public bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    public notificationService: NotificationService,
    public headerMessengerService: HeaderMessengerService,
    public permissionsService: PermissionsService,
    private alarmsHttp: AlarmsHttpService
  ) {
    super(store, route, httpClient, translateService, bottomSheet, dialog, cdRef, notificationService, headerMessengerService, permissionsService);
    this.httpListMethod = this.alarmsHttp.list;
  }

  mainAction() {
    this.alarmRetrieve({ids: this.selectedItems, tab: 0});
  }

  alarmRetrieve(event: { ids: number[], tab: number }): void {
    this.dialog.open(ChangeAlarmsComponent, {
      disableClose: true,
      data: {tab: event.tab, ids: event.ids, canAttend: this.listHeaderState.actionsCapabilities.default},
      panelClass: 'full-screen'
    }).afterClosed()
      .pipe(
        filter((e: any) => true === e),
      )
      .subscribe(() => {
        this.totalListItemsCounter = 0;
        this.listItems$.next([]);
        this.getListData();
      });
  }
}
