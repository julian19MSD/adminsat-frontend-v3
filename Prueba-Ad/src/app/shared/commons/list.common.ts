import { ChangeDetectorRef, HostListener, OnDestroy, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, switchMap, take, takeUntil } from 'rxjs/operators';

import { PermissionsService } from '@core/services/permissions/permissions.service';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { RootAction } from '@store/root.action';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { ActionConfirmComponent } from '@shared/components/action-confirm/action-confirm.component';
import { hideLoader } from '@shared/utils/general.utils';
import { IListHeaderState, IListPermission } from '@shared/models/header.model';
import { IClientOption } from '@shared/models/client.model';
import { API_URL } from '@shared/consts/api.consts';
import { NotificationService } from '@core/services/notification/notification.service';

export abstract class CommonList extends CommonDestroy implements OnInit, OnDestroy {
  httpListMethod: any;
  httpMainActionMethod: any;
  httpDownloadMethod: any;

  listItems$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  placeholderItems = Array(1).fill({});
  nextPage = null;

  // Componentes a renderizar en dialogos y bootonSheet para filtro, ordenamiento, detalles, crea o editar.
  filterComponent: any;
  sortComponent: any;
  formComponent: any;


  listHeaderState: IListHeaderState = {} as IListHeaderState;
  choices: any = {};
  clients: IClientOption[] = null;

  actionsPermissions: IListPermission = {};

  selectedItems: number[] = [];
  selectedNames: string[] = [];
  itemNameKey = 'nombre';

  fetching = true;
  partialListItemsCounter = 0;
  totalListItemsCounter = 0;



  mainActionVerificationMessage: string;
  mainActionButtonMessage: string;
  mainActionSuccessMessage = 'DELETE_SUCCESSFUL';
  secondActionButtonMessage: string;
  secondActionSuccessMessage: string;

  protected constructor(
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public httpClient: HttpClient,
    public translateService: TranslateService,
    public bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    public notificationService: NotificationService,
    public headerMessengerService: HeaderMessengerService,
    public permissionsService: PermissionsService
  ) {
    super();
  }

  @HostListener('scroll', ['$event'])
  scrollEnd(event: any): void {
    if (event.target.offsetHeight + event.target.scrollTop + 1 >= event.target.scrollHeight) {
      this.fetchMore();
    }
  }

  ngOnInit(): void {
    this.headerMessengerService.clearMessages();

    this.initialContent();

    this.permissionsService
      .getUserPermissions()
      .pipe(
        filter((e) => !!e),
        take(1)
      )
      .subscribe(() => {

        this.listHeaderState.actionsCapabilities = {
          default: this.permissionsService.hasPermission(this.actionsPermissions.default),
          delete: this.permissionsService.hasPermission(this.actionsPermissions.delete),
          edit: this.permissionsService.hasPermission(this.actionsPermissions.edit),
          create: this.permissionsService.hasPermission(this.actionsPermissions.create)
        };

        this.headerMessengerService.sendMessageToHeader({
          key: 'headerData',
          value: this.listHeaderState,
        });
      });

    this.headerMessengerService
      .getMessageFromHeader()
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((action) => {
        switch (action.key) {
          case 'mainAction':
            this.mainAction();
            break;
          case 'allChecked':
            this.onCheckedAll(action.value);
            break;
          case 'refresh':
            this.getListData();
            break;
          case 'filter':
            this.openFilterBottomSheet(action.key);
            break;
          case 'sort':
            this.openFilterBottomSheet(action.key);
            break;
          case 'download':
            this.downloadList();
            break;
          case 'customCreate':

              this.openFormDialog();
            break;

        }
      });
  }




