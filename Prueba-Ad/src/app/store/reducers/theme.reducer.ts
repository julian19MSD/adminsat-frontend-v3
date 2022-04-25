import {ThemeActions, ThemeActionTypes} from '@store/actions/theme.action';
import {STATIC_URL} from '@shared/consts/api.consts';
import {IUserPermission} from '@shared/models/user.model';


export interface ThemeScreenSizesState {
  mdSize: boolean;
  smSize: boolean;
}

export interface ThemeNotifications {
  alarms: number[];
  notifications: number[];
}


export interface ThemeState {
  fondoLogin: string;
  logoClient: string;
  logo: string;
  logoDark: string;
  temaCss: string;
  favicon: string;
  colorScheme: 'dark' | 'light';
  idioma: string;
  tituloSitio: string;
  id: number;
  alarmas: number[];
  cliente: number;
  dashboard: any[];
  formatos_json: any;
  foto: string;
  homepage: string;
  is_staff: boolean;
  is_superuser: boolean;
  metrics_alias: any;
  nombre: string;
  notificaciones: number[];
  perfil: number;
  perfil_nombre: string;
  permisos: IUserPermission;
  screenSize: ThemeScreenSizesState;
  sideNavCollapse: boolean;
}


const initialState: ThemeState = {
  fondoLogin: undefined,
  logoClient: STATIC_URL + '/images/logo.png',
  logo: STATIC_URL + '/images/logo.png',
  logoDark: STATIC_URL + '/images/logo_blanco.png',
  foto: undefined,
  favicon: undefined,
  temaCss: undefined,
  colorScheme: undefined,
  idioma: undefined,
  tituloSitio: undefined,
  id: undefined,
  alarmas: [],
  cliente: undefined,
  dashboard: undefined,
  formatos_json: undefined,
  homepage: undefined,
  is_staff: undefined,
  is_superuser: undefined,
  metrics_alias: {
    date: 'd b. Y',
    time: 'h:i A',
    volume: 'gal',
    distance: 'km',
    pressure: 'Psi',
    velocity: 'km/h',
    timedelta: 'h:m:s',
    coordinate: 'dd',
    date_report: 'd/m/Y',
    time_report: 'H:i'
  },
  nombre: undefined,
  notificaciones: [],
  perfil: undefined,
  perfil_nombre: undefined,
  permisos: undefined,
  sideNavCollapse: false,
  screenSize: {} as ThemeScreenSizesState
};

export function themeReducer(state = initialState, action: ThemeActions): ThemeState {

  switch (action.type) {
    case ThemeActionTypes.SetPublicTheme:
      return {...state, ...action.payload, logoClient: getLogoClient(action.payload, state.colorScheme)};

    case ThemeActionTypes.SetColorScheme:
      return {...state, colorScheme: action.payload, logoClient: getLogoClient(state, action.payload)};

    case ThemeActionTypes.SetSinevaCollapseState:
      return {...state, sideNavCollapse: action.payload};

    default:
      return state;
  }
}

export function getLogoClient(payload: ThemeState, colorScheme: string): string {
  if ('dark' === colorScheme) {
    return payload.logoDark || initialState.logoDark;
  } else {
    return payload.logo || initialState.logo;
  }
}


export const getUserNotificationsValue = (state: ThemeState): ThemeNotifications => {
  return {alarms: state.alarmas, notifications: state.notificaciones};
};

