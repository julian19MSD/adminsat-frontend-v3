import {Component, Input, OnInit} from '@angular/core';
import {SharedHistoricalReportsHttpService} from './services/http.service';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IControlZoneGeo} from '@shared/models/control-zones.model';
import {NotificationService} from '@core/services/notification/notification.service';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'adms-historical-reports',
  templateUrl: './historical-reports.component.html',
})
export class HistoricalReportsComponent extends CommonDestroy implements OnInit {

  @Input() queryParams: any = {};
  @Input() cliente: number;
  @Input() controlZonesUrl: string;

  controlZoneActive: boolean;
  controlZones: IControlZoneGeo;

  polyLineActive = true;
  markersActive = true;

  toggleReports: boolean;

  fetching: boolean;
  listItems: any = [];
  controlsLoader: boolean;

  constructor(
    private historicalHttp: SharedHistoricalReportsHttpService,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit() {
    this.getListData();
  }

  /**
   * Obtiene la lista de eventos historico.
   */
  getListData(): void {
    this.fetching = true;
    this.listItems = [];
    this.historicalHttp.reports(this.queryParams)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(reports => {
          this.listItems = reports;
          this.fetching = false;
        },
        err => {
          this.notificationService.sendErrorNotification({}, err)
          this.fetching = false;
        },
        () => {
          if (this.listItems.length >= 8000) {
            this.notificationService.sendSuccessNotification({contentType: 'warning'}, null, 'TRUNCATED_DATA')
          }
        });
  }


  /**
   * Obitne la lista de zonas de control.
   */
  onControlZoneClick(): void {
    this.controlZoneActive = !this.controlZoneActive;
    if (!this.controlZones) {
      this.controlsLoader = true;
      this.historicalHttp.getControlZones(this.controlZonesUrl, this.cliente)
        .pipe(
          takeUntil(this.ngDestroyed$)
        )
        .subscribe(res => {
          this.controlZones = res;
          this.controlsLoader = false;
        }, (err) => {
          this.controlsLoader = false;
          this.notificationService.sendErrorNotification({}, err);
        });
    }
  }

  /**
   * Muestra u oculta la barra lateral de reportes.
   */
  toogleReportsSideNav() {
    this.toggleReports = true;
    setTimeout(() => this.toggleReports = false, 10);
  }
}
