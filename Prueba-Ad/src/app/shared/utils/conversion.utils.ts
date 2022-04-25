import {DATE_FNS_LOCALES, DATEFORMAT, DISTANCE, TIMEDELTAFORMAT, TIMEFORMAT, VELOCITY} from '@shared/consts/conversion.const';
import {format} from 'date-fns';

export function setTimeDelta(value, profile): string {

  if (setTimeDelta.cache[value] != null) {
    return setTimeDelta.cache[value];
  }

  let result;
  if (profile.formatos_json.timedelta === 'h:m:s') {
    let seconds = parseInt(value, 10);

    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    const mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    if (days > 0) {
      return `${days}, ${hrs}:${mnts}:${seconds}`;
    }
    result = `${hrs}:${mnts}:${seconds}`;
  } else {
    result = (value / TIMEDELTAFORMAT[profile.formatos_json.timedelta]).toFixed(2);
  }

  setTimeDelta.cache[value] = result;

  return result;
}

setTimeDelta.cache = {};

export function setCoordinates(value, region: ['N', 'S'] | ['E', 'W']) {
  const d = Math.trunc(value);
  const m = Math.trunc((Math.abs(value) - Math.abs(d)) * 60);
  const s = ((Math.abs(value) - Math.abs(d) - (m / 60)) * 3600).toFixed(2);
  const r = value >= 0 ? region[0] : region[1];
  return `${d}° ${m}' ${s}" ${r}`;
}

export function formatDate(date: string, {formatos_json, idioma}) {
  return format(new Date(date),
    `${DATEFORMAT[formatos_json.date]} ${TIMEFORMAT[formatos_json.time]}`,
    {locale: DATE_FNS_LOCALES[idioma]}
  );
}

export function getVelocity(value: number, {velocity}) {
  if (getVelocity.cache[value] != null) {
    return getVelocity.cache[value];
  }

  const result = (value / VELOCITY[velocity]).toFixed(2);
  getVelocity.cache[value] = result;

  return result;
}

getVelocity.cache = {};


export function getDistance(value: number, {distance}) {
  if (getDistance.cache[value] != null) {
    return getDistance.cache[value];
  }

  const result = (value / DISTANCE[distance]).toFixed(2);
  getDistance.cache[value] = result;

  return result
}

getDistance.cache = {};

