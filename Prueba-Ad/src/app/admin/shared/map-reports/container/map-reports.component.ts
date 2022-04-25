import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { RootAction } from '@store/root.action';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as cloneDeep from 'lodash/cloneDeep';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedGoogleMapsService } from '@admin/shared/map-reports/services/google-maps.service';
import { SharedMapReportHttpService } from '@admin/shared/map-reports/services/http.service';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { IListItems, IMarkerItem, IReportListItem, IReportListItemDatosJson, IReportlocations } from '@shared/models/tracking.models';
import { IPointOfInteresGeo } from '@shared/models/point-of-interest.model';
import { MatSidenav } from '@angular/material/sidenav';
import { ControlZoneDetailsModel, IControlZoneGeo } from '@shared/models/control-zones.model';
import { IGettingLocation, IListCommand, ILocationCommandBody, IRequestLocation } from '@shared/models/map-reports.model';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { debounceTime, distinctUntilChanged, filter, map, take, takeUntil } from 'rxjs/operators';
import { getListItem, getMarkerItem, proccesMessage, processResponseGetLocation } from '@admin/shared/map-reports/reports.utils';
import { STATIC_URL } from '@shared/consts/api.consts';
import { SendCommandDialogComponent } from '@admin/shared/map-reports/send-command/send-command.component';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { EVENTS_IDS } from '@shared/consts/general.consts';
import { WebSocketService } from '@admin/shared/services/web-socket.service';
import { checkMatchFilter, setFilterParams, sortList } from '@shared/utils/list.utils';
import { FILTERCONVERSIONKEYS, ORDERINGCONVERSIONKEYS } from '@admin/shared/map-reports/general.const';
import { ThemeState } from '@store/reducers/theme.reducer';
import { NotificationService } from '@core/services/notification/notification.service';
import { SendCommandStatusDialogComponent } from '../send-command-status/send-command-status.component';
import { IListCommands } from '@shared/models/send-command.model';
import { IListItemsZones } from '@shared/models/installations-control.models';


declare var google: any;
let self;

@Component({
  selector: 'adms-map-reports',
  templateUrl: './map-reports.component.html',
  styleUrls: ['./map-reports.component.scss',
    './map-scss/course.component.scss',
    './map-scss/course1.component.scss',
    './map-scss/course2.component.scss',
    './map-scss/course3.component.scss',
    './map-scss/course4.component.scss',
    './map-scss/course5.component.scss',
    './map-scss/course6.component.scss',
    './map-scss/course7.component.scss'
  ],
  providers: [SharedGoogleMapsService]
})
// tslint:disable-next-line:component-class-suffix
export class MapReportsContainer extends CommonDestroy implements OnInit, OnChanges, OnDestroy {

  @Input() mode: 'tracking' | 'historical' | 'listZones' | 'single' = 'tracking';
  @Input() reports: IListItems[];
  @Input() clearDrawZone: boolean;

  @Input() modeDraw: string;
  @Input() zones: IListItemsZones[];
  @Input() instance: any;
  @Input() markers: IMarkerItem[];

  @Input() isFetchingMarkers = true;
  @Input() isFetchingZones = true;

  @Input() isFetchingList = true;
  @Input() toggleReports: boolean;

  @Input() polyLineActive: boolean;
  @Input() markersActive: boolean;


  @Input() controlZoneActive: boolean;
  @Input() controlZones: IControlZoneGeo;

  @Input() interestPointActive: boolean;
  @Input() interestPoints: IPointOfInteresGeo;

  @Output() deleteZoneSelected: EventEmitter<any> = new EventEmitter();
  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();
  @Output() totalItems: EventEmitter<number> = new EventEmitter();
  @Output() shapeCompleted: EventEmitter<boolean> = new EventEmitter();
  @Output() startEditZone: EventEmitter<boolean> = new EventEmitter();
  @Output() updateZones: EventEmitter<boolean> = new EventEmitter();





  requestLocation: IListCommand[] = [];
  waitingCommandResponse: IGettingLocation = {} as IGettingLocation;
  canSendCommands: boolean;
  filteredReports$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  isCreatingControlInstallation = false;
  drawingManager;
  resultWrapper = null;
  dataWrapper = new google.maps.Data();
  idPolygonCurrent: number;
  drawCreated = null;

  message = null;
  lastDetailDisabled: boolean;
  nextDetailDisabled: boolean;
  historicalSearchControl: FormControl = new FormControl();
  aviableCommands: IListCommand[] = [];
  permissions = PERMISSIONS;
  profile: ThemeState;
  loadingInstance: boolean;


  @ViewChild('sideNav', { static: false }) private sideNav: MatSidenav;

  private totalReports: any[] = [];
  private ordering: string[] = [];
  private filterKeys: any = {};
  private markerChanged: boolean;
  private updateInterval: any;
  private informationChanged = false;
  private updatingReport: number;
  private initialReportId: number;
  private initialchargedZones = true;

  constructor(
    public mapService: SharedGoogleMapsService,
    private notificationService: NotificationService,
    private store: Store<RootAction>,
    public permissionsService: PermissionsService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private webSocketService: WebSocketService,
    private mapReportHttp: SharedMapReportHttpService) {
    super();

    self = this;

    this.store.select('theme')
      .pipe(
        filter(e => !!e && !!e.cliente),
        take(1)
      )
      .subscribe(profile => {
        this.profile = profile
      });

  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    if (event.target.offsetHeight + event.target.scrollTop + 1 >= event.target.scrollHeight) {
      this.scrollEnd.emit();
    }
  }

