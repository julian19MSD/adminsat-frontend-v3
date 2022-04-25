import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';

import {CommonList} from '@shared/commons/list.common';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {OpenedSessionsHttpService} from '@admin/opened-sessions/services/http.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {hideLoader} from '@shared/utils/general.utils';

@Component({
  selector: 'adms-opened-session',
  templateUrl: './opened-sessions.container.html',
  styleUrls: ['./opened-sessions.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class OpenedSessionsListContainer extends CommonList {

  constructor(public store: Store<RootAction>,
              public route: ActivatedRoute,
              public http: HttpClient,
              public translate: TranslateService,
              public bottomSheet: MatBottomSheet,
              public dialog: MatDialog,
              public cdRef: ChangeDetectorRef,
              public notificationService: NotificationService,
              public permissionsService: PermissionsService,
              public headerMessengerService: HeaderMessengerService,
              private sessionsHttp: OpenedSessionsHttpService) {
    super(store, route, http, translate, bottomSheet, dialog, cdRef, notificationService, headerMessengerService, permissionsService);
    this.httpListMethod = this.sessionsHttp.list;
    this.httpMainActionMethod = this.sessionsHttp.closeAll;
  }


  mainAction() {
    hideLoader(false);
    this.sessionsHttp.closeAll()
      .pipe(take(1))
      .subscribe(() => {
        this.notificationService.sendSuccessNotification({}, null, 'ALL_SESSION_CLOSED');
      }, err => {
        this.notificationService.sendErrorNotification({}, err);
      }, () => {
        this.getListData();
      });
  }


  closeSession(id: number) {
    hideLoader(false);
    this.sessionsHttp.close(id)
      .pipe(take(1))
      .subscribe(() => {
          this.notificationService.sendSuccessNotification({}, null, 'SESSION_CLOSED');
          this.getListData();
        }, err => {
          this.notificationService.sendErrorNotification({}, err);
        }
      );
  }
}
