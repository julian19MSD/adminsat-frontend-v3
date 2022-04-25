import {ChangeDetectorRef, DoCheck, EventEmitter, Injectable, Input, Output} from '@angular/core';

import {CommonDestroy} from '@shared/commons/destroy.common';
import {IActionsCapabilitesState} from '@shared/models/header.model';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {filter, take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';

export abstract class CommonListItem extends CommonDestroy implements DoCheck {
  @Input() viewClienInfo: boolean;
  @Input() actionsCapabilities: IActionsCapabilitesState;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() detailsClick: EventEmitter<any> = new EventEmitter();
  @Output() refrehsList: EventEmitter<any> = new EventEmitter<any>()

  permissions = PERMISSIONS;
  detailComponent: any;

  protected constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngDoCheck() {
    this.cdRef.detectChanges();
  }

  /**
   * Emite un evento cuando hace click en la casilla de seleccion de elemento.
   * @param state: El estado del check-box
   */
  checkedItem(state: boolean): void {
    this.checkedChange.emit(state);
  }

  /**
   * Emite un evento cuando hace click en el boton de detalles.
   */
  onDetailsClick(id: number = null): void {
    this.detailsClick.emit(id);
  }

  /**
   * Abre el dialogo con los detalles del elemento.
   * @param id: El id del elemto
   * @param component: DialogComponent reference
   * @param params: Parametros adicionales
   * @param panelClass: El nombre de la clase que se quiere agragar al dialogo.
   */
  openDetailDialog(id: number, component: any = null, params: any = null, panelClass = 'full-screen') {
    const dialogComponent = component ? component : this.detailComponent;

    this.dialog.open(dialogComponent, {data: {id, params}, panelClass,})
      .afterClosed()
      .pipe(
        take(1),
        filter((e: any) => e?.error)
      )
      .subscribe((err) => this.notificationService.sendErrorNotification({}, err.error));
  }
}