  ngOnInit(): void {
    if ('historical' === this.mode) {
      this.historicalSearchControl.valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(500),
          takeUntil(this.ngDestroyed$))
        .subscribe(value => {
          this.filterOptions(value);
        });
    } else if ('tracking' === this.mode && this.route.snapshot.queryParams.reportId) {
      this.initialReportId = this.route.snapshot.queryParams.reportId;
      this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge', queryParams: { reportId: null } });
    }

    setTimeout(() => {
      this.mapService.initMap({ draggable: false, streetViewControl: false });

      if (this.markerChanged) {
        this.setMarkers();
      }


      if ('tracking' === this.mode) {
        this.initRealTime();
      } else if ('listZones' === this.mode) {
        this.drawingManager = this.mapService.initDrawingMode();
        this.setListenerdrawingManager();
      }
    }, 500);

  }

  /**
   * Se llama cada vez que cambia un Input del componente.
   * @param changes: Los elmentos que cambiaron.
   */
  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      switch (propName) {
        case 'toggleReports':
          if (this.toggleReports) {
            this.sideNav.toggle();
          }
          break;

        case 'clearDrawZone':
          if (this.clearDrawZone)
            this.clearDraw();

          break;

        case 'modeDraw':
          if (this.isCreatingControlInstallation) {
            this.mapService.setDrawingMode(this.modeDraw);

          }

          break;

        case 'zones':
          if ('listZones' === this.mode) {
            if (this.zones.length > 0) {

              // this.setFeaturesInstallationsControl()

              this.filteredReports$.next(this.zones);

              this.totalItems.emit(this.zones.length);


            }
            else {
              this.totalReports = [];
              this.filteredReports$.next([]);
            }
          }



          break;

        case 'reports':
          if (this.reports.length > 0) {
            if ('tracking' === this.mode) {

              this.reports.forEach(item => {
                this.totalReports[item.id] = item;
              });
              this.updateInformation();

            }

            else if ('historical' === this.mode) {

              this.unsetDetail(false);
              this.filteredReports$.next(this.reports.slice());
              this.markers = [];
              this.reports.forEach((item, index, array) => {
                this.markers[item.id] = getMarkerItem(item);
                if (0 === index) {
                  this.markers[item.id].marcador = STATIC_URL + '/images/maps/historical_end.png';
                  this.markers[item.id].unCluster = true;
                } else if (index === (array.length - 1)) {
                  this.markers[item.id].marcador = STATIC_URL + '/images/maps/historical_start.png';
                  this.markers[item.id].unCluster = true;
                }
              });
              this.setMarkers();
            }
          } else {
            this.totalReports = [];
            this.filteredReports$.next([]);
          }
          break;

        case 'markers':
          if (this.mapService) {
            this.mapService.clearMapMarkers();
            if (changes[propName].previousValue && this.mapService.highLightedId in changes[propName].previousValue) {
              changes[propName].previousValue[this.mapService.highLightedId].marker.setMap(null);
              this.mapService.highLightedId = null;
              this.mapService.higLightedPosition = null;
            }
            if (this.mapService.map) {
              this.mapService.map.setOptions({ draggable: false, streetViewControl: true });
            }
          }

          this.setFilterOrderingParams();

          if ('single' !== this.mode) {
            this.unsetDetail(false);
          }

          if (!this.markers) {
            this.markers = [];
          } else if (this.markers.length > 0) {

            this.setMarkers();
            if (this.initialReportId) {
              this.setDetail(this.initialReportId);
              this.initialReportId = null;
            }
          }
          break;

        case 'polyLineActive':
          if ('historical' === this.mode) {
            this.mapService.setFeaturesPolyLine(this.polyLineActive);
          }
          break;

        case 'markersActive':
          if ('historical' === this.mode && this.mapService.map) {
            this.mapService.setFeaturesMarkers(this.markersActive);
          }
          break;

        case 'controlZoneActive':
          if ('listZones' === this.mode && this.controlZoneActive) {
            this.setFeaturesInstallationsControl()
          } else
            this.mapService.setFeaturesControlZones(this.controlZoneActive, this.controlZones);
          break;

        case 'controlZones':

          if ('listZones' === this.mode && this.controlZoneActive) {
            this.setFeaturesInstallationsControl()
          } else
            this.mapService.setFeaturesControlZones(this.controlZoneActive, this.controlZones);
          break;

        case 'interestPointActive':
          this.mapService.setFeaturesPointsOfInterest(this.interestPointActive, this.interestPoints);
          break;

        case 'interestPoints':
          this.mapService.setFeaturesPointsOfInterest(this.interestPointActive, this.interestPoints);
          break;
      }
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    clearInterval(this.updateInterval);
  }

  /**
   * En modo de reconstruccion de accidentes, accede al siguiente reporte.
   */
  netxDetail() {
    if (this.instance.id > 0) {
      this.setDetail(this.instance.id - 1);
    }
    this.setControlsDetailsDisabled();
  }

  /**
   * En modo de reconstruccion de accidentes, accede al anterior reporte.
   */
  lastDetail() {
    if (this.instance.id < (this.reports.length - 1)) {
      this.setDetail(this.instance.id + 1);
    }
    this.setControlsDetailsDisabled();
  }

  setControlsDetailsDisabled() {
    this.lastDetailDisabled = (this.instance.id >= (this.reports.length - 1));
    this.nextDetailDisabled = (this.instance.id <= 0);
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // crud control zones
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getZones(event) {
    this.instance = event;
    // this.isCreatingControlInstallation = false;
    // this.clearDraw();
    // this.drawingManager.setDrawingMode(null);
    this.mapService.setFeaturesControlZones(false, []);
    this.updateZones.emit(true);


  }

  closeFormZone(event) {
    this.instance = null;
    this.isCreatingControlInstallation = false;
    this.startEditZone.emit(false);
    this.drawingManager.setDrawingMode(null);
    this.clearDraw();

  }


  setFeaturesInstallationsControl() {



    if (this.controlZones && Array.isArray(this.controlZones.features) && this.controlZones.features.length > 0) {
      this.mapService.setFeaturesControlZones(this.controlZoneActive, this.controlZones, true);
      this.controlZones.features.forEach(item => {
        if (!this.instance || (this.instance && this.instance.id != item.id)) {
          item.controlzone = this.mapService.addControlZonesCluster(item);
          this.totalReports[item.id] = item;
          this.addControlClickListener(item.controlzone, item.id);
        }
      });

      if (this.mapService.map && this.initialchargedZones) {
        this.initialchargedZones = false;
        this.mapService.map.setOptions({ draggable: true, streetViewControl: true });
        setTimeout(() => {
          this.mapService.map.setZoom(5);
          this.mapService.map.setCenter({ lat: 4.7110, lng: -74.0721 });
        }, 0)
      }
    }
  }

  editCreateZoneCurrent(zone = null) {
    if (this.instance) {
      this.mapService.unhighlightZone(this.totalReports[this.instance.id], true);
    }
    if (zone) {
      this.startEditZone.emit(true);
      this.drawCreated = {
        type: zone.punto ? google.maps.drawing.OverlayType.CIRCLE: google.maps.drawing.OverlayType.POLYGON,
        data:
         { geometry: zone.poligono,
           center: zone.punto,
           radius: zone.radio_punto
        }

      
    }
    this.isCreatingControlInstallation = true;

    if (zone.punto && zone.radio_punto) {
      this.initValueOverlay(google.maps.drawing.OverlayType.CIRCLE, {
        center: zone.punto,
        radius: zone.radio_punto
      });

    } else {
      this.initValueOverlay(google.maps.drawing.OverlayType.POLYGON, zone.poligono);

    }
  }
    else {
  this.instance = null;
  this.startEditZone.emit(true);
  this.isCreatingControlInstallation = true;
}

  }

/**
 * Arregla las cordenadas paa montar la figura editable
 */
getLatLngLiteralArray(array) {
  var latLngArray = [];
  for (var index = 0; index < array.length; index++) {
    latLngArray.push({ lat: array[index][1], lng: array[index][0] });
  }
  return latLngArray;
}



/**
 * inicialiaza zona de control para editar
 */
initValueOverlay(type, overlay) {


  var instanceOverlay = null;

  self.resultWrapper = {
    type: type
  };

  switch (type) {



    case google.maps.drawing.OverlayType.POLYGON:

      instanceOverlay = new google.maps.Polygon({
        map: this.mapService.map,
        paths: this.getLatLngLiteralArray(overlay.coordinates[0]),
        clickable: true,
        editable: true,
        draggable: true,
        fillColor: '#f00000',
        strokeColor: '#f00000'
      });

      this.resultWrapper.overlay = instanceOverlay;

      google.maps.event.addListener(this.resultWrapper.overlay.getPath(), 'set_at', function () {
        self.setValue(google.maps.drawing.OverlayType.POLYGON);
      });

      google.maps.event.addListener(this.resultWrapper.overlay.getPath(), 'insert_at', function () {
        self.setValue(google.maps.drawing.OverlayType.POLYGON);
      });

      google.maps.event.addListener(this.resultWrapper.overlay.getPath(), 'remove_at', function () {
        self.setValue(google.maps.drawing.OverlayType.POLYGON);
      });

      break;

    case google.maps.drawing.OverlayType.CIRCLE:

      instanceOverlay = new google.maps.Circle({
        map: this.mapService.map,
        center: {
          lat: overlay.center.coordinates[1],
          lng: overlay.center.coordinates[0]
        },
        radius: overlay.radius,
        clickable: true,
        editable: true,
        draggable: true,
        fillColor: '#f00000',
        strokeColor: '#f00000'
      });

      self.resultWrapper.overlay = instanceOverlay;

      google.maps.event.addListener(self.resultWrapper.overlay, 'center_changed', function () {
        self.setValue(google.maps.drawing.OverlayType.CIRCLE);
      });

      google.maps.event.addListener(self.resultWrapper.overlay, 'radius_changed', function () {
        self.setValue(google.maps.drawing.OverlayType.CIRCLE);
      });

      break;

  }

};




/**
 * agrega eventos cuando crear zona de control
 */
setListenerdrawingManager() {

  google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
    self.drawingManager.setDrawingMode(null);
    self.shapeCompleted.emit(true);


    self.clearDraw();

    self.resultWrapper = event;

    switch (event.type) {

      case google.maps.drawing.OverlayType.RECTANGLE:

        self.setValue(google.maps.drawing.OverlayType.RECTANGLE);

        google.maps.event.addListener(self.resultWrapper.overlay, 'bounds_changed', function () {
          self.setValue(google.maps.drawing.OverlayType.RECTANGLE);
        });

        break;

      case google.maps.drawing.OverlayType.POLYLINE:

        self.setValue(google.maps.drawing.OverlayType.POLYLINE);

        google.maps.event.addListener(self.resultWrapper.overlay.getPath(), 'set_at', function () {
          self.setValue(google.maps.drawing.OverlayType.POLYLINE);
        });

        google.maps.event.addListener(self.resultWrapper.overlay.getPath(), 'insert_at', function () {
          self.setValue(google.maps.drawing.OverlayType.POLYLINE);
        });

        google.maps.event.addListener(self.resultWrapper.overlay.getPath(), 'remove_at', function () {
          self.setValue(google.maps.drawing.OverlayType.POLYLINE);
        });

        break;

      case google.maps.drawing.OverlayType.POLYGON:

        self.setValue(google.maps.drawing.OverlayType.POLYGON);

        google.maps.event.addListener(self.resultWrapper.overlay.getPath(), 'set_at', function () {
          self.setValue(google.maps.drawing.OverlayType.POLYGON);
        });

        google.maps.event.addListener(self.resultWrapper.overlay.getPath(), 'insert_at', function () {
          self.setValue(google.maps.drawing.OverlayType.POLYGON);
        });

        google.maps.event.addListener(self.resultWrapper.overlay.getPath(), 'remove_at', function () {
          self.setValue(google.maps.drawing.OverlayType.POLYGON);
        });

        break;

      case google.maps.drawing.OverlayType.CIRCLE:

        self.setValue(google.maps.drawing.OverlayType.CIRCLE);

        google.maps.event.addListener(self.resultWrapper.overlay, 'center_changed', function () {
          self.setValue(google.maps.drawing.OverlayType.CIRCLE);
        });

        google.maps.event.addListener(self.resultWrapper.overlay, 'radius_changed', function () {
          self.setValue(google.maps.drawing.OverlayType.CIRCLE);
        });

        break;

    }

  });
}


