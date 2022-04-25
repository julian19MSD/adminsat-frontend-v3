import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnChanges, SimpleChange} from '@angular/core';
import {Router} from '@angular/router';

import {IDashBoardTrackingbicacion, IDashBoardTrackingUbicacionInfo} from '@shared/models/dashboard.model';
import {DashboardTrackingHttpService} from './services/http/http.service';
import {GoogleMapsService} from './services/google-maps/google-maps.service';


@Component({
  selector: 'adms-tracking-dashboard',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardTrackingHttpService, GoogleMapsService]
})
export class DashboardTrackingComponent implements OnChanges {

  @Input() cliente: number;

   points: Array<IDashBoardTrackingbicacion> = [];
   info: IDashBoardTrackingUbicacionInfo = {} as IDashBoardTrackingUbicacionInfo;
   loading = true;

  constructor(public map: GoogleMapsService,
              private cdref: ChangeDetectorRef,
              private trackingHttpService: DashboardTrackingHttpService,
              private router: Router) {
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event): void {
    this.fitBoundsDataLayer();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (const propName in changes) {
      if ('cliente' === propName) {
        if (this.cliente) {
          this.get_data();
        }
      }
    }
  }

  public get_data(): void {
    this.loading = true;
    const params = {cliente: this.cliente};

    this.trackingHttpService.trracking(params)
      .subscribe((result) => {
        this.info = result.ubicacion_info;
        this.points = result.ubicacion;
        this.setData();
        this.loading = false;
        this.cdref.detectChanges();
      }, error => {
        this.loading = false;
        this.cdref.detectChanges();
      });
  }

  fitBoundsDataLayer(): void {
    if (this.map) {
      this.map.mapContainerRezise();
    }
  }

  goToTracking(value, count) {
    if (count > 0) {
      let extra = {};
      const min = new Date();
      const max = new Date();

      switch (value) {
        case 'un_dia':
          max.setHours(max.getHours() - 24);
          extra = {
            queryParams: {
              fecha__lte: new Date(max).toISOString(),
              cliente: this.cliente
            }
          };
          break;
        case 'doce_h':
          min.setHours(min.getHours() - 24);
          max.setHours(max.getHours() - 12);
          extra = {
            queryParams: {
              fecha__gte: new Date(min).toISOString(),
              fecha__lte: new Date(max).toISOString(),
              cliente: this.cliente
            }
          };
          break;
        case 'tres_h':
          min.setHours(min.getHours() - 12);
          max.setHours(max.getHours() - 3);
          extra = {
            queryParams: {
              fecha__gte: new Date(min).toISOString(),
              fecha__lte: new Date(max).toISOString(),
              cliente: this.cliente
            }
          };
          break;
        case 'out_service':
          extra = {queryParams: {fuera_servicio: true, cliente: this.cliente}};
          break;
      }
      this.router.navigate(['/monitoring/tracking'], extra);
    }
  }

  private setData(): void {
    if (this.points.length > 0) {
      setTimeout(() => {
        this.map.initMap();
        this.map.clearMapMarkers();
        this.map.addFeaturesMarkers(this.points);
      }, 500);
    } else if (this.map) {
      this.map.clearMapMarkers();
      this.map.ngOnDestroy();
    }
  }
}
