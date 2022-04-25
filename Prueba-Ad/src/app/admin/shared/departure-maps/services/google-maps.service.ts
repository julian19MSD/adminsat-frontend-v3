import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { take, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { TranslateService } from '@ngx-translate/core';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { DEFAULT_MAP_OPTIONS, NIGHT_STYLE } from '@shared/consts/google';

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

    this.map = new google.maps.Map(this.document.getElementById(defaultMapOptions.container), { ...defaultMapOptions, ...options });

    this.map.mapTypes.set('night', new google.maps.StyledMapType(NIGHT_STYLE, { name: this.text }));

    this.map.setTilt(45);

    if ('dark' === this.colorScheme) {
      this.map.setMapTypeId('night');
    }

    // this.createPolygon(item);
    this.createPolyline(item);
  }

  createPolyline(item) {

    const departure = new google.maps.Polyline({
      path: item.reports,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    const route = new google.maps.Polyline({
      path: item.route,
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

    const bounds = new google.maps.LatLngBounds();
    departure.getPath().forEach((latlng, i) => {
      bounds.extend(latlng);
    });
    departure.setMap(this.map);
    route.setMap(this.map);
    this.map.fitBounds(bounds);

  }



}
