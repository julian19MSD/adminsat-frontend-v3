import {ElementRef, Inject, Injectable, OnDestroy, Renderer2, RendererFactory2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {take, takeUntil} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {RichMarker} from 'js-rich-marker/lib/richmarker.js';
import MeasureTool from 'measuretool-googlemaps-v3/dist/gmaps-measuretool.esm';
import {RootAction} from '@store/root.action';
import {Store} from '@ngrx/store';
import {ThemeState} from '@store/reducers/theme.reducer';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {DEFAULT_MAP_OPTIONS, MARKER_CLUSTER_STYLE, NIGHT_STYLE} from '@shared/consts/google';
import {IMarkerItem, IReportListItemZonaControl} from '@shared/models/tracking.models';
import {STATIC_URL} from '@shared/consts/api.consts';
import LatLngLiteral = google.maps.LatLngLiteral;
import LatLng = google.maps.LatLng;
import { IListItemsZones } from '@shared/models/installations-control.models';
import { IControlZoneFeature } from '@shared/models/control-zones.model';


let self;
declare var MarkerClusterer: any;

const defaultPanoramaOptions = {
  linksControl: true,
  visible: false,
  panControl: true,
  enableCloseButton: true,
  fullscreenControl: false
};


@Injectable()
export class SharedGoogleMapsService extends CommonDestroy implements OnDestroy {

  map;
  illegalMiningLayer;
  illegalMiningVisible: boolean;
  showCurrentPosition: boolean;
  panoramaShowed: boolean;
  panoramaMapExpanded: boolean;
  infoWindow;
  infoWindowMarker;
  measureTool;
  drawingManager;
  markerSelected;
  isMeasuring: boolean = false;
  infoWindowMarkerOpen: boolean;
  higLightedPosition;
  highLightedId;
  around = new google.maps.Circle({radius: 20000, strokeColor: '#004085', fillColor: '#b8daff'});

  private detailZone;
  private panorama;
  private zoom = 8;
  private markerCluster;
  private markerClusterMarkers = [];
  private markerUnCluster = [];
  private colorScheme;
  private controlZoneCluster;
  private detailItems = [];
  private pointOfInterestCluster;
  private myPosition = {marker: null, accuracy: null};
  private plainRoute = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: 'black',
    strokeWeight: 4,
    icons: [{
      icon: {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
        scale: 1.75,
        strokeColor: 'white'
      },
      repeat: '40px',
      offset: '50px'
    }]
  });
  private renderer: Renderer2;
  private profile: ThemeState;
  private text = {
    night: '',
    controlzone: '',
    risk_level: '',
    not_recorded: '',
    max_velocity: '',
    max_time: '',
    assets: '',
    point_of_interest: '',
    event: '',
    time_in_event: '',
    date_device: '',
    geografic_point: '',
  };
  private textKeys = {
    'CONTROLZONE': 'controlzone',
    'RISK_LEVEL': 'risk_level',
    'NOT_RECORDED': 'not_recorded',
    'MAX_VELOCITY': 'max_velocity',
    'MAX_TIME': 'max_time',
    'ASSETS': 'assets',
    'POINT_OF_INTEREST': 'point_of_interest',
    'EVENT': 'event',
    'TIME_IN_EVENT': 'time_in_event',
    'DATE_DEVICE': 'date_device',
    'GEOGRAFIC_POINT': 'geografic_point'
  };


  constructor(public store: Store<RootAction>,
              private translate: TranslateService,
              private rendererFactory: RendererFactory2,
              @Inject(DOCUMENT) private document: any) {
    super();
    self = this;

    this.store.select('theme')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(profile => this.profile = profile);

    this.store.select('theme', 'colorScheme')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(res => {
        this.colorScheme = res;
        if (this.map) {
          this.map.setMapTypeId('dark' === res ? 'night' : 'roadmap');
        }
      });

    this.translate.get(Object.keys(this.textKeys))
      .pipe(take(1))
      .subscribe(translations => {
        Object.keys(translations).forEach(key => {
          this.text[this.textKeys[key]] = translations[key];
        });
      });

    this.renderer = rendererFactory.createRenderer(null, null);
  }

  static checkPosition(item: any): boolean {
    return (false !== item.calidad_gps && -180 <= item.long && 180 >= item.long && -90 <= item.lat && 90 >= item.lat);
  }

  initMap(options: any = {}): void {
    this.infoWindow = new google.maps.InfoWindow();
    this.map = new google.maps.Map(this.document.getElementById(DEFAULT_MAP_OPTIONS.container), {...DEFAULT_MAP_OPTIONS, ...options});
    this.initMapTypes();
    this.initMyPosition();
    this.initClusters();
    this.initPanorama();
    this.initMeasureTool();
  }


    /**
   * inicializa la libreria MeasureTool para realizar mediciones sobre el mapa
   */
  initMeasureTool() {
    this.measureTool = new MeasureTool(this.map, {
      contextMenu: false,
      showSegmentLength: true,
      tooltip: true,
      unit: MeasureTool.UnitTypeId.METRIC // metric, imperial, or nautical
    });



    this.measureTool.addListener('measure_change', (e) => {
      if (this.markerSelected) {
        this.measureTool._geometry.updateNode(e.result.points.length - 1, this.markerSelected);
        this.markerSelected = null;
      }
    });
  }

  measureMarks() {


    this.isMeasuring = !this.isMeasuring;
    if (this.isMeasuring)
      this.measureTool.start();
    else
      this.measureTool.end();

  }


  initDrawingMode(){
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: false,
      circleOptions: {
        clickable: true,
        draggable: true,
        editable: true,
        fillColor: '#f00000',
        strokeColor: '#f00000'
    },
    polygonOptions: {
        clickable: true,
        draggable: true,
        editable: true,
        fillColor: '#f00000',
        strokeColor: '#f00000'
    },
    rectangleOptions: {
        clickable: true,
        draggable: true,
        editable: true,
        fillColor: '#f00000',
        strokeColor: '#f00000'
    }
    });
    this.drawingManager.setMap(this.map);

    return this.drawingManager
  }



  setDrawingMode(mode){
    this.drawingManager.setDrawingMode( mode ? google.maps.drawing.OverlayType[mode] : null);
  }

  fitMarkerBounds() {
    if (!this.panoramaShowed) {
      if (!!this.around.getMap()) {
        this.map.fitBounds(this.around.getBounds());
      } else if (this.higLightedPosition) {
        this.flyTo(this.higLightedPosition);
      } else if (this.markerUnCluster.length > 0) {
        this.fitUnclusterBounds();
      } else if (this.markerCluster.getTotalMarkers() > 0) {
        this.markerCluster.fitMapToMarkers();
      } else {
        this.map.setZoom(11);
        this.map.setCenter({lat: 4.7110, lng: -74.0721});
      }
    }
  }

  flyTo(position) {
    this.map.setZoom(18);
    setTimeout(() => {
      this.map.panTo(position);
    });
  }

  setMapType(type): void {
    if ('ILLEGAL_MINERY' === type) {
      this.illegalMiningVisible = !this.illegalMiningVisible;
      this.illegalMiningLayer.setMap(this.illegalMiningVisible ? this.map : null);
    } else {
      this.map.setMapTypeId(type);
    }
  }

  mapZoomIn(): void {
    this.zoom = this.map.getZoom() + 1;
    if (22 > this.zoom) {
      this.map.setZoom(this.zoom);
    }
  }

  mapZoomOut(): void {
    this.zoom = this.map.getZoom() - 1;
    if (-1 < this.zoom) {
      this.map.setZoom(this.zoom);
    }
  }

  setCurrentPosition(): void {
    this.showCurrentPosition = !this.showCurrentPosition;
    if (this.showCurrentPosition) {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            this.myPosition.marker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
            this.myPosition.accuracy.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
            this.myPosition.accuracy.setRadius(position.coords.accuracy);
            this.myPosition.marker.setAnimation(google.maps.Animation.DROP);
            this.map.setZoom(18);
            this.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
            this.myPosition.marker.setMap(this.map);
            this.myPosition.accuracy.setMap(this.map);
          },
          () => {
            this.showCurrentPosition = false;
          }
        );
      }
    } else {
      this.myPosition.marker.setMap(null);
      this.myPosition.marker.setAnimation(null);
      this.myPosition.accuracy.setMap(null);
    }
  }

  clearMapMarkers(): void {
    this.around.setMap(null);

    this.clearDetailsMap();

    this.markerUnCluster.forEach(marker => {
      marker.setMap(null);
      google.maps.event.clearInstanceListeners(marker);
    });
    this.markerUnCluster = [];

    if (this.markerCluster) {
      if (this.markerCluster.getTotalMarkers() > 0) {
        this.markerCluster.getMarkers().forEach(marker => {
          google.maps.event.clearInstanceListeners(marker);
        });
      }
      this.markerCluster.clearMarkers();
    }
  }

  higLightedZone(zona: IControlZoneFeature){
    const bounds = new google.maps.LatLngBounds();

    const polygon = this.createPolygon(zona);

    const paths = polygon.getPaths();
    paths.forEach((path) => {
      path.getArray().forEach(cord => {
        bounds.extend(cord);
      });
    });
    polygon.addListener('click', (event) => {
      self.infoWindow.setContent(`<div id="content">
                      <div class="mat-title mb-0">${self.text.controlzone}</div>
                      <div class="mat-body-1" style="font-weight: 300;">${zona?.properties?.nombre}</div>
                      <div class="mat-caption"><strong class="mr-1">${self.text.risk_level}:</strong>
                            ${zona?.properties?.riesgo_nombre || self.text.not_recorded}
                      </div>
                      <div class="mat-caption"><strong class="mr-1">${self.text.max_velocity}:</strong>
                            ${zona?.properties?.velocidad_maxima || 0} ${self.profile.metrics_alias.velocity}
                      </div>
                      <div class="mat-caption"><strong class="mr-1">${self.text.max_time}:</strong>
                            ${zona?.properties?.tiempo_maximo || 0} ${self.profile.metrics_alias.timedelta}
                      </div>
                      </div>`);
      self.infoWindow.open(self.map, polygon);
    });

    polygon.setMap(this.map);

    this.detailItems.push(polygon);

    this.map.fitBounds(bounds);

  }

  highlightMarker(item: IMarkerItem, zonasControl: IReportListItemZonaControl[]) {

    if (item.marker) {

      this.highLightedId = item.id;
      this.higLightedPosition = item.marker.getPosition();

      if (this.infoWindow) {
        this.infoWindow.close();
      }
      this.infoWindowMarker = undefined;

      const el = new ElementRef(item.marker.getContent());
     this.renderer.addClass(el.nativeElement, 'selected');

      if (!item.unCluster) {
        this.markerCluster.removeMarker(item.marker);

        item.marker.setMap(this.map);
        item.marker.setZIndex(100000);
      }

      if (Array.isArray(zonasControl) && zonasControl.length > 0) {
        const bounds = this.setDetailsControlZones(zonasControl);
       bounds.extend(item.marker.getPosition());
        if (this.panoramaShowed) {
          this.flyTo(this.higLightedPosition);
        } else {
           this.map.fitBounds(bounds);
        }
      } else {
       this.flyTo(this.higLightedPosition);
      }

     this.panPanoramaToMarker(item.rumbo);
    }
  }


  unhighlightZone(item, editing = false){
    this.clearDetailsMap();
    this.around.setMap(null);
    this.higLightedPosition = null;
    this.highLightedId = null;
    if(!editing){
    this.controlZoneCluster.addMarker(item.controlzone);
    this.map.setZoom(5);
    }
  }

  unhighlightMarker(item: IMarkerItem, fitMap: boolean, showMarker: boolean) {

    this.clearDetailsMap();
    this.around.setMap(null);

    this.higLightedPosition = null;
    this.highLightedId = null;


    if (item.marker) {

      const el = new ElementRef(item.marker.getContent());
      this.renderer.removeClass(el.nativeElement, 'selected');

      if (!item.unCluster) {
        item.marker.setZIndex(1);
        if (showMarker) {
          this.markerCluster.addMarker(item.marker);
        } else {
          item.marker.setMap(null);
        }
      }

    }

    if (fitMap && !this.panoramaShowed) {
      if (this.markerUnCluster.length > 0) {
        this.fitUnclusterBounds();
      } else {
        this.markerCluster.fitMapToMarkers();
      }
    }
  }

  clearDetailsMap() {
    this.detailItems.forEach(detail => {
      google.maps.event.clearInstanceListeners(detail);
      detail.setMap(null);
    });
    this.detailItems = [];
  }

  setDetailsControlZones(data: IReportListItemZonaControl[]) {
    const bounds = new google.maps.LatLngBounds();

    data.forEach(item => {
      if (item.poligono) {
        const polygon = this.createPolygon(item);

        const paths = polygon.getPaths();
        paths.forEach((path) => {
          path.getArray().forEach(cord => {
            bounds.extend(cord);
          });
        });

        polygon.addListener('click', (event) => {
          self.infoWindow.setContent(`<div id="content">
                          <div class="mat-title mb-0">${self.text.controlzone}</div>
                          <div class="mat-body-1" style="font-weight: 300;">${item.nombre}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.risk_level}:</strong>
                                ${item.riesgo_nombre || self.text.not_recorded}
                          </div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.max_velocity}:</strong>
                                ${item.velocidad_maxima || 0} ${self.profile.metrics_alias.velocity}
                          </div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.max_time}:</strong>
                                ${item.tiempo_maximo || 0} ${self.profile.metrics_alias.timedelta}
                          </div>
                          </div>`);
          self.infoWindow.open(self.map, polygon);
        });

        polygon.setMap(this.map);
        this.detailItems.push(polygon);
      }
    });
    return bounds;
  }

  setFeaturesPolyLine(show: boolean): void {
    if (show) {
      this.plainRoute.setMap(this.map);
    } else {
      this.plainRoute.setMap(null);
    }
  }

  setFeaturesMarkers(show): void {
    if (show) {
      if (this.markerClusterMarkers.length > 0) {
        this.markerCluster.addMarkers(this.markerClusterMarkers);
      }
    } else {
      this.markerClusterMarkers = this.markerCluster.getMarkers();
      this.markerCluster.clearMarkers();
    }
  }

  setFeaturesPolyLinePath() {
    this.plainRoute.setPath([]);
    const plainRoutePath = [];
    if (this.markerUnCluster.length > 1) {
      plainRoutePath.push(this.markerUnCluster[1].getPosition());
    }
    this.markerCluster.getMarkers().reverse().forEach(marker => {
      plainRoutePath.push(marker.getPosition());
    });
    if (this.markerUnCluster.length > 0) {
      plainRoutePath.push(this.markerUnCluster[0].getPosition());
    }
    this.plainRoute.setPath(plainRoutePath);
  }

  setFeaturesControlZones(show: boolean, data, isInstallation = false): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }

    this.clearControlZoneCluster();

    if (this.controlZoneCluster && show && data && !isInstallation ) {
      data.features.forEach(item => {
        const polygon = this.createPolygon(item);

        polygon.addListener('click', (event) => {
          self.infoWindow.setContent(`<div id="content">
                          <div class="mat-title mb-0">${self.text.controlzone}</div>
                          <div class="mat-body-1" style="font-weight: 300;">${item.properties.nombre}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.assets}:</strong>${item.properties.activos.length}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.risk_level}:</strong>
                            ${item.properties.riesgo_nombre || self.text.not_recorded}
                          </div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.max_velocity}:</strong>
                              ${item.properties.velocidad_maxima || 0} ${self.profile.metrics_alias.velocity}
                          </div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.max_time}:</strong>
                              ${item.properties.tiempo_maximo || 0} ${self.profile.metrics_alias.timedelta}
                          </div>
                          </div>`);
          self.infoWindow.open(self.map, polygon);
        });

        this.controlZoneCluster.addMarker(polygon);
      });
    }
  }



  addControlZonesCluster( item): google.maps.Polygon {

        const polygon = this.createPolygon(item);

        polygon.addListener('click', (event) => {
          self.infoWindow.setContent(`<div id="content">
                          <div class="mat-title mb-0">${self.text.controlzone}</div>
                          <div class="mat-body-1" style="font-weight: 300;">${item.properties.nombre}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.assets}:</strong>${item.properties.activos.length}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.risk_level}:</strong>
                            ${item.properties.riesgo_nombre || self.text.not_recorded}
                          </div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.max_velocity}:</strong>
                              ${item.properties.velocidad_maxima || 0} ${self.profile.metrics_alias.velocity}
                          </div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.max_time}:</strong>
                              ${item.properties.tiempo_maximo || 0} ${self.profile.metrics_alias.timedelta}
                          </div>
                          </div>`);
          self.infoWindow.open(self.map, polygon);
        });

        this.controlZoneCluster.addMarker(polygon);

        return polygon;


  }

  resize() {
    if (this.panoramaShowed) {
      google.maps.event.trigger(this.panorama, 'resize');
    } else if (this.map) {
      const currCenter = this.map.getCenter();
      google.maps.event.trigger(this.map, 'resize');
      this.map.setCenter(currCenter);
    }
  }

  expandPanoramaMap(): void {
    this.panoramaMapExpanded = !this.panoramaMapExpanded;
    if (this.panoramaMapExpanded) {
      self.map.setZoom(18);
    } else {
      self.map.setZoom(14);
    }
    setTimeout(() => this.resize(), 500);
  }

  setFeaturesPointsOfInterest(show, data): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }

    this.clearPointOfInterestCluster();

    if (this.pointOfInterestCluster && show && data) {
      data.features.forEach(item => {

        const markerPi = new google.maps.Marker({
          icon: item.properties.marcador,
          animation: google.maps.Animation.DROP,
          position: {lat: item.geometry.coordinates[1], lng: item.geometry.coordinates[0]}
        });

        markerPi.addListener('click', (event) => {
          self.infoWindow.setContent(`<div id="content">
                          <div class="mat-title mb-0">${self.text.point_of_interest}</div>
                          <div class="mat-body-1" >${item.properties.nombre}</div>
                          <div class="mat-caption"><strong>${event.latLng.lat()}, ${event.latLng.lng()}</strong></div>
                          </div>`);
          self.infoWindow.setOptions({pixelOffset: {width: 0, height: -55}});
          self.infoWindow.open(self.map, markerPi);
        });
        this.pointOfInterestCluster.addMarker(markerPi);
      });
    }
  }

  addMarkerToCluster(data: IMarkerItem, markerId: number, type: string, mode: string): RichMarker {
    const el = document.createElement('div');

    const marker = new RichMarker({
      position: new google.maps.LatLng(data.lat, data.long),
      flat: true,
      content: el
    });

    el.setAttribute('id', markerId.toString());

    let className = 'map-marker ' + type;
    let innerHTML = '<div class="ignition-wrapper"></div>' +
      '<div class="bottom"></div>' +
      '<img alt="" src="' + data.marcador + '">' +
      '<div class="pulse"></div>';

    if (data.tipo === 0) {
      className += ' alarm';
    }


    if (data.ignicion) {
      className += ' ignition-on';
    } else if (data.ignicion === false) {
      className += ' ignition-off';
    }

    if (data.rumbo) {
      innerHTML += '' +
        '<div class="course-wrapper" style="transform: rotate(' + data.rumbo + 'deg);">' +
        // tslint:disable-next-line:max-line-length
        '<svg version="1.1" xmlns="services://www.w3.org/2000/svg" xmlns:xlink="services://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 45" style="enable-background:new 0 0 36 45;" xml:space="preserve"> ' +
        // tslint:disable-next-line:max-line-length
        '<path d="M18,11.5c0.5,0,1,0.3,1.3,0.7l9,15c0.3,0.5,0.3,1,0,1.5c-0.3,0.5-0.8,0.8-1.3,0.8h-3V32c0,0.8-0.7,1.5-1.5,1.5h-8 c-0.8,0-1.5-0.7-1.5-1.5v-2.5H9c-0.5,0-1-0.3-1.3-0.8s-0.3-1,0-1.5l9-15C17,11.8,17.5,11.5,18,11.5z M24.4,26.5L18,15.9l-6.4,10.6 h2.9c0.8,0,1.5,0.7,1.5,1.5v2.5h5V28c0-0.8,0.7-1.5,1.5-1.5H24.4z"/>' +
        '<path class="st0" d="M24.4,26.5L18,15.9l-6.4,10.6h2.9c0.8,0,1.5,0.7,1.5,1.5v2.5h5V28c0-0.8,0.7-1.5,1.5-1.5H24.4z"/>' +
        '</svg>' +
        '</div>';
    }

    if ('tracking' === mode && data.placa) {
      innerHTML += '<div class="plate-wrapper">' + data.placa + '</div>';
    }

    el.className = className;
    el.innerHTML = innerHTML;

    this.addMarkerInfoWindowListener(marker, data);

    if (data.unCluster) {
      marker.setMap(this.map);
      marker.setZIndex(100000);
      this.markerUnCluster.push(marker);
    } else {
      this.markerCluster.addMarker(marker);
    }

    return marker;
  }

  updateMarker(item: IMarkerItem) {

    if (item.marker) {

      google.maps.event.clearInstanceListeners(item.marker);

      const el = new ElementRef(item.marker.getContent());

      if (item.tipo === 0) {
        if (!el.nativeElement.classList.contains('alarm')) {
          this.renderer.addClass(el.nativeElement, 'alarm');
        }
      } else {
        if (el.nativeElement.classList.contains('alarm')) {
          this.renderer.removeClass(el.nativeElement, 'alarm');
        }
      }

      if (item.ignicion) {
        this.renderer.removeClass(el.nativeElement, 'ignition-off');
        this.renderer.addClass(el.nativeElement, 'ignition-on');
      } else if (item.ignicion === false) {
        this.renderer.addClass(el.nativeElement, 'ignition-off');
        this.renderer.removeClass(el.nativeElement, 'ignition-on');
      } else {
        this.renderer.removeClass(el.nativeElement, 'ignition-off');
        this.renderer.removeClass(el.nativeElement, 'ignition-on');
      }

      if (item.rumbo) {
        const child = el.nativeElement.getElementsByClassName('course-wrapper');
        if (child.length > 0) {
          child[0].style.transform = 'rotate(' + item.rumbo + 'deg)';
        }
      }
      item.marker.setPosition(new google.maps.LatLng(item.lat, item.long));
      this.addMarkerInfoWindowListener(item.marker, item);
    }

  }

  removeMarker(item: IMarkerItem) {
    item.marker.setMap(null);
    google.maps.event.clearInstanceListeners(item.marker);
    this.markerCluster.removeMarker(item.marker);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    try {
      google.maps.event.clearInstanceListeners(this.map);
    } catch (e) {
    }
    try {
      google.maps.event.clearInstanceListeners(this.panorama);
    } catch (e) {
    }
    try {
      this.clearMapMarkers();
    } catch (e) {
    }
    try {
      this.clearControlZoneCluster();
    } catch (e) {
    }
    try {
      this.clearPointOfInterestCluster();
    } catch (e) {
    }
  }

  showAround(center: LatLng | LatLngLiteral) {
    if (!this.around.getMap()) {
      this.around.setCenter(center);
      this.around.setMap(this.map);
      this.map.fitBounds(this.around.getBounds());
    } else {
      this.around.setMap(null);
      this.fitMarkerBounds();
    }
  }

  /**
   * Centra el mapa en el hombrecito de streeView.
   */
  panToPanorama() {
    this.map.setZoom(18);
    this.map.panTo(this.panorama.getPosition());
  }

  /**
   * Centra el mapa y el hombrecito de streeView en el marcardor activo.
   */
  panPanoramaToMarker(rumbo: number) {
    if (this.panoramaShowed && this.higLightedPosition) {
      this.panorama.setPosition(this.higLightedPosition);
      this.panorama.setPov({heading: rumbo, pitch: 0});
    }
  }

  /***
   * Ajusta el mapa a los marcadores que estan dentro y fuera del cluster.
   */
  private fitUnclusterBounds() {
    const bounds = new google.maps.LatLngBounds();
    this.markerUnCluster.forEach(item => {
      bounds.extend(item.getPosition());
    });
    this.markerCluster.getMarkers().forEach(item => {
      bounds.extend(item.getPosition());
    });
    this.map.fitBounds(bounds);
  }

  private initClusters(): void {
    this.pointOfInterestCluster = new MarkerClusterer(this.map, [], {
      imagePath: STATIC_URL + '/images/maps/cluster/m',
      gridSize: 40,
      maxZoom: 16,
      styles: MARKER_CLUSTER_STYLE
    });

    this.markerCluster = new MarkerClusterer(this.map, [], {
      imagePath: STATIC_URL + '/images/maps/cluster/m',
      gridSize: 40,
      maxZoom: 16,
      styles: MARKER_CLUSTER_STYLE
    });

    this.controlZoneCluster = new MarkerClusterer(this.map, [], {
      imagePath: STATIC_URL + '/images/maps/cluster/m',
      gridSize: 40,
      maxZoom: 16,
      styles: MARKER_CLUSTER_STYLE
    });
  }

  private initMapTypes(): void {
    this.map.mapTypes.set('night', new google.maps.StyledMapType(NIGHT_STYLE, {name: this.text.night}));

    this.map.mapTypes.set('OSM', new google.maps.ImageMapType({
      getTileUrl: this.getTileUrl('OSM'),
      tileSize: new google.maps.Size(256, 256),
      name: 'Open Street Map',
      maxZoom: 18
    }));

    this.map.mapTypes.set('OCM', new google.maps.ImageMapType({
      getTileUrl: this.getTileUrl('OCM'),
      tileSize: new google.maps.Size(256, 256),
      name: 'Open Cycle Map',
      maxZoom: 18
    }));

    this.illegalMiningLayer = new google.maps.KmlLayer({url: `${STATIC_URL}maps/kml/CO/illegal_mining.kmz`});

    if ('dark' === this.colorScheme) {
      this.setMapType('night');
    }
  }

  private initMyPosition(): void {
    this.myPosition.marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      icon: STATIC_URL + '/images/maps/markers/myposition.svg',
      zIndex: 10000
    });

    this.myPosition.accuracy = new google.maps.Circle({
      fillColor: '#00b8ff',
      fillOpacity: 0.15,
      strokeColor: '#00b8ff',
      strokeOpacity: 0.6,
      strokeWeight: 2
    });
  }

  private addMarkerInfoWindowListener(marker, data: IMarkerItem) {
    marker.addListener('mouseover', () => {
      self.infoWindowMarkerOpen = true;
      if (self.infoWindowMarker !== marker) {
        self.infoWindowMarker = marker;
        setTimeout(() => {
          if (self.infoWindowMarkerOpen) {
            self.infoWindow.setContent(`<div id="content">
                          <div class="mat-title mb-0">${data.nombre}</div>
                          <div class="mat-body-1" style="font-weight: 300;">${data.placa ? data.placa : ''}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.event}:</strong>${data.evento_nombre}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.time_in_event}:</strong>${data.tiempo_evento}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.date_device}:</strong>${data.fecha_hora_equipo}</div>
                          <div class="mat-caption"><strong class="mr-1">
                              ${self.text.geografic_point}:</strong>${data.latitud}, ${data.longitud}
                          </div>
                          </div>`);
            self.infoWindow.setOptions({pixelOffset: {width: 0, height: -55}});
            self.infoWindow.open(self.map, marker);
          }
        }, 500);
      }
    });

    marker.addListener('click', (e) => {
      if (this.isMeasuring) {
        this.markerSelected = [marker.position.lng(), marker.position.lat()]
        if(this.measureTool.points.length == 0){
        this.measureTool.end();
        this.measureTool.start([{lat: marker.position.lat(), lng: marker.position.lng() }]);
        }
      }
      else {
        this.markerSelected = null;
      }
    });

    marker.addListener('mouseout', () => {
      self.infoWindowMarkerOpen = false;
      setTimeout(() => {
        if (self.infoWindowMarker === marker && !self.infoWindowMarkerOpen) {
          self.infoWindow.close();
          self.infoWindowMarker = undefined;
        }
      }, 10);
    });

  }

  private clearControlZoneCluster() {
    if (this.controlZoneCluster) {
      if (this.controlZoneCluster.getTotalMarkers() > 0) {
        this.controlZoneCluster.getMarkers().forEach(polygon => {
          polygon.setMap(null);
          google.maps.event.clearInstanceListeners(polygon);
        });
      }

      this.controlZoneCluster.clearMarkers();
    }
  }

  private clearPointOfInterestCluster() {
    if (this.pointOfInterestCluster) {
      if (this.pointOfInterestCluster.getTotalMarkers() > 0) {
        this.pointOfInterestCluster.getMarkers().forEach(marker => {
          marker.setMap(null);
          google.maps.event.clearInstanceListeners(marker);
        });
      }
      this.pointOfInterestCluster.clearMarkers();
    }

  }

  private getTileUrl(type: string): (coord, zoom) => (string) {
    return (coord, zoom) => {
      // tslint:disable-next-line:no-bitwise
      const tilesPerGlobe = 1 << zoom;
      let x = coord.x % tilesPerGlobe;
      if (0 > x) {
        x = tilesPerGlobe + x;
      }
      if (type === 'OCM') {
        return 'https://tile.thunderforest.com/cycle/' + zoom + '/' + x + '/' + coord.y + '.png?apikey=ef254068ec9b43d6bdd4fa7e24f25f64';
      } else if (type === 'OSM') {
        return 'https://tile.openstreetmap.org/' + zoom + '/' + x + '/' + coord.y + '.png';
      }

    };
  }

  private createPolygon(item) {
    const paths = [];

    const coordinates = item.geometry ? item.geometry.coordinates : item.poligono.coordinates;
    const riesgo = item.properties ? item.properties.riesgo : item.riesgo;

    coordinates[0].forEach((info) => {
      paths.push({lat: info[1], lng: info[0]});
    });

    const polygon = new google.maps.Polygon({paths});

    switch (riesgo) {
      case 0:
        polygon.setOptions({fillColor: 'yellow', strokeColor: 'yellow'});
        break;
      case 1:
        polygon.setOptions({fillColor: 'oragne', strokeColor: 'oragne'});
        break;
      case 2:
        polygon.setOptions({fillColor: 'red', strokeColor: 'red'});
        break;
    }

    let lastPath = null;
    let lastCenter = null;

    // @ts-ignore
    polygon.getPosition = () => {
      const path = polygon.getPath();
      if (lastPath === path) {
        return lastCenter;
      }
      lastPath = path;
      const bounds = new google.maps.LatLngBounds();
      path.forEach((latlng, i) => {
        bounds.extend(latlng);
      });

      lastCenter = bounds.getCenter();
      return lastCenter;
    };
    return polygon;
  }

  private initPanorama(): void {
    this.panorama = new google.maps.StreetViewPanorama(document.getElementById('agm-pano'), defaultPanoramaOptions);
    this.map.setStreetView(self.panorama);

    google.maps.event.addListener(this.panorama, 'position_changed', () => {
      if (self.panoramaShowed) {
        self.map.panTo(self.panorama.getPosition());
      }
    });

    google.maps.event.addListener(this.panorama, 'visible_changed', () => {
      self.panoramaShowed = self.panorama.getVisible();


      if (self.panoramaShowed) {
        setTimeout(() => {
          self.map.setZoom(14);
          self.map.panTo(self.panorama.getPosition());
        }, 100);
      } else {
        self.panoramaMapExpanded = false;
        setTimeout(() => self.fitMarkerBounds(), 500);
      }
    });
  }
}
