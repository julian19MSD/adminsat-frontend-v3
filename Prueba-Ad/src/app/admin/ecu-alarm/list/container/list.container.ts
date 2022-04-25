import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { EcuAlarmHttpService } from '@admin/ecu-alarm/services/http.service';
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
import { IEcuAlarmListItem } from '@shared/models/ecu-alarm.model';
import { RootAction } from '@store/root.action';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { EcuAlarmFilterComponent } from '../filter/filter.component';
import { EcuAlarmSortComponent } from '../sort/sort.component';

@Component({
  selector: 'adms-ecu-alarm-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss']
})
export class EcuAlarmContainerComponent extends CommonList implements OnInit {

  listHeaderState = {
    title: 'ECU_ALARMS',
    downloadList: true
  } as IListHeaderState;


  clients: IClientOption[] = [];
  permissions = PERMISSIONS;


  filterComponent = EcuAlarmFilterComponent;
  sortComponent = EcuAlarmSortComponent

  listItems$: BehaviorSubject<IEcuAlarmListItem[]> = new BehaviorSubject<IEcuAlarmListItem[]>([]);


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
    private ecuHttp: EcuAlarmHttpService,
    // private webSocketService: WebSocketService,
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

    this.httpListMethod = this.ecuHttp.list;
    // this.httpMainActionMethod = this.ecuHttp.finalize;
    this.httpDownloadMethod = this.ecuHttp.download;

  }
  

  initialContent(): void {
    this.ecuHttp.getChoices()    
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

  /**
   * Sincroniza el scroll lateral del virtualscroller con el del header.
   * headerScroll: El elemento del header
   * event: El evento de scroll del virtualscroller.
   */
  updateScroll(headerScroll: HTMLElement, event) {
    headerScroll.scrollLeft = event.target.scrollLeft;
    this.scrollEnd(event);
  }





  /**
 *
 * @param hora es el numero que se le agrega el formato
 */
  parseDate(hora: string) {

    var diffTime = moment().diff(hora);
    var duration = moment.duration(diffTime);
    var years = duration.years(),
      days = duration.days(),
      hrs = duration.hours(),
      mins = duration.minutes().toString().length === 1 ? ("0" + duration.minutes().toString()) : duration.minutes(),
      secs = duration.seconds().toString().length === 1 ? ("0" + duration.seconds().toString()) : duration.seconds();
    return (days * 24) + hrs + ":" + mins + ":" + secs;

  }

  toHHMMSS (sec){
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours:any   =  Math.floor(sec_num / 3600);
    var minutes:any = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds:any = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }


}