  /**
   * abre modal para llenar forrmulario 
   */
  openFormDialog(panelClass = 'full-screen') {
    this.dialog.open(this.formComponent, { data: { choices: this.choices }, panelClass, })
      .afterClosed()
      .pipe(
        take(1)
      )
      .subscribe((result) => {
        if (true === result) {
          this.notificationService.sendSuccessNotification({}, null, 'CREATED_SUCCESSFUL');
          this.getListData();
        } else if (!!result?.error) {
          this.notificationService.sendErrorNotification({}, result.error);
        }
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
        }
      });
  }

  /**
   * Obtiene la lista con la informacion a mostrar.
   */
  getListData(): void {

    this.fetching = true;
    this.resetInfo();
    this.cdRef.detectChanges();
    this.httpListMethod(this.route.snapshot.queryParams)
      .subscribe(
        (reports) => {
        
          this.fetch(reports);
          this.performGetListData();
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          this.fetching = false;
          this.cdRef.detectChanges();
        }
      );
  }

  /**
   * Esta clase es para ser reescrita en caso de quere hacer algo adicional una vez se obtenga un resultado.
   */
  performGetListData( ) {
  }


  /**
   * Cuando se selecciona el checkBox de un elmento de la lista.
   * @param state: El estado del checkbox
   * @param id: El id del elemento seleccionado.
   * @param name: El nombre del elemento seleccionado.
   */
  onCheckedSingle(state: boolean, id: number, name: string): void {
    if (state) {
      this.selectedItems.push(id);
      this.selectedNames.push(name);
    } else {
      const idIndex = this.selectedItems.indexOf(id);
      const nameIndex = this.selectedNames.indexOf(name);
      if (idIndex > -1) {
        this.selectedItems.splice(idIndex, 1);
      }
      if (nameIndex > -1) {
        this.selectedNames.splice(nameIndex, 1);
      }
    }
    this.sendSelectedState();
  }

  /**
   * Es la accion principal de la lista (Borrar, atender alarmas, finalizar enturnamiento, etc.)
   */
  mainAction() {
    this.dialog
      .open(ActionConfirmComponent, {
        panelClass: 'notification',
        data: {
          actionMessage: this.mainActionVerificationMessage,
          mainButtonMessage: this.mainActionButtonMessage,
          secondButtonMessage: this.secondActionButtonMessage,
          items: this.selectedNames
        },
      })
      .afterClosed()
      .pipe(
        filter((e: any) => !!e),
        take(1),
        switchMap(() => {

          hideLoader(false);

          return this.httpMainActionMethod(this.selectedItems, this.selectedNames)
            .pipe(
              switchMap((msg: any) => {
                this.getListData();
                if (msg?.detalles_json?.task_id) {

                  return this.translateService.get('NEW_TASK')
                    .pipe(
                      switchMap((res) => {
                        return this.notificationService.sendSuccessNotification({ task: true }, [res], '');
                      })
                    );
                }
                return this.notificationService.sendSuccessNotification({}, null, this.mainActionSuccessMessage);
              })
            )
        })
      )
      .subscribe({
        error: (err) => this.notificationService.sendErrorNotification({}, err)
      });
  }

  /**
   * Sobrescribir esta funcion para definir el comportamiento de la carga del componente.
   */
  initialContent(): void {
    if (this.clients !== null) {
      this.getClientOptions();
    } else {
      this.listenQueryParams();
    }
  }

  /**
   * Se suscribe al router para detectar un cabmio en el query param de la url.
   */
  listenQueryParams(): void {
    this.route.queryParams
      .pipe(
        debounceTime(300),
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(() => this.getListData());
  }

  /**
   * Pide la siguiente pagina a la API.
   */
  fetchMore() {
    if (!this.fetching && this.nextPage) {
      this.fetching = true;
      this.cdRef.detectChanges();
      this.httpListMethod({}, this.nextPage)
        .pipe(take(1))
        .subscribe((res) => {
          this.fetch(res);
          if (this.mustNext()) {
            this.fetchMore();
          } else {
            this.performGetListData();
          }
        });
    }
  }

  /**
   * Obtiene la lista de clientes
   */
  getClientOptions(): void {
    this.httpClient.get<IClientOption[]>(API_URL.client.select)
      .subscribe(
        (res) => {
          this.clients = res;
          this.performClientOptions();
          this.listenQueryParams();
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
        }
      );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.headerMessengerService.clearMessages();
  }

  /**
   * Pide mas informacion
   * @param result: El resultado de la consulta
   */
  fetch(result: any): void {
    const listItems = this.listItems$.getValue().concat(result.results);
    this.listItems$.next(listItems);
    this.nextPage = result.next;
    this.partialListItemsCounter = this.listItems$.getValue().length;
    this.totalListItemsCounter = result.count;
    this.listHeaderState = {
      ...this.listHeaderState,
      allChecked: !!(
        this.listItems$.getValue().length > 0 &&
        this.listItems$.getValue().length === this.selectedItems.length
      ),
      selectedItemsCounter: this.selectedItems.length,
      partialListItemsCounter: this.partialListItemsCounter,
      totalListItemsCounter: this.totalListItemsCounter,
    };
    this.headerMessengerService.sendMessageToHeader({
      key: 'headerData',
      value: this.listHeaderState,
    });
    this.fetching = false;
    this.cdRef.detectChanges();
  }

  /**
   * Este metodo permite ejecutar acciones adicionales en el componente que hereda al obtener la lista clientes.
   */
  performClientOptions() {

  }


  private resetInfo() {
    this.listItems$.next([]);
    this.selectedItems = [];
    this.selectedNames = [];
    this.partialListItemsCounter = 0;
    this.totalListItemsCounter = 0;
    this.listHeaderState = {
      ...this.listHeaderState,
      allChecked: false,
      selectedItemsCounter: 0,
      partialListItemsCounter: 0,
      totalListItemsCounter: 0
    };
    this.headerMessengerService.sendMessageToHeader({
      key: 'headerData',
      value: this.listHeaderState,
    });
  }

  /**
   * Abre el bottomsheet de filtros
   * @param type: Si desea abrir los filtros o el ordenamiento
   */
  private openFilterBottomSheet(type: string): void {
    if ('filter' === type) {
      this.bottomSheet.open(this.filterComponent, {
        data: { choices: this.choices, clients: this.clients },
      });
    } else {
      this.bottomSheet.open(this.sortComponent, {
        data: { clients: this.clients },
      });
    }
  }

  /**
   * Pide a la API la lista para descarga.
   */
  private downloadList() {
    hideLoader(false);
    this.httpDownloadMethod(this.route.snapshot.queryParams).subscribe(
      () => {
        this.translateService.get('NEW_TASK').subscribe((res) => {
          this.notificationService.sendSuccessNotification(
            { task: true },
            [res],
            ''
          );
        });
      },
      (err) => this.notificationService.sendErrorNotification({}, err)
    );
  }

  /**
   * Valida si hay mas paginas disponibles para consultar a la API.
   */
  private mustNext(): boolean {
    if (this.nextPage) {
      const current = this.nextPage.split('page=')[1].split('&')[0];
      const pageSize = this.route.snapshot.queryParams.page_size || 100;
      const next = Math.ceil(this.partialListItemsCounter / pageSize);


      return next >= current;
    }
    return false;
  }

  /**
   * Se llama cuando se hace click en la casilla seleccionar todos lo items.
   * @param state: El estado del checkbox
   */
  private onCheckedAll(state: boolean): void {
    this.selectedItems = [];
    this.selectedNames = [];
    this.listItems$.value.forEach((item, index) => {
      item.isSelected = state;
      if (state) {
        this.selectedItems.push(item.id);
        this.selectedNames.push(item[this.itemNameKey]);
      }
    });
    this.sendSelectedState();
    this.cdRef.detectChanges();
  }

  /**
   * Envia el estado de los elementos seleccionados al header.
   */
  private sendSelectedState() {
    this.listHeaderState = {
      ...this.listHeaderState,
      allChecked:
        this.listItems$.value.length > 0 &&
        this.listItems$.value.length === this.selectedItems.length,
      selectedItemsCounter: this.selectedItems.length,
    };
    this.headerMessengerService.sendMessageToHeader({
      key: 'headerData',
      value: this.listHeaderState,
    });
  }
}