/**
 * limpia eventos zonas de control previas que no se han guardado
 */
clearDraw() {

  if (this.resultWrapper) {

    switch (this.resultWrapper.type) {

      case google.maps.drawing.OverlayType.RECTANGLE:

        google.maps.event.clearInstanceListeners(this.resultWrapper.overlay);
        break;

      case google.maps.drawing.OverlayType.POLYGON:

        google.maps.event.clearInstanceListeners(this.resultWrapper.overlay.getPath());
        break;

      case google.maps.drawing.OverlayType.POLYLINE:

        google.maps.event.clearInstanceListeners(this.resultWrapper.overlay);
        break;

      case google.maps.drawing.OverlayType.CIRCLE:

        google.maps.event.clearInstanceListeners(this.resultWrapper.overlay);
        break;

    }

    this.resultWrapper.overlay.setMap(null);
    this.resultWrapper = null;
    this.drawCreated = null;


  }
};

/**
 * guarrda los datos de la zona de control para el formulario de control
 */
setValue(type) {

  var geometry = null;

  self.dataWrapper.forEach(function (feature) {
    self.dataWrapper.remove(feature);
  });

  switch (type) {

    case google.maps.drawing.OverlayType.RECTANGLE:

      var b = self.resultWrapper.overlay.getBounds();

      self.dataWrapper.add({
        geometry: new google.maps.Data.Polygon([[b.getSouthWest(), { lat: b.getSouthWest().lat(), lng: b.getNorthEast().lng() }, b.getNorthEast(), { lng: b.getSouthWest().lng(), lat: b.getNorthEast().lat() }]])
      });

      self.dataWrapper.toGeoJson(function (data) {

        self.drawCreated = null;
        self.drawCreated = {
          type: google.maps.drawing.OverlayType.POLYLINE,
          data: {
            geometry: data.features[0].geometry
          }
        }

      });




      break;

    case google.maps.drawing.OverlayType.POLYLINE:

      self.dataWrapper.add({
        geometry: new google.maps.Data.LineString(self.resultWrapper.overlay.getPath().getArray())
      });

      self.dataWrapper.toGeoJson(function (data) {

        self.drawCreated = null;
        self.drawCreated = {
          type: google.maps.drawing.OverlayType.POLYLINE,
          data: {
            geometry: data.features[0].geometry
          }
        }

      });

      break;

    case google.maps.drawing.OverlayType.POLYGON:

      self.dataWrapper.add({
        geometry: new google.maps.Data.Polygon([self.resultWrapper.overlay.getPath().getArray()])
      });

      self.dataWrapper.toGeoJson(function (data) {

        self.drawCreated = null;
        self.drawCreated = {
          type: google.maps.drawing.OverlayType.POLYGON,
          data: {
            geometry: data.features[0].geometry
          }
        }

      });

      break;

    case google.maps.drawing.OverlayType.CIRCLE:

      self.dataWrapper.add({
        geometry: new google.maps.Data.Point(self.resultWrapper.overlay.getCenter())
      });

      self.dataWrapper.toGeoJson(function (data) {

        self.drawCreated = null;

        self.drawCreated = {
          type: google.maps.drawing.OverlayType.CIRCLE,
          data: {
            center: data.features[0].geometry,
            radius: self.resultWrapper.overlay.getRadius(),
            geometry: self.generateGeoJSONCircle(self.resultWrapper.overlay.getCenter(), self.resultWrapper.overlay.getRadius(), 36)
          }
        }
      });

      break;

  }

};


