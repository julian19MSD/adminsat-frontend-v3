/// <reference types="@types/googlemaps" />
import MapTypeStyle = google.maps.MapTypeStyle;
import {STATIC_URL} from '@shared/consts/api.consts';


export const MARKER_CLUSTER_STYLE = [
  {
    url: STATIC_URL + '/images/maps/cluster/m1.png',
    height: 53,
    width: 53
  },
  {
    url: STATIC_URL + '/images/maps/cluster/m2.png',
    height: 56,
    width: 56
  },
  {
    url: STATIC_URL + '/images/maps/cluster/m3.png',
    height: 66,
    width: 66
  },
  {
    url: STATIC_URL + '/images/maps/cluster/m4.png',
    height: 78,
    width: 78
  },
  {
    url: STATIC_URL + '/images/maps/cluster/m5.png',
    height: 90,
    width: 90
  }
];

export const CLUSTER_STYLE = [
  {
    url: STATIC_URL + '/images/maps/cluster/p1.png',
    height: 53,
    width: 53
  },
  {
    url: STATIC_URL + '/images/maps/cluster/p2.png',
    height: 56,
    width: 56
  },
  {
    url: STATIC_URL + '/images/maps/cluster/p3.png',
    height: 66,
    width: 66
  },
  {
    url: STATIC_URL + '/images/maps/cluster/p4.png',
    height: 78,
    width: 78
  },
  {
    url: STATIC_URL + '/images/maps/cluster/p5.png',
    height: 90,
    width: 90
  }

];

export const NIGHT_STYLE: MapTypeStyle[] = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#ffeb3b'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  }
];


export const DEFAULT_MAP_OPTIONS = {
  container: 'agm-map',
  center: {
    lat: 4.7110,
    lng: -74.0721
  },
  zoom: 8,
  gestureHandling: 'cooperative',
  rotateControl: true,
  zoomControl: false,
  mapTypeControl: false,
  mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    mapTypeIds: ['roadmap', 'night', 'terrain', 'hybrid']
  },
  streetViewControl: true,
  streetViewControlOptions: {
    position: google.maps.ControlPosition.LEFT_BOTTOM
  },
  fullscreenControl: false,
  styles: [
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [
        {
          color: '#015688'
        }
      ]
    }, {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#50b9f7'
        }
      ]
    }
  ]
};
