import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';

import {IAlarmListItem} from '@shared/models/alarm.model';
import {CommonListItem} from '@shared/commons/common-list.item';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';

@Component({
  selector: 'adms-alarm-card-item',
  templateUrl: './cardItem.component.html',
  styleUrls: ['./cardItem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmCardItemComponent extends CommonListItem {
  @Input() alarm: IAlarmListItem;
  @Output() retrieve: EventEmitter<{ ids: number[], tab: number }> = new EventEmitter();

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService, cdRef);
  }


  /**
   * Emite un evento cuando hace click en el boton de editar alarma o ver ubicacion del evento.
   * @param id: El id de la alarma.
   * @param tab: La pestaña en la que debe abrir el dialogo de detalle.
   */
  retrieveItem(id: number, tab: number = 0) {
    this.retrieve.emit({ids: [id], tab});
  }
}
