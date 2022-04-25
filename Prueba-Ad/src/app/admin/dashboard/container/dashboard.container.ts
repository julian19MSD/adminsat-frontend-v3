import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import {filter, map, take, takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {NotificationService} from '@core/services/notification/notification.service';
import {FormArray, FormGroup} from '@angular/forms';
import {formFields, itemsFormFields} from '@admin/dashboard/container/dashboard.const';
import * as cloneDeep from 'lodash/cloneDeep';
import {IHttpParameters} from '@shared/models/form.model';
import {API_URL} from '@shared/consts/api.consts';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {IDashBoardGridItem} from '@shared/models/dashboard.model';

@Component({
  selector: 'adms-dashboard',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class DashboardContainer extends CommonDestroy {
  formGroup: FormGroup;
  dashboard: GridsterItem[] = [];
  client: number;
  showGrid = true;
  fetching = true;
  editing = false;
  gridOptions: GridsterConfig = {
    gridType: GridType.Fit,
    compactType: CompactType.CompactLeftAndUp,
    margin: 10,
    pushItems: true,
    scrollToNewItems: true,
    disableScrollHorizontal: true,
    itemChangeCallback: this.gridItemResizeChange,
    itemResizeCallback: this.gridItemResizeChange,
  };
  gridItems: IDashBoardGridItem = {
    location: {
      permission: this.permissionsService.PERMISSIONS.usuarios.dashboard.verUbicacion,
      available: true
    }
  };
  phItems = [1, 2, 3, 4];
  private httpParams: IHttpParameters = {
    url: API_URL.dashboard.update,
    method: 'patch'
  };

  constructor(private store: Store<RootAction>,
              private cdRef: ChangeDetectorRef,
              private notificationService: NotificationService,
              private permissionsService: PermissionsService,
              private formManageService: FormManageService,
              private headerMessengerService: HeaderMessengerService) {
    super();
    this.listenHeaderClick();
  }

  /**
   * Elimina el elmento de la grilla
   * @param item: El cardItem de la grilla a eliminar.
   */
  gridRemoveItem(item: GridsterItem): void {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
    this.gridOptions.gridType = this.dashboard.length > 2 ? GridType.ScrollVertical : GridType.Fit;
    this.gridItems[item.type].available = true;
    this.availableGridItems();
  }

  /**
   * Escuche un evento de click que venga desde el header.
   */
  private listenHeaderClick(): void {
    this.headerMessengerService.getMessageFromHeader()
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        (action) => {
          switch (action.key) {
            case 'ready':
              if (0 === this.dashboard.length) {
                this.getDashboardConfiguration();
              }
              break;
            case 'client':
              if (this.client !== action.value) {
                this.client = action.value;
                this.refreshGrid();
              }
              break;
            case 'save':
              this.gridSave();
              break;
            case 'edit':
              this.editing = action.value;
              this.gridOptions.displayGrid = this.editing ? DisplayGrid.Always : DisplayGrid.None;
              this.gridEdit();
              break;
            case 'addItem':
              this.gridAddItem({
                x: 0,
                y: 0,
                cols: 1,
                rows: 1,
                type: action.value,
                dragEnabled: this.editing,
                resizeEnabled: this.editing
              });
              break;
            case 'refresh':
              this.refreshGrid();
          }
        }
      );
  }

  /**
   * Obtiene la configuracion del dashboard)
   */
  private getDashboardConfiguration(): void {
    this.store.select('theme', 'dashboard')
      .pipe(
        filter((e) => undefined !== e),
        take(1),
        map((dashboard) => cloneDeep(dashboard))
      )
      .subscribe((dashboard) => {
        this.fetching = false;
        if (Array.isArray(dashboard) && dashboard.length > 0) {
          dashboard.forEach((ditem) => this.gridAddItem(ditem));
        } else {
          this.availableGridItems();
        }
      });
  }

  /**
   * Agrega elementos a la grilla.
   * @param item: El elemento a agregar.
   */
  private gridAddItem(item: GridsterItem): void {
    if (this.gridItems && this.gridItems[item.type] && this.permissionsService.hasPermission(this.gridItems[item.type].permission)) {
      this.dashboard.push(item);
      this.gridItems[item.type].available = false;
    }
    this.gridOptions.gridType = this.dashboard.length > 2 ? GridType.ScrollVertical : GridType.Fit;
    this.availableGridItems();
  }

  /**
   * Refresca la grilla.
   */
  private refreshGrid() {
    this.showGrid = false;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.showGrid = true;
      this.cdRef.detectChanges();
    }, 0);
  }

  /**
   * Activa el modo de edicion en la grilla.
   */
  private gridEdit(): void {
    this.dashboard.forEach((item) => {
      item.dragEnabled = this.editing;
      item.resizeEnabled = this.editing;
    });
    this.updateGridOptions();
  }

  /**
   * Actualiza las opciones de la grilla.
   */
  private updateGridOptions() {
    if (this.gridOptions.api) {
      this.gridOptions.api.optionsChanged();
    }
    this.cdRef.detectChanges();
  }

  /**
   * Salva la informacion de la grilla.
   */
  private gridSave(): void {
    this.gridEdit();
    this.formGroup = new FormGroup(cloneDeep(formFields));
    this.dashboard.forEach(item => {
      const formValue = new FormGroup(cloneDeep(itemsFormFields));
      formValue.patchValue(item);
      (this.formGroup.get('items') as FormArray).push(formValue);
    });

    this.formManageService.submitForm(this.formGroup, this.httpParams)
      .subscribe(
        () => this.notificationService.sendSuccessNotification({}),
        (err) => this.notificationService.sendErrorNotification({}, err)
      );
  }

  /**
   * Obtiene la informacion al cardItem al ser redimensionado.
   * @param item: El cardItem modificado.
   * @param args: Otros argumento que envia la libreria.
   */
  private gridItemResizeChange(item: GridsterItem, ...args: any[]): void {
    if (this.dashboard) {
      const index = this.dashboard.findIndex(x => x.type === item.type);
      if (index > -1) {
        this.dashboard[index] = item;
      }
    }
  }

  /**
   * Actualiza y notifica al header la lista de elmentos disponibles para agregar a la grilla.
   */
  private availableGridItems(): void {
    const gridItemsKeys = [];
    Object.keys(this.gridItems).forEach((key) => {
      if (this.gridItems[key].available && this.permissionsService.hasPermission(this.gridItems[key].permission)) {
        gridItemsKeys.push(key);
      }
    });
    this.headerMessengerService.sendMessageToHeader({value: {gridItems: gridItemsKeys}});
    this.updateGridOptions();
  }
}
