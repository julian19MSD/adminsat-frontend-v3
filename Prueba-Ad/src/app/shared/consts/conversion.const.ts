import {enUS, es} from 'date-fns/locale';

export const DATEFORMAT = {
  'd/m/Y': 'dd/MM/yyyy',
  'd/m/y': 'dd/MM/yy',
  'm/d/Y': 'MM/dd/yyyy',
  'm/d/y': 'MM/dd/yy',
  'Y-m-d': 'yyyy-MM-dd',
  'y-m-d': 'yy-MM-dd',
  'd b. Y': 'dd MMM yyyy',
  'd b. y': 'dd MMM yy',
};

export const TIMEFORMAT = {
  'H:i': 'HH:mm',
  'H:i:s': 'HH:mm:ss',
  'h:i A': 'hh:mm a',
  'h:i:s A': 'hh:mm:ss a',
};

export const VELOCITY = {
  km_h: 1,
  mi_h: 1.609344,
  kt: 1.852,
  'kt(UK)': 1.853184
};


export const DISTANCE = {
  ft: 0.0003048,
  inch: 0.00002540000,
  km: 1,
  m: 0.001,
  mi: 1.60934,
  yd: 0.0009144,
  nm: 1.852
};


export const TIMEDELTAFORMAT = {
  s: 1.0,
  h: 3600,
  m: 60,
  d: 86400,
  w: 604800
};

export const DATE_FNS_LOCALES = {
  'en-us': enUS,
  'es-co': es,
  'es-mx': es,
  'es-pe': es,
  'es-ec': es,
};

