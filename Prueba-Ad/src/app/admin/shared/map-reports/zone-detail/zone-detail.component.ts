import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { AssetDetailsComponent } from '@admin/shared/assets/details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { ControlZoneDetailsModel } from '@shared/models/control-zones.model';
import { LOADER_CONTENT } from '@shared/consts/loader';

@Component({
  selector: 'adms-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.scss']
})
export class ZoneDetailComponent {

  @Input() instance: ControlZoneDetailsModel;
  @Input() mode: string;


  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteZone: EventEmitter<any> = new EventEmitter<any>();
  @Output() editableZone: EventEmitter<any> = new EventEmitter<any>();


  permissions = PERMISSIONS;
  loadingImg = true;
  loaderContent = LOADER_CONTENT;
   loader = false;



  constructor(
    public permissionsService: PermissionsService,
    private dialog: MatDialog,
  ) {
  }

  /**
   * Abre el detalle de activo.
   * @param id: El id del activo.
   */
  openAssetDetails(id: number): void {
    this.dialog.open(AssetDetailsComponent, { data: { id }, panelClass: 'full-screen' });
  }

  delete(id: number, nombre:string) {
      this.deleteZone.emit({id, nombre})
  }
  


  
  startEditZone(){
    this.loader = true;
    setTimeout(() =>  this.editableZone.emit(this.instance), 50)
   

  }
  
  closeDetail(fitMap: boolean) {
    this.onClose.emit(fitMap)
  }
  
  
  
  
  
}

