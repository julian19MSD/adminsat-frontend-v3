import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {filter, map, takeUntil} from 'rxjs/operators';

import * as cloneDeep from 'lodash/cloneDeep';
import {NotificationService} from '@core/services/notification/notification.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {TasksHttpService} from '@admin/tasks/services/http.service';
import {WebSocketService} from '@admin/shared/services/web-socket.service';
import {CommonList} from '@shared/commons/list.common';
import {TaskDetailsComponent} from '@admin/tasks/details/details.component';

@Component({
  selector: 'adms-task',
  templateUrl: './tasks.container.html',
  styleUrls: ['./tasks.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class TasksContainer extends CommonList implements OnInit {


  constructor(public store: Store<RootAction>,
              public route: ActivatedRoute,
              public httpClient: HttpClient,
              public translateService: TranslateService,
              public bottomSheet: MatBottomSheet,
              public dialog: MatDialog,
              public cdRef: ChangeDetectorRef,
              public notificationService: NotificationService,
              public headerMessengerService: HeaderMessengerService,
              public permissionsService: PermissionsService,
              private webSocketService: WebSocketService,
              private tasksHttp: TasksHttpService) {
    super(store, route, httpClient, translateService, bottomSheet, dialog, cdRef, notificationService, headerMessengerService, permissionsService);
    this.httpListMethod = this.tasksHttp.list;
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.webSocketService.getMsg('tarea')
      .pipe(
        filter((e: any) => !!e),
        takeUntil(this.ngDestroyed$),
        map((item) => item.message)
      )
      .subscribe(
        (task) => {
          const temp = this.listItems$.getValue().slice();
          const index = temp.findIndex(item => item.id === task.id);
          if (index > -1) {
            temp[index] = cloneDeep(task);
          } else {
            temp.unshift(task);
          }
          this.listItems$.next(temp);
          this.cdRef.detectChanges();
        });
  }

}
