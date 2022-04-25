import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { IListItemsZones } from '@shared/models/installations-control.models';

@Component({
  selector: 'adms-zone-item',
  templateUrl: './zone-item.component.html',
  styleUrls: ['./zone-item.component.scss']
})
export class ZoneItemComponent {

  @Input('mode') mode: string;
  @Input() zone: IListItemsZones;
  @Input() metricsAlias: any;
  @Input() disabled: boolean;

  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteZone: EventEmitter<any> = new EventEmitter<any>();

  permissions = PERMISSIONS;

  constructor(
    public permissionsService: PermissionsService,

  ) {
  }

  setDetail(id: number) {
    if (!this.disabled) {
      this.onClick.emit(id)
    }
  }
  delete(id: number, nombre:string) {
    if (!this.disabled) {
      this.deleteZone.emit({id, nombre})
    }
  }
}
