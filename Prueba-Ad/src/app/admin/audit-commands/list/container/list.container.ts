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

import { CommonList } from '@shared/commons/list.common';
import { CommandsSortComponent } from '../sort/sort.component';
import { CommandsFilterComponent } from '../filter/filter.component';
import { CommandsHttpService } from '@admin/audit-commands/services/http.service';



@Component({
  selector: 'adm-audit-commands-crud',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandsListContainer extends CommonList {

  listHeaderState = {
    title: 'SEND_COMMANDS',
    downloadList: true,

  } as IListHeaderState;



  sortComponent = CommandsSortComponent;
  filterComponent = CommandsFilterComponent;
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
    private commandsHttp: CommandsHttpService) {
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
    this.httpListMethod = this.commandsHttp.list;
    // this.httpMainActionMethod = this.commandsHttp.bulk_destroy;
    this.httpDownloadMethod = this.commandsHttp.download;
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
  

  // initialContent(): void {
  //   this.commandsHttp.getChoices()
  //     .subscribe(
  //       (res) => {
  //         this.choices = res;
  //         super.initialContent();
  //       },
  //       (err) => {
  //         this.fetching = false;
  //         this.notificationService.sendErrorNotification({}, err)
  //       }
  //     );
  // }

}
