import {Inject, Injectable, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {DOCUMENT} from '@angular/common';
import {take, takeUntil} from 'rxjs/operators';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {ThemeState} from '@store/reducers/theme.reducer';
import {RootAction} from '@store/root.action';
import {DEFAULT_MAP_OPTIONS, MARKER_CLUSTER_STYLE, NIGHT_STYLE} from '@shared/consts/google';
import {API_URL, STATIC_URL} from '@shared/consts/api.consts';

declare var google: any;
declare var MarkerClusterer: any;

let self;

@Injectable()
export class GoogleMapsService extends CommonDestroy implements OnDestroy {
  map;
  controlZonePolygons = [];
  private plainRoute;
  private infoWindow;
  private controlZoneCluster;
  private colorScheme;
  private profile: ThemeState;
  private textKeys = {
    NOT_RECORDED: 'notRecorded',
    RISK_LEVEL: 'riskLevel',
    NIGHT: 'night',
    MAX_VELOCITY: 'maxVelocity',
    MAX_TIME: 'maxTime',
    ZONE_TYPE: 'zoneType',
  };
  private text = {
    night: '',
    riskLevel: '',
    notRecorded: '',
    maxVelocity: '',
    maxTime: '',
    zoneType: '',
  };

  constructor(private translate: TranslateService,
              private store: Store<RootAction>,
              @Inject(DOCUMENT) private document: any) {
    super();

    self = this;

    this.translate.get(Object.keys(this.textKeys))
      .pipe(take(1))
      .subscribe(translations => {
        Object.keys(translations).forEach(key => {
          this.text[this.textKeys[key]] = translations[key];
        });
      });
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
  }

  /**
   * Inicializa el mapa.
   * @param options: Opciones para cargar el mapa.
   * @param data: El geojson con los poligonos./
   */
  initMap(options: any = {}, data, polyLine): void {

    const defaultMapOptions = {
      ...DEFAULT_MAP_OPTIONS, ...{
        mapTypeControl: true,
        streetViewControl: false,
      }
    };

    this.infoWindow = new google.maps.InfoWindow();

    this.map = new google.maps.Map(this.document.getElementById(defaultMapOptions.container), {...defaultMapOptions, ...options});

    this.map.mapTypes.set('night', new google.maps.StyledMapType(NIGHT_STYLE, {name: this.text.night}));

    this.map.setTilt(45);

    if ('dark' === this.colorScheme) {
      this.map.setMapTypeId('night');
    }

    this.controlZoneCluster = new MarkerClusterer(this.map, [], {
      imagePath: STATIC_URL + '/images/maps/cluster/m',
      gridSize: 40,
      maxZoom: 16,
      styles: MARKER_CLUSTER_STYLE
    });

    this.setFeaturesControlZones(data);

    if (this.controlZoneCluster.getTotalMarkers() > 0) {
      this.controlZoneCluster.fitMapToMarkers();
    }

    this.map.data.addGeoJson({type: 'Feature', geometry: polyLine}
    );
  }


  /**
   * Abre la informacion de la geocerca en una ventana.
   * @param item: La instancia del feature del geojson
   * @param polygon: la instancia del poligono
   */
  setInfoWindow(item, polygon): void {
    self.infoWindow.setContent(`<div id="content">
                          <div class="mat-title mb-0">${item.properties.nombre}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.zoneType}:</strong>${item.properties.tipo_zona_nombre}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.riskLevel}:</strong>
                            ${item.properties.riesgo_nombre || self.text.notRecorded}
                          </div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.maxVelocity}:</strong>
                              ${item.properties.velocidad_maxima || 0} ${self.profile.metrics_alias.velocity}
                          </div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.maxTime}:</strong>
                              ${item.properties.tiempo_maximo || 0} ${self.profile.metrics_alias.timedelta}
                          </div>
                          </div>`);
    self.infoWindow.open(self.map, polygon);
  }

  /**
   * Abre la ventana de informacion del mapa correspondiente a la geocerca de la lista a la que se hace hover.
   * @param item: El feature de la zona de control.
   */
  openPolygonWindow(item: any) {
    if (this.map && this.controlZonePolygons[item.id]) {
      if (this.containsPolygon(this.controlZonePolygons[item.id])) {
        this.setInfoWindow(item, this.controlZonePolygons[item.id]);
      } else {
        this.closeInfoWindow();
      }
    }
  }

  /**
   * Cierra la venta de informacion del mapa
   */
  closeInfoWindow() {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

  /**
   * Ajusta los bordes del mapa al poligono recibido.
   * @param id: El id de la zona de control.
   */
  fitMapToPolygon(item: any) {
    if (this.map && this.controlZonePolygons[item.id]) {
      const bounds = new google.maps.LatLngBounds();
      this.controlZonePolygons[item.id].getPath().forEach((element, index) => {
        bounds.extend(element);
      });
      this.map.fitBounds(bounds);
      this.setInfoWindow(item, this.controlZonePolygons[item.id]);
    }
  }


  /**
   * Ajusta el mapa a las zonas de control.
   */
  fitMap() {
    if (this.map && this.controlZoneCluster.getTotalMarkers() > 0) {
      this.controlZoneCluster.fitMapToMarkers();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    try {
      this.clearControlZoneCluster();
    } catch (e) {
    }
  }


  /**
   * Valida si el polygono esta dentro de los bordes del mapa.
   * @param polygon: El poligono
   */
  private containsPolygon(polygon): boolean {
    let into = false;
    polygon.getPaths().forEach((path) => {
      path.forEach((coord) => {
        into = this.map.getBounds().contains(coord);
        if (!into) {
          return;
        }
      });
    });
    return into;
  }

  /**
   * Agrega el geojson al mapa.
   * @param data: El contenido de un geojson con poligonos
   */
  private setFeaturesControlZones(data): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }

    if (this.controlZoneCluster && data) {
      data.features.forEach(item => {
        const polygon = this.createPolygon(item);
        this.controlZonePolygons[item.id] = polygon;

        polygon.addListener('click', (event) => {
          self.setInfoWindow(item, polygon);
        });

        this.controlZoneCluster.addMarker(polygon);
      });
    }
  }

  /**
   * Borra los marcadores del cluster del mapa.
   */
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

  /**
   * Crea un poligono
   * @param itemL: El featrue del geojson
   */
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
}
