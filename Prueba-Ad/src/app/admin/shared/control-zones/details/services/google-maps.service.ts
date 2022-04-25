import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {take, takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {TranslateService} from '@ngx-translate/core';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {DEFAULT_MAP_OPTIONS, NIGHT_STYLE} from '@shared/consts/google';

declare var google: any;

let self;

@Injectable()
export class GoogleMapsService extends CommonDestroy {

  map;
  private colorScheme;
  private text: string;

  constructor(private translate: TranslateService,
              private store: Store<RootAction>,
              @Inject(DOCUMENT) private document: any) {
    super();
    self = this;

    this.translate.get('NIGHT')
      .pipe(take(1))
      .subscribe(translation => this.text = translation);

    this.store.select('theme', 'colorScheme')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(res => {
        this.colorScheme = res;
        if (this.map) {
          this.map.setMapTypeId('dark' === res ? 'night' : 'roadmap');
        }
      });
  }

  initMap(options: any = {}, item): void {

    const defaultMapOptions = {
      ...DEFAULT_MAP_OPTIONS, ...{
        container: 'cz-agm-map',
        mapTypeControl: true,
        streetViewControl: false,
      }
    };

    this.map = new google.maps.Map(this.document.getElementById(defaultMapOptions.container), {...defaultMapOptions, ...options});

    this.map.mapTypes.set('night', new google.maps.StyledMapType(NIGHT_STYLE, {name: this.text}));

    this.map.setTilt(45);

    if ('dark' === this.colorScheme) {
      this.map.setMapTypeId('night');
    }

    this.createPolygon(item);

  }

  /**
   * Agrega los poligonos al mapa
   * @param item: El geojson del poligono.
   */
  private createPolygon(item) {
    const paths = [];

    const coordinates = item.poligono.coordinates;

    coordinates[0].forEach((info) => {
      paths.push({lat: info[1], lng: info[0]});
    });

    const polygon = new google.maps.Polygon({paths});

    switch (item.riesgo) {
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

    const bounds = new google.maps.LatLngBounds();
    polygon.getPath().forEach((latlng, i) => {
      bounds.extend(latlng);
    });

    polygon.setMap(this.map);
    this.map.fitBounds(bounds);

  }

}
