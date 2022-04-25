import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IReportListItem } from '@shared/models/tracking.models';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { AssetDetailsComponent } from '@admin/shared/assets/details/details.component';
import { RoadActorDetailsComponent } from '@admin/shared/road-actor/details/details.component';
import { MobileyeDialogComponent } from '@admin/shared/map-reports/mobile-eye/mobile-eye.component';
import { SensorsDialogComponent } from '@admin/shared/map-reports/sensors/sensors.component';
import { MatDialog } from '@angular/material/dialog';
import { IListCommand, ILocationCommandBody } from '@shared/models/map-reports.model';
import { STATIC_URL } from '@shared/consts/api.consts';
import { ControlZoneDetailComponent } from '@admin/shared/control-zones/details/details.component';
import LatLngLiteral = google.maps.LatLngLiteral;

@Component({
  selector: 'adms-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent {

  @Input() instance: IReportListItem;
  @Input() mode: string;
  @Input() metricsAlias: any;
  @Input() waitingCommandResponse: any;
  @Input() requestLocation: any;

  @Input() canSendCommands: any;
  @Input() aviableCommands: any;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendCommandClick: EventEmitter<IListCommand> = new EventEmitter<IListCommand>();
  @Output() showLastCommands: EventEmitter<number> = new EventEmitter<number>();
  @Output() getLocationClick: EventEmitter<IListCommand> = new EventEmitter<IListCommand>();
  @Output() showAroundClick: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();
  permissions = PERMISSIONS;
  loadingImg = true;


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

  //
  /**
   * Abre el detalle de actor vial.
   * @param id: El id del actor vial.
   */
  openRoadActorDetails(id: number): void {
    this.dialog.open(RoadActorDetailsComponent, { data: { id }, panelClass: 'full-screen' });
  }

  /**
   * Abre el detalle de zonas de control/
   * @param id: El Id de la zona de control.
   */
  openControlZoneDetails(id: number): void {
    this.dialog.open(ControlZoneDetailComponent, { data: { id }, panelClass: 'full-screen' });
  }

  /**
   * Abre el detalle de MobileEye
   */
  openMobileyeDetails(): void {
    this.dialog.open(MobileyeDialogComponent, {
      panelClass: ['mw-600', 'full-height'],
      data: this.instance.mobile_eye,
    });
  }

  /**
   * Abre el detalle de sensores.
   */
  openSensorDetails(): void {
    this.dialog.open(SensorsDialogComponent, { data: this.instance.sensores_json, panelClass: 'full-screen' });
  }

  imageLoadError() {
    this.loadingImg = false;
    this.instance.datos_json.foto = STATIC_URL + '/images/noimage.jpg'
  }

  getLocation(aviableCommand: IListCommand) {
    this.getLocationClick.emit(aviableCommand)
  }

  /**
 * Abre los comandos enviados del altivo de las ultimas 24 horas
 *   * @param id: El id del activo.
 */
  getLastCommands(id: number) {
     this.showLastCommands.emit(id)

  }

  closeDetail(fitMap: boolean) {
    this.onClose.emit(fitMap)
  }

  openCommand(aviableCommand: IListCommand) {
    this.sendCommandClick.emit(aviableCommand);
  }

  showAround(lat: number, lng: number) {
    this.showAroundClick.emit({ lat, lng })
  }


}
