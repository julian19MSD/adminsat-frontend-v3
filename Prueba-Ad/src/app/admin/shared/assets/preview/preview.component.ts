import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AssetDetailsComponent} from '../details/details.component';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IAssetPreview} from '@shared/models/assets.model';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';

@Component({
  selector: 'adms-asset-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetPreviewComponent extends CommonDestroy {

  @Input() data: IAssetPreview;
  @Output() details: EventEmitter<void> = new EventEmitter();
  permissions = PERMISSIONS;

  constructor(
    private dialog: MatDialog,
    public permissionsService: PermissionsService
  ) {
    super();
  }

  openDetails() {
    this.dialog.open(AssetDetailsComponent, {data: {id: this.data.id}, panelClass: 'full-screen'});
    this.details.emit();
  }

}