generateGeoJSONCircle(center, radius, numSides) {

  var points = [], degreeStep = 360 / numSides;

  for (var i = 0; i < numSides; i++) {
    var gpos = google.maps.geometry.spherical.computeOffset(center, radius, degreeStep * i);
    points.push([gpos.lng(), gpos.lat()]);
  }

  points.push(points[0]);

  return {
    type: 'Polygon',
    coordinates: [points]
  };

}


deleteZone(event: any) {
  if (this.instance) {
    this.mapService.unhighlightZone(this.totalReports[this.instance.id], true);
    this.instance = null;
  }
  this.deleteZoneSelected.emit(event);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// end crud control zones
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Detail manage                                                                                                                        //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Pone el mapa en modo detalle.
 * @param id: El ID del elemento en la lista
 */
setDetail(id: number): void {
  this.unsetDetail(false);
  this.requestLocation = [];
  this.aviableCommands = [];
  this.canSendCommands = false;

  if('listZones' === this.mode) {

  this.loadingInstance = true;

  this.mapReportHttp.getDetailZone(id).subscribe(
    (res) => {
      this.instance = res;
      this.loadingInstance = false;

    }, () => {
      this.loadingInstance = false;
    }

  )
  //this.setItemZones(this.totalReports[id])
  this.mapService.higLightedZone(this.totalReports[id]);


} else if ('tracking' === this.mode) {
  if (this.totalReports[id]?.report?.zonascontrol?.length === 0) {
    this.setItem(this.totalReports[id]);
    this.getDevicesCommands(id);

  } else {

    this.loadingInstance = true;

    this.mapReportHttp.lastReport(id).subscribe(res => {
      this.totalReports[id] = getListItem(cloneDeep(res));
      this.updateOrCreateMarker(this.totalReports[id]);
      this.setItem(this.totalReports[id]);
      this.getDevicesCommands(id);
      this.loadingInstance = false;
    }, () => {

      this.loadingInstance = false;

    });

  }

} else if ('historical' === this.mode) {

  this.setItem(this.reports[id]);
  this.setControlsDetailsDisabled();

}
  }


/**
 * Quita el modo de detalle
 * @param fitMap: Indica si se debe ajustar el mapa a los marcadores.
 */
unsetDetail(fitMap: boolean): void {
  // this.mapService.unhighlightMarker(this.markers[this.instance.id], fitMap, false);
  if("listZones" === this.mode && this.instance && this.totalReports && this.totalReports[this.instance.id]) {
  this.mapService.unhighlightZone(this.totalReports[this.instance.id]);
} else if ((this.markers && this.instance && this.markers[this.instance.id])) {
  const showMarker = 'historical' === this.mode ? this.markersActive : true;
  this.mapService.unhighlightMarker(this.markers[this.instance.id], fitMap, showMarker);
}
this.instance = null;
this.requestLocation = [];
this.aviableCommands = [];
this.canSendCommands = false;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// End detail manage                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Open dialogs                                                                                                                          //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 *  Abre un dialogo para enviar comandos.
 * @param aviableCommands: La lista de comandos disponibles
 */
openCommand(aviableCommands: IListCommand): void {
  const item = cloneDeep(this.instance);

  this.dialog.open(SendCommandDialogComponent, {
    data: { nombre: item.nombre, activo: item.id, cliente: { id: item.cliente, name: item.cliente_nombre }, commands: cloneDeep(aviableCommands) },
    panelClass: 'full-screen'
  })
    .afterClosed()
    .pipe(
      take(1)
    )
    .subscribe(result => {
      if (result)
        this.mapReportHttp.sendCommand({ commands: result }).subscribe(res => {

          this.dialog.open(SendCommandStatusDialogComponent, {
            data: res,
            panelClass: 'full-screen'
          })

        }, err => {
          this.notificationService.sendErrorNotification({}, err);
        });
    });
}



/**
 * abre una lista con los ultimos comandos enviados
 */
showLastCommands(id: number) {
  this.waitingCommandResponse[this.instance.id] = true;
  this.mapReportHttp.updateStatusCommands({ activo_id: id })
    .subscribe(
      (res) => {
        delete this.waitingCommandResponse[id];
        this.dialog.open(SendCommandStatusDialogComponent, {
          data: res,
          panelClass: 'full-screen'
        })

      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
      })

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// End open dialogs                                                                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Commands                                                                                                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Solicita la ubicacion del activo.
 * @param identifier: El identificador del equipo.
 * @param typeDevice: El tipo de equipo.
 */
getLocation(aviableCommands: IListCommand) {
  const item = cloneDeep(this.instance);
  const commands = cloneDeep(aviableCommands)
  var listcomand: IListCommands[] = [];
  // data: { nombre: item.nombre, activo: item.id, cliente: { id: item.cliente, name: item.cliente_nombre }, commands: cloneDeep(aviableCommands) },

  // this.waitingCommandResponse[this.instance.id] = true;


  var comandLocation = {
    id: null,
    status_nombre: "",
    cliente: item.cliente,
    client_name: item.cliente_nombre,
    device: commands.equipo_id,
    identifier: commands.identificador,
    activo: item.id,
    command_type: commands.comandos[0].comando_equipo_id,
    technical_command: commands.comandos[0].comando,
    command: commands.comandos[0].nombre,
    order: 1,
    technical_response: "",
    response_message: "",

  } as IListCommands;

  listcomand.push(comandLocation);
  this.mapReportHttp.sendCommand({ commands: listcomand }).subscribe(res => {
    delete this.waitingCommandResponse[item.id];

    const result = processResponseGetLocation(res);


    this.translate.get(result.message)
      .pipe(take(1))
      .subscribe(msg => {

        const weft = this.permissionsService.hasPermission(this.permissions.usuarios.verTrama) ? res : null;

        this.notificationService.sendSuccessNotification({
          title: item.nombre,
          content: [msg],
          weft,
          contentTitle: result.identificador,
          result: item.id,
          contentType: result.status,
          customClass: 'command',
          cancelButtonText: 'CLOSE',
          confirmButtonText: 'VIEW_ASSET'
        })
          .pipe(
            take(1),
            filter(e => !!e)
          )
          .subscribe((id) => {
            this.responseViewInstance(id);
          })
      });
  }, err => {
    this.commandError(err, item);
  });


}



/**
 * Abre el detalle de una instancia desde un dialogo de respuesta de comando.
 * @param id: El id del activo.
 */
responseViewInstance(id: number) {
  if (this.totalReports && this.totalReports[id] && this.instance?.id !== id) {
    this.setDetail(id);
  }
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // End commands                                                                                                                          //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Hisotrico                                                                                                                             //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Filtra los eventos segun el campo de busqueda del modo historico.
   * @param value: El valor de campo de busqueda.
   */
  private filterOptions(value: string): void {
  if(!this.reports) {
  return;
}

if (!value) {
  this.filteredReports$.next(this.reports.slice());
  return;
}
value = value.toLowerCase();
this.filteredReports$.next(
  this.reports.filter(item =>
    item.evento_nombre.toLowerCase().indexOf(value) > -1 ||
    (item.report.identificador && item.report.identificador.toLowerCase().indexOf(value) > -1) ||
    (item.direccion && item.direccion.toLowerCase().indexOf(value) > -1) ||
    (item.report.actor_vial_nombre && item.report.actor_vial_nombre.toLowerCase().indexOf(value) > -1)
  )
);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // End hisotrical                                                                                                                        //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Commands                                                                                                                              //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   *  Notifica un error al enviar un comando
   *  err: El contenido del error.
   *  item: El elemento de la lista al que se le presento el error.
   */
  private commandError(err, item: IReportListItem): void {
  delete this.waitingCommandResponse[item.id];
  const subscription = this.notificationService.sendErrorNotification(
    {
      title: item.nombre,
      result: item.id,
      customClass: 'command',
      cancelButtonText: 'CLOSE',
      confirmButtonText: 'VIEW_ASSET'
    }, err)

    if(subscription) {
    subscription
      .pipe(
        take(1),
        filter(e => !!e)
      )
      .subscribe((id) => {
        this.responseViewInstance(id);
      })
  }
}

  /**
   * Actualiza la ubicacion, segun lo recibido en la respuesta de un comando de ubicacion.
   *  id: El ID del activo
   *  data: La informacion de la ubicacion.
   *  identificador: El identificador del equipo.
   */
  private updateLocation(id: number, data: any, identificador: string) {
  if (this.totalReports && this.totalReports[id]) {

    this.totalReports[id] = { ...this.totalReports[id], ...data };

    if (this.totalReports[id].report) {
      if (this.totalReports[id].report.datos_json) {
        this.totalReports[id].report.datos_json.direccion = data.direccion;
      } else {
        this.totalReports[id].report.datos_json = { direccion: data.direccion } as IReportListItemDatosJson;
      }
      this.totalReports[id].report.identificador = identificador;
      this.totalReports[id].report.calidad_gps = data.calidad_gps;
      this.totalReports[id].report.lat = data.lat;
      this.totalReports[id].report.long = data.long;
    }

    if (this.instance?.id === id) {
      this.updateDetailInstance(this.totalReports[id]?.report);
    }
    this.updateOrCreateMarker(this.totalReports[id]);
    this.informationChanged = true;
  }
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // End commands                                                                                                                          //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Detail manage                                                                                                                        //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Resalta el marcador del activo a detallar. Verifica si hay informacion de sensores.
   *  item: El elemento de la lista que se va a detallar.
   */
  private setItem(item: IListItems): void {

  this.instance = cloneDeep(item.report);


  if(this.markers && this.markers[this.instance.id]) {
  this.mapService.highlightMarker(this.markers[this.instance.id], this.instance.zonascontrol);
}

this.instance.hasSensors = false;
if (this.permissionsService.hasPermission(this.permissions.sensores.ver)) {
  Object.keys(item.report.sensores_json).forEach((key, index) => {
    if (Object.keys(item.report.sensores_json[key]).length > 0) {
      this.instance.hasSensors = true;
      return;
    }
  });
}
  }



  /**
   * Obtiene la lista de comando disponible para el activo.
   *  activo: El Id del activo.
   */
  private getDevicesCommands(activo: number): void {
  if(this.permissionsService.hasPermission(this.permissions.referencias.enviarComando)) {
  this.mapReportHttp.getCommands(activo)
    .subscribe(response => {
      response.forEach((command, index) => {
        this.aviableCommands[index] = {
          identificador: command.identificador,
          comandos: [],
          tipo: command.tipo_equipo,
          equipo_id: command.equipo_id,
          nombre: command.tipo_equipo_nombre
        };

        this.requestLocation[index] = {
          identificador: command.identificador,
          comandos: [],
          tipo: command.tipo_equipo,
          equipo_id: command.equipo_id,
          nombre: command.tipo_equipo_nombre
        };


        if (command.comandos && command.comandos.length > 0) {
          this.canSendCommands = true;
          command.comandos.forEach((subitem) => {
            if (subitem.id === EVENTS_IDS.request_location) {

              this.requestLocation[index].comandos.push({ id: subitem.id, comando: subitem.comando, nombre: subitem.nombre, comando_equipo_id: subitem.comando_equipo_id });

            } else {
              this.aviableCommands[index].comandos.push({ id: subitem.id, comando: subitem.comando, nombre: subitem.nombre, comando_equipo_id: subitem.comando_equipo_id });
            }
          });
        }
      });
    });

}

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // End detail manage                                                                                                                     //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Real Time Messages                                                                                                                    //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Inicialiaza la actualizacion en tiempo real
   */
  private initRealTime() {
  this.getRealTimeData();

  this.updateInterval = setInterval(() => {
    if (this.informationChanged) {
      this.updateInformation();
    }
  }, 3000);
}

  /**
   * Obitne los datos que llegan por WebSocket y llama la funcion correspondiente para procesar el mensaje segun el tipo.
   */
  private getRealTimeData(): void {
  this.webSocketService.getMsg('reporteId')
    .pipe(
      filter((e: any) => typeof e === 'number'),
      takeUntil(this.ngDestroyed$),
      map((item) => item.message)
    )
    .subscribe(reportId => {
      this.highLightMessage(reportId);
    });

  this.webSocketService.getMsg('reporte')
    .pipe(
      filter((e: any) => e !== null && !this.isFetchingMarkers && !this.isFetchingList),
      takeUntil(this.ngDestroyed$),
      map((item) => item.message)
    )
    .subscribe(msg => {
      this.updateInformationFromReportMessage(msg);
    });

  this.webSocketService.getMsg('mobileye')
    .pipe(
      filter((e: any) => e !== null),
      takeUntil(this.ngDestroyed$),
      map((item) => item.message)
    )
    .subscribe(mobileye => {
      for (const item of this.totalReports) {
        if ('report' in item && item.report.actor_vial in mobileye) {
          this.totalReports[item.id].report.mobile_eye = {
            count: mobileye[item.report.actor_vial],
            updated: mobileye.updated
          };
          if (this.instance && this.instance.id === item.id) {
            this.instance.mobile_eye = this.totalReports[item.id].report.mobile_eye;
          }
        }
      }
    });
}

  /**
   * Redirecciona la url para inicializar el modulo con el detalle del activo recibido.
   *  reportId: El id del activo
   */
  private highLightMessage(reportId: number): void {
  if(this.router.url !== '/monitoring/tracking') {
  this.initialReportId = reportId;
  this.router.navigate([], { relativeTo: this.route, queryParams: {} });
} else if (this.reports) {
  this.setDetail(reportId);
} else {
  this.initialReportId = reportId;
}
  }

  /**
   * Se llama para marcar que hay cambio en la lista y llamar la actualizacion de lista. Se usa principalmente para actualizacion en tiempo
   * real.
   */
  private updateInformation(): void {
  this.informationChanged = false;
  this.updateReportList();
}

  /**
   * Procesa un reporte que llega.
   *  msg: Un Reporte
   */
  private updateInformationFromReportMessage(msg: any): void {
  if(this.instanceOfLocation(msg)) {
  if (msg.action === 1) {
    this.totalReports[msg.activo].calidad_gps = msg.technical_response.calidad_gps;
    this.totalReports[msg.activo].lat = msg.technical_response.latitud;
    this.totalReports[msg.activo].long = msg.technical_response.longitud;
    this.totalReports[msg.activo].direccion = msg.technical_response.direccion;
    this.updateDetailInstance(this.totalReports[msg.activo]?.report);
    this.updateOrCreateMarker(this.totalReports[msg.activo]);
    this.informationChanged = true;
  }
}
    else {
  const message = proccesMessage(cloneDeep(msg), this.profile);
  if (checkMatchFilter(message.report, this.filterKeys, ['nombre', 'placa', 'identificador', 'evento_nombre', 'cliente_nombre', 'actor_vial_nombre'], this.route.snapshot.queryParams, FILTERCONVERSIONKEYS)) {

    this.totalReports[message.id] = message;
    if (this.instance && this.instance.id === message.id) {
      this.updateDetailInstance(message.report);
    }
    this.updateOrCreateMarker(message);
    this.informationChanged = true;

  } else if (this.totalReports && this.totalReports[message.id]) {

    if (this.instance && this.instance.id === message.id) {
      this.unsetDetail(true);
    }

    if (this.markers && this.markers[message.id]) {
      this.mapService.removeMarker(this.markers[message.id]);
      delete this.markers[message.id];
    }

    delete this.totalReports[message.id];

    this.informationChanged = true;

  }
}
  }

  /**
   * Identifica si el mensaje es la respuesta del comando de obtene localizacion en tiempo real
   *  msg: Un Reporte
   */
  private instanceOfLocation(msg: any): msg is IReportlocations {

  return 'identifier' in msg;
}

  /**
   * Actualiza la informacion de la instancia del reporte.
   *  report: Un reporte.
   */
  private updateDetailInstance(report: IReportListItem): void {
  let mustGetData = false;
  // tslint:disable-next-line:forin
  for(const index in report?.zonascontrol) {
  if (this.instance && Array.isArray(this.instance.zonascontrol)) {
    this.instance.zonascontrol.forEach((reporteZona) => {
      if (report.zonascontrol[index].id.toString() === reporteZona.id.toString()) {
        report.zonascontrol[index] = cloneDeep(reporteZona);
      }
    });
  }

  if (!report.zonascontrol[index].poligono) {
    mustGetData = true;
    break;
  }
}

if (mustGetData) {
  // TODO Enviar los poligonos desde el nuevo receptor para evitar esto.

  if (this.updatingReport !== report.id) {
    this.updatingReport = report.id;
    this.mapReportHttp.lastReport(report.id)
      .pipe(take(1))
      .subscribe(res => {
        this.updatingReport = null;
        this.instance = res;
        this.mapService.clearDetailsMap();
        this.mapService.setDetailsControlZones(this.instance.zonascontrol);
      }, err => {
        this.updatingReport = null;
        this.instance = cloneDeep(report);
        this.mapService.clearDetailsMap();

      });
  }
} else {
  this.instance = { ...this.instance, ...report };
  this.mapService.clearDetailsMap();
  this.mapService.setDetailsControlZones(this.instance.zonascontrol);
}

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // End real Time Messages                                                                                                                //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Manage report container                                                                                                                  //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Actualiza la lista de reportes
   */
  private updateReportList(): void {
  const temp = [];
  this.totalReports.forEach(item => temp.push(item));
  this.filteredReports$.next(sortList(temp, 'fecha_hora_equipo_iso', this.ordering, ORDERINGCONVERSIONKEYS));
  this.totalItems.emit(temp.length);
}

  /**
   * Ajusta los parametros de ordenamiento.
   */
  private setFilterOrderingParams(): void {
  this.ordering = this.route.snapshot.queryParams.ordering ? this.route.snapshot.queryParams.ordering.split(',') : [];
  this.filterKeys = setFilterParams(this.route.snapshot.queryParams, FILTERCONVERSIONKEYS);
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // End manage report container                                                                                                              //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Manage markers                                                                                                                        //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Establece los marcadores en el mapa.
   */
  private setMarkers(): void {

  if(this.mapService.map) {
  this.mapService.clearMapMarkers();
  this.markerChanged = false;
  this.markers.forEach((item, index, array) => {
    SharedGoogleMapsService.checkPosition(item);
    {
      item.marker = this.mapService.addMarkerToCluster(item, item.id, 'icon_marker', this.mode);
      this.addMarkerClickListener(item.marker, item.id);
    }
  });

  if ('historical' === this.mode) {
    this.mapService.setFeaturesPolyLinePath();
    this.mapService.setFeaturesPolyLine(this.polyLineActive);
  }

  if (this.instance) {
    this.mapService.highlightMarker(this.markers[this.instance.id], this.instance.zonascontrol);
  } else {
    this.mapService.fitMarkerBounds();
  }
  setTimeout(() => {
    this.mapService.map.setOptions({ draggable: true, streetViewControl: true });
  }, 500)
} else {
  this.markerChanged = true;
}
  }

  /**
   * Actualiza o crea el marcador del nuevo reporte que llega por el WebSocket
   * @param msg: El reporte.
   */
  private updateOrCreateMarker(msg: IListItems): void {
  if(SharedGoogleMapsService.checkPosition(msg)) {
  if (this.markers && this.markers[msg.id]) {
    this.markers[msg.id] = { ...this.markers[msg.id], ...getMarkerItem(msg) };
    this.mapService.updateMarker(this.markers[msg.id]);
  } else {
    this.markers[msg.id] = getMarkerItem(msg);
    this.markers[msg.id].marker = this.mapService.addMarkerToCluster(this.markers[msg.id], msg.id, 'icon_marker', this.mode);
    if (!this.mapService.highLightedId && this.instance && this.instance.id === msg.id) {
      this.mapService.highlightMarker(this.markers[msg.id], this.instance.zonascontrol);
    }
  }

  if (this.instance && this.instance.id === msg.id) {
    this.mapService.higLightedPosition = this.markers[msg.id].marker.getPosition();
    this.mapService.around.setCenter(this.mapService.higLightedPosition);
    this.mapService.fitMarkerBounds();
  }

  this.addMarkerClickListener(this.markers[msg.id].marker, msg.id);
}
  }

  /**
   * Agrega un listener al marcador para ejecutar una accion al hacer clic sobre el.
   * @param marker: El marcador.
   * @param id: El id del activo.
   */
  private addMarkerClickListener(marker, id: number): void {
  google.maps.event.addListener(marker, 'click', () => {
    if (!this.instance || (this.instance && this.instance.id !== id)) {
      this.setDetail(id);
    }
  });
}


  /**
  * Agrega un listener al marcador para ejecutar una accion al hacer clic sobre el.
  * @param marker: El marcador.
  * @param id: El id del activo.
  */
  private addControlClickListener(zone, id: number): void {
  google.maps.event.addListener(zone, 'click', () => {
    if (!this.instance || (this.instance && this.instance.id !== id)) {
      this.setDetail(id);
    }
  });
}


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // End manage markers                                                                                                                    //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
