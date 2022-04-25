import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonList} from '@shared/commons/list.common';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {ShiftAssignmentHttpService} from '@admin/shift-assignment/services/http.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {IListHeaderState} from '@shared/models/header.model';
import {IClientOption} from '@shared/models/client.model';
import {RestoreSinevaCollapseState, SetSinevaCollapseState} from '@store/actions/theme.action';
import {WebSocketService} from '@admin/shared/services/web-socket.service';
import {filter, map, take, takeUntil} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {IShiftAsingmentListItem} from '@shared/models/shift-assignment';
import {checkMatchFilter, setFilterParams, sortList} from '@shared/utils/list.utils';
import {FILTERCONVERSIONKEYS, ORDERINGCONVERSIONKEYS, SEARCH_ITEMS} from '@admin/shift-assignment/list/general.consts';
import {proccesMessage} from '@admin/shift-assignment/list/shift.utils';
import {ThemeState} from '@store/reducers/theme.reducer';
import {ShiftAssignmentFilterComponent} from '@admin/shift-assignment/list/filter/filter.component';
import {ShiftAssignmentSortComponent} from '@admin/shift-assignment/list/sort/sort.component';

@Component({
  selector: 'adms-shift-assignment-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ShiftAssignmentListContainer extends CommonList implements OnInit, OnDestroy {
  listHeaderState = {
    title: 'SHIFT_ASSIGNMENTS',
    defaultActionText: 'FINISH_SHIFT_ASSIGNMENTS',
    createRoutePath: 'form',
    downloadList: true
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.rutas.enturnamientos.editar,
    delete: null,
    edit: PERMISSIONS.rutas.enturnamientos.editar,
    create: PERMISSIONS.rutas.enturnamientos.crear
  };

  clients: IClientOption[] = [];

  mainActionVerificationMessage = 'FINISH_SHIFT_ASSIGNMENT_CONFIRM';
  mainActionButtonMessage = 'FINALIZE';
  mainActionSuccessMessage = 'FINISH_SHIFT_ASSIGNMENT_SUCCESS';

  permissions = PERMISSIONS;
  profile: ThemeState;

  filterComponent = ShiftAssignmentFilterComponent;
  sortComponent = ShiftAssignmentSortComponent

  listItems$: BehaviorSubject<IShiftAsingmentListItem[]> = new BehaviorSubject<IShiftAsingmentListItem[]>([]);
  filteredItems$: BehaviorSubject<IShiftAsingmentListItem[]> = new BehaviorSubject<IShiftAsingmentListItem[]>([]);

  private ordering: string[] = [];
  private filterKeys: any = {};
  private totalItemsData: IShiftAsingmentListItem[] = [];
  private informationChanged = false;
  private updateInterval: any;

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
    private shitfHttp: ShiftAssignmentHttpService,
    private webSocketService: WebSocketService,
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
    this.httpListMethod = this.shitfHttp.list;
    this.httpMainActionMethod = this.shitfHttp.finalize;
    this.httpDownloadMethod = this.shitfHttp.download;

    this.store.select('theme')
      .pipe(
        filter(e => !!e && !!e.cliente),
        take(1)
      )
      .subscribe(profile => this.profile = profile);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Espera hasta que se haya cargado el tema para esconder luego el sidenav.
    this.store.select('theme', 'cliente')
      .pipe(
        filter(e => !!e),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => this.store.dispatch(new SetSinevaCollapseState(true)), 0)
      })

    this.webSocketService.getMsg('reporte')
      .pipe(
        filter((e: any) => !this.fetching && !!e?.message?.rutas),
        takeUntil(this.ngDestroyed$),
        map((item) => item.message)
      )
      .subscribe((msg) => {
        this.updateInformationFromReportMessage(msg);
      });

    this.updateInterval = setInterval(() => {
      if (this.informationChanged) {
        this.updateInformation();
      }
    }, 3000);
  }

  /**
   * Obtiene la lista de la API
   */
  getListData(): void {
    this.totalItemsData = [];
    this.filteredItems$.next([]);
    super.getListData();
  }


  /**
   * Obtiene los choices del modulo
   */
  initialContent(): void {
    this.shitfHttp.getChoices()
      .subscribe((res) => {
          this.choices = res;
          super.initialContent();
        }, (err) => {
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
   * Ajusta la informacion para el ordenamiento en timepo real.
   */
  performGetListData() {
    this.listItems$.getValue().forEach((item) => this.totalItemsData[item.id] = item);
    this.ordering = this.route.snapshot.queryParams.ordering ? this.route.snapshot.queryParams.ordering.split(',') : [];
    this.filterKeys = setFilterParams(this.route.snapshot.queryParams, FILTERCONVERSIONKEYS);
    this.updateInformation();
    super.performGetListData();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    clearInterval(this.updateInterval);
    this.store.dispatch(new RestoreSinevaCollapseState());
  }

  /**
   * Establece el total de elementos que se tienen en la lista actualmente.
   * Esto es importante porque al llegar en tiempo real nuevos elementos, el total de items mostrados cambiara dinamicamente.
   * Tambien en alguna ocasion puede superar al contador total inicial (totalListItemsCounter).
   */
  setTotalItems($event: number) {
    this.partialListItemsCounter = $event;
    setTimeout(() => {
      this.listHeaderState = {
        ...this.listHeaderState,
        partialListItemsCounter: this.partialListItemsCounter
      }
      if ($event > this.totalListItemsCounter) {
        this.totalListItemsCounter = $event;
        this.listHeaderState.totalListItemsCounter = this.totalListItemsCounter
      }
      this.headerMessengerService.sendMessageToHeader({key: 'headerData', value: this.listHeaderState});
    }, 0);
  }

  /**
   * Se llama para marcar que hay cambio en la informacion lista y llamar la actualizacion de lista. Se usa principalmente para
   * actualizacion en tiempo real.
   */
  private updateInformation(): void {
    this.informationChanged = false;
    const temp = [];
    this.totalItemsData.forEach(item => temp.push(item));
    this.filteredItems$.next(sortList(temp, 'ultimo_reporte.retraso_minutos', this.ordering, ORDERINGCONVERSIONKEYS));

    if (this.partialListItemsCounter !== temp.length) {
      this.setTotalItems(temp.length)
    }
  }

  /**
   * Procesa un reporte que llega por websocket.
   *  msg: Un Reporte
   */
  private updateInformationFromReportMessage(msg: any): void {
    msg.rutas.forEach((ruta) => {
      if (ruta.estado > 1) {
        delete this.totalItemsData[ruta.id];
        this.informationChanged = true;
      } else {
        const message = proccesMessage(msg, ruta, this.profile);
        if (checkMatchFilter(message, this.filterKeys, SEARCH_ITEMS, this.route.snapshot.queryParams, FILTERCONVERSIONKEYS)) {
          this.totalItemsData[message.id] = message;
          this.informationChanged = true;
        }
      }
    });
  }

}

