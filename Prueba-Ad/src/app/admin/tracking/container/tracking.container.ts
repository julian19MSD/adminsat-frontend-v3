import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonList} from '@shared/commons/list.common';

import {RestoreSinevaCollapseState, SetSinevaCollapseState} from '@store/actions/theme.action';
import {IListHeaderState} from '@shared/models/header.model';
import {IClientOption} from '@shared/models/client.model';
import {FormControl} from '@angular/forms';
import {ReplaySubject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {debounceTime, distinctUntilChanged, filter, map, take, takeUntil} from 'rxjs/operators';
import {IMarkerItem} from '@shared/models/tracking.models';
import {IControlZoneGeo} from '@shared/models/control-zones.model';
import {IPointOfInteresGeo} from '@shared/models/point-of-interest.model';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {TrackingHttpService} from '@admin/tracking/services/http.service';
import {TrackingFilterComponent} from '@admin/tracking/filter/filter.component';
import {TrackingSortComponent} from '@admin/tracking/sort/sort.component';

@Component({
  selector: 'adms-container',
  templateUrl: './tracking.container.html',
  styleUrls: ['./tracking.container.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class TrackingContainer extends CommonList implements OnInit, OnDestroy {
  listHeaderState = {
    title: 'TRACKING'
  } as IListHeaderState;

  markers: IMarkerItem[];
  fetchingMarkers = true;

  filterComponent = TrackingFilterComponent;
  sortComponent = TrackingSortComponent;

  controlZones: IControlZoneGeo;
  interesPoints: IPointOfInteresGeo;
  controlZoneActive: boolean;
  interestPointActive: boolean;

  clients: IClientOption[] = [];
  clientFilterCtrl: FormControl = new FormControl();
  clientFilteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  toggleReports: boolean;

  @ViewChild('clientSelector') clientSelect: MatSelect;

  selectedClient: number;
  controlsLoader = true;


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
    private trackingHttp: TrackingHttpService,
    private router: Router
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
    this.httpListMethod = this.trackingHttp.getReports;
  }

  ngOnInit() {
    super.ngOnInit();

    this.clientFilterCtrl.valueChanges.pipe(
      takeUntil(this.ngDestroyed$),
      distinctUntilChanged()
    ).subscribe(() => {
      this.clientFilterOptions();
    });

    // Espera hasta que se haya cargado el tema para esconder luego el sidenav.
    this.store.select('theme', 'cliente')
      .pipe(
        filter(e => !!e),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => this.store.dispatch(new SetSinevaCollapseState(true)), 0)
      })
  }

  /**
   * Es llamado cuando se hace click en el boton de zonas de control y puntos de interes.
   */
  onControlZoneInteresPointClick(event: string): void {
    if (this.clients.length > 1 && !this.selectedClient) {
      this.clientSelect.open();
    } else {
      if (event === 'interestPoint') {
        this.interestPointActive = !this.interestPointActive;
      } else {
        this.controlZoneActive = !this.controlZoneActive;
      }
      this.getControlZoneInteresPoint(false);
    }
  }

  /**
   * Hace una peticion a la API para obtener las zonas de control y puntos de interes del cliente seleccionado.
   */
  getControlZoneInteresPoint(changed: boolean): void {
    var cliente = this.selectedClient;

    if (this.interestPointActive && (changed || !this.interesPoints)) {
      this.controlsLoader = true;
      this.trackingHttp.getPointOfInterest( cliente ?{cliente}:null).subscribe(res => {
        this.interesPoints = res;
        this.controlsLoader = false;
      }, () => {
        this.controlsLoader = false;
      });
    }

    if (this.controlZoneActive && (changed || !this.controlZones)) {
      this.controlsLoader = true;
      this.trackingHttp.getControlZones(cliente ?{cliente}:null).subscribe(res => {
        this.controlZones = res;
        this.controlsLoader = false;
      }, () => {
        this.controlsLoader = false;
      });
    }
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
   * Reinicia los valores cuando cambia el cliente y actualizar el queryparam en la URL.
   */
  changeClient(id: number) {
    this.selectedClient = id;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {cliente: this.selectedClient}
    });
    this.interesPoints = null;
    this.interestPointActive = false;
    this.controlZones = null;
    this.controlZoneActive = false;
  }

  /**
   * Muestra u oculta la barra lateral de reportes.
   */
  toogleReportsSideNav() {
    this.toggleReports = true;
    setTimeout(() => this.toggleReports = false, 10);
  }

  getListData(): void {
    this.markers = null;
    this.fetchingMarkers = true;
    this.trackingHttp.getMarkerts(this.route.snapshot.queryParams)
      .subscribe(
        (markers) => {
          this.markers = markers;
          this.fetchingMarkers = false;
        }, () => {
          this.fetchingMarkers = false;
        }
      )
    super.getListData();
  }


  performClientOptions() {
    this.clientFilterOptions();
    this.controlsLoader = false;
  }


  /**
   * Se suscribe al router para detectar un cabmio en el query param de la url.
   */
  listenQueryParams() {
    this.route.queryParams.pipe(
      takeUntil(this.ngDestroyed$),
      debounceTime(300),
      map((res) => {
        this.selectedClient = parseInt(res.cliente, 10) || null;
        return res;
      }),
      filter(res => !res.reportId)
    ).subscribe(() => {
      this.getListData();
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.store.dispatch(new RestoreSinevaCollapseState());
  }


  /**
   * Filtra la lista del selector del cliente, dejando solo los elementos que coinciden con el texto ingresado en el campo de busqueda.
   */
  private clientFilterOptions(): void {
    let search = this.clientFilterCtrl.value;
    if (!this.clients) {
      this.clientFilteredOptions.next([])
    } else if (search) {
      search = search.toLowerCase();
      this.clientFilteredOptions.next(this.clients.filter(item => item.nombre.toLowerCase().includes(search)));
    } else {
      this.clientFilteredOptions.next(this.clients.slice());
    }
  }

}
