import { AssetDetailsComponent } from '@admin/shared/assets/details/details.component';
import { PermanenceDetailsComponent } from '@admin/shared/permanence/details/details.component';
import { RoadActorDetailsComponent } from '@admin/shared/road-actor/details/details.component';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { Store } from '@ngrx/store';
import { CommonListItem } from '@shared/commons/common-list.item';
import { IPermanenceListItem, IPermanencePermanencesListItem } from '@shared/models/permanence.model';
import { RootAction } from '@store/root.action';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'adms-permanence-item',
  templateUrl: './permanence-item.component.html',
  styleUrls: ['./permanence-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

// PermanenceDetailsComponent
export class PermanenceItemComponent extends CommonListItem{

  @Input() permanence: IPermanenceListItem;
  detailComponent = PermanenceDetailsComponent;


  httpAction: any;

  constructor(
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService, cdRef);
  }

  
  openAssetDetails(id: number): void {
    this.openDetailDialog(id, AssetDetailsComponent)
  }

  
  openRoadActorDetails(id: number) {
    this.openDetailDialog(id, RoadActorDetailsComponent)
  }

  
    /**
   * Abre el dialogo con los detalles del elemento.
   * @param id: El id del elemto
   * @param component: DialogComponent reference
   * @param params: Parametros adicionales
   * @param panelClass: El nombre de la clase que se quiere agragar al dialogo.
   */
     openHistoric(id: number, placa:string, component: any = null, params: any = null, panelClass = 'max-full-screen') {
      const dialogComponent = component ? component : this.detailComponent;
  
      this.dialog.open(dialogComponent, {data: {id, placa, params}, panelClass,})
        .afterClosed()
        .pipe(
          take(1),
          filter((e: any) => e?.error)
        )
        .subscribe((err) => this.notificationService.sendErrorNotification({}, err.error));
    }



}
