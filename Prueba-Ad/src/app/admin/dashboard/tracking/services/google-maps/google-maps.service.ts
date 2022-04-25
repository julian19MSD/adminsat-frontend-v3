import {Inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {take, takeUntil} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {DEFAULT_MAP_OPTIONS, MARKER_CLUSTER_STYLE, NIGHT_STYLE} from '@shared/consts/google';
import {STATIC_URL} from '@shared/consts/api.consts';


let self;
declare var MarkerClusterer: any;

@Injectable()
export class GoogleMapsService extends CommonDestroy {
  map;
  infoWindowMarkerOpen: boolean;
  infoWindow;
  private textKeys = {
    NIGHT: 'night',
    EVENT: 'event',
    DATE_DEVICE: 'date',
    GEOGRAFIC_POINT: 'cords'
  };
  private text = {
    night: '',
    event: '',
    date: '',
    cords: '',
  };
  private markerCluster;
  private colorScheme;

  constructor(private store: Store<RootAction>,
              private translate: TranslateService,
              @Inject(DOCUMENT) private document: any) {
    super();
    self = this;
    this.getTexts();
    this.listenColor();
  }

  initMap(options: any = {}): void {

    const defaultMapOptions = {
      ...DEFAULT_MAP_OPTIONS, ...{
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: ['roadmap', 'night', 'terrain', 'hybrid']
        },
        mapTypeControl: true,
        streetViewControl: false,
      }
    };

    this.map = new google.maps.Map(this.document.getElementById(defaultMapOptions.container), {...defaultMapOptions, ...options});

    this.map.mapTypes.set('night', new google.maps.StyledMapType(NIGHT_STYLE, {name: this.text.night}));

    this.map.setTilt(45);
    this.infoWindow = new google.maps.InfoWindow();

    this.markerCluster = new MarkerClusterer(this.map, [], {
      imagePath: STATIC_URL + '/images/maps/cluster/m',
      gridSize: 40,
      maxZoom: 16,
      styles: MARKER_CLUSTER_STYLE
    });

    if ('dark' === this.colorScheme) {
      this.map.setMapTypeId('night');
    }

  }

  clearMapMarkers(): void {
    if (this.markerCluster) {
      if (this.markerCluster.getTotalMarkers() > 0) {
        this.markerCluster.getMarkers().forEach(marker => {
          google.maps.event.clearInstanceListeners(marker);
        });
      }
      this.markerCluster.clearMarkers();
    }
  }

  addFeaturesMarkers(data): void {
    data.forEach((item) => {
      const markerCl = new google.maps.Marker({animation: google.maps.Animation.DROP, position: item});

      this.markerCluster.addMarker(markerCl);

      markerCl.addListener('mouseover', (event) => {
        self.infoWindowMarkerOpen = true;
        if (self.infoWindowMarker !== markerCl) {
          self.infoWindowMarker = markerCl;
          setTimeout(() => {
            if (self.infoWindowMarkerOpen) {
              self.infoWindow.setContent(`<div id="content">
                          <div class="mat-title mb-0">${item.activo_nombre}</div>
                          <div class="mat-body-1" style="font-weight: 300;">${item.activo_placa ? item.activo_placa : ''}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.event}:</strong>${item.evento_nombre}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.date}:</strong>${item.fecha_hora_equipo}</div>
                          <div class="mat-caption"><strong class="mr-1">${self.text.cords}:</strong>${item.latitud}, ${item.longitud}</div>
                          </div>`);

              self.infoWindow.open(self.map, markerCl);
            }
          }, 500);
        }
      });

      markerCl.addListener('mouseout', (event) => {
        self.infoWindowMarkerOpen = false;
        setTimeout(() => {
          if (self.infoWindowMarker === markerCl && !self.infoWindowMarkerOpen) {
            self.infoWindow.close();
            self.infoWindowMarker = undefined;
          }
        }, 10);
      });

    });

    if (this.markerCluster.getTotalMarkers()) {
      this.markerCluster.fitMapToMarkers();
    } else {
      this.map.setCenter({lat: 4.7110, lng: -74.0721});
    }
  }

  mapContainerRezise(): void {
    if (this.map) {
      const currCenter = this.map.getCenter();
      google.maps.event.trigger(this.map, 'resize');
      if (this.markerCluster.getTotalMarkers() > 0) {
        setTimeout(() => this.markerCluster.fitMapToMarkers(), 50);
      } else {
        this.map.setCenter(currCenter);
      }
    }
  }

  /**
   * Obtiene las traducciones de textos para el mapa.
   */
  private getTexts() {
    this.translate.get(Object.keys(this.textKeys))
      .pipe(take(1))
      .subscribe(translations => {
        Object.keys(translations).forEach(key => {
          this.text[this.textKeys[key]] = translations[key];
        });
      });
  }

  /**
   * Se suscribe al estado del color del tema para ajustar el color del mapa automaticamente.
   */
  private listenColor() {
    this.store.select('theme', 'colorScheme')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(res => {
        this.colorScheme = res;
        if (this.map) {
          this.map.setMapTypeId('dark' === res ? 'night' : 'roadmap');
        }
      });
  }
}
