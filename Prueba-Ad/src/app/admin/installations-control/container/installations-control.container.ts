import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonList } from '@shared/commons/list.common';

import { RestoreSinevaCollapseState, SetSinevaCollapseState } from '@store/actions/theme.action';
import { IListHeaderState } from '@shared/models/header.model';
import { IClientOption } from '@shared/models/client.model';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, filter, map, take, takeUntil } from 'rxjs/operators';
import { IMarkerItem } from '@shared/models/installations-control.models';
import { IControlZoneGeo } from '@shared/models/control-zones.model';
import { IPointOfInteresGeo } from '@shared/models/point-of-interest.model';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { InstallationsControlHttpService } from '@admin/installations-control/services/http.service';
import { InstallationsControlFilterComponent } from '@admin/installations-control/filter/filter.component';
import { InstallationsControlSortComponent } from '@admin/installations-control/sort/sort.component';
import { PERMISSIONS } from '@shared/consts/permissions.consts';

@Component({
  selector: 'adms-container',
  templateUrl: './installations-control.container.html',
  styleUrls: ['./installations-control.container.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class InstallationsControlContainer extends CommonList implements OnInit, OnDestroy {
  listHeaderState = {
    title: 'CONTROL_ZONES',
  } as IListHeaderState;

  markers: IMarkerItem[];

  isControlInstallation = true;
  isCreatingControlInstallation = false;
  modeDraw: string = null;

  // actionsPermissions = {
  //   delete: PERMISSIONS.activos.eliminar,
  //   edit: PERMISSIONS.activos.editar,
  //   create: PERMISSIONS.activos.crear,
  // };


  filterComponent = InstallationsControlFilterComponent;
  sortComponent = InstallationsControlSortComponent;

  controlZones: IControlZoneGeo;
  interesPoints: IPointOfInteresGeo;
  controlZoneActive: boolean = true;
  interestPointActive: boolean;


  fetchingZones = true;


  clients: IClientOption[] = [];
  clientFilterCtrl: FormControl = new FormControl();
  clientFilteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  toggleReports: boolean;

  @ViewChild('clientSelector') clientSelect: MatSelect;

  selectedClient: number;
  controlsLoader = true;
  clearDrawZone = false;

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
    private installationsControlHttp: InstallationsControlHttpService,
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
    this.httpMainActionMethod = this.installationsControlHttp.bulk_destroy;
    this.httpListMethod = this.installationsControlHttp.getListZones;
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

  initCreationControlinstallations(event:boolean) {
    this.controlZoneActive = !event;
    this.isCreatingControlInstallation = event;

  }



  clearDrawZoneSelected(){
    this.clearDrawZone = true;
    setTimeout(() => this.clearDrawZone = false, 10);

  }

  openConfirmDialogDeleteZone(event){
    this.selectedItems= [];
    this.selectedNames= [];
    this.selectedItems.push(event.id);
    this.selectedNames.push(event.nombre);
    this.mainAction();

    
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
      this.headerMessengerService.sendMessageToHeader({ key: 'headerData', value: this.listHeaderState });
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
      queryParams: { cliente: this.selectedClient }
    });

    this.controlZoneActive = true;
  }

  /**
   * Muestra u oculta la barra lateral de reportes.
   */
  toogleReportsSideNav() {
    this.toggleReports = true;
    setTimeout(() => this.toggleReports = false, 10);
  }

  rechargeUpdateData() {
    this.isCreatingControlInstallation = true;
    this.getListData();
  }
  getListData(): void {
    this.controlZoneActive = false;
    this.fetching = true;
    this.controlsLoader = true;
    this.installationsControlHttp.getControlZones(this.route.snapshot.queryParams).subscribe(res => {

      this.controlZones = res;
      this.controlsLoader = false;
      this.fetchingZones = false;
      super.getListData();

    }, () => {
      this.fetchingZones = false;
      this.controlsLoader = false;
    });

  }


  performGetListData() {
    this.controlZoneActive = true;
  }

  setModeDraw(mode): void {

    if (mode === true)
      this.modeDraw = null;
    else
      this.modeDraw = mode;
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
