import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { MessagingHttpService } from '@admin/messaging/services/http.service';
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
import { IMessagingListItem } from '@shared/models/messaging.model';
import { RootAction } from '@store/root.action';
import { BehaviorSubject } from 'rxjs';
import { MessagingFilterComponent } from '../filter/filter.component';
import { MessagingSortComponent } from '../sort/sort.component';

@Component({
  selector: 'adms-messaging-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss']
})
export class MessagingContainerComponent extends CommonList implements OnInit {

  listHeaderState = {
    title: 'MESSAGING',
    createRoutePath: 'form',
    downloadList: true,
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.mensajeria.crear,
    create: PERMISSIONS.mensajeria.crear
  };

  clients: IClientOption[] = [];

  permissions = PERMISSIONS;


  filterComponent = MessagingFilterComponent;
  sortComponent = MessagingSortComponent

  listItems$: BehaviorSubject<IMessagingListItem[]> = new BehaviorSubject<IMessagingListItem[]>([]);


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
    private messagingHttp: MessagingHttpService,
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

    this.httpListMethod = this.messagingHttp.list;
    this.httpDownloadMethod = this.messagingHttp.download;

  }
  

 
  /**
   * Sincroniza el scroll lateral del virtualscroller con el del header.
   * headerScroll: El elemento del header
   * event: El evento de scroll del virtualscroller.
   */
  updateScroll(headerScroll: HTMLElement, event) {
    headerScroll.scrollLeft = event.target.scrollLeft;
    this.scrollEnd(event);
  }






}
