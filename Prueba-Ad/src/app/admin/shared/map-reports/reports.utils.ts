import {ThemeState} from '@store/reducers/theme.reducer';
import {IListItems, IMarkerItem, IReportListItem, IReportlocations} from '@shared/models/tracking.models';
import {STATIC_URL} from '@shared/consts/api.consts';
import {formatDate, getDistance, getVelocity, setCoordinates, setTimeDelta} from '@shared/utils/conversion.utils';


export function proccesMessage(msg: IReportListItem, profile: ThemeState): IListItems {

  ['activo_id', 'actor_vial_id', 'cliente_id', 'evento_id'].forEach(key => {
    msg[key.replace('_id', '')] = msg[key];
    delete msg[key];
  });

  msg.id = msg.activo;

  if (profile.alarmas.includes(msg.evento)) {
    msg.tipo = 0;
  } else if (profile.notificaciones.includes(msg.evento)) {
    msg.tipo = 1;
  }
  msg.fecha_hora_equipo_iso = new Date(msg.fecha_hora_equipo);
  msg.fecha_hora_equipo = formatDate(msg.fecha_hora_equipo, profile);
  msg.fecha_hora_servidor = formatDate(msg.fecha_hora_servidor, profile);


  msg.velocidad = getVelocity(msg.velocidad, profile.formatos_json);

  if (msg.actor_vial) {
    msg.actor_vial_apellidos = msg.actor_vial_nombre.split(',')[0];
    msg.actor_vial_nombres = msg.actor_vial_nombre.split(',')[1];
  }

  if (msg.punto_interes?.distancia) {
    msg.punto_interes.distancia = getDistance(msg.punto_interes.distancia, profile.formatos_json);
  }

  if (msg.datos_json) {
    if (msg.datos_json.vel_max) {
      msg.datos_json.vel_max = getVelocity(msg.datos_json.vel_max, profile.formatos_json);
    }
    if (msg.datos_json.seg_evento) {
      msg.datos_json.seg_evento = setTimeDelta(msg.datos_json.seg_evento, profile);
      msg.tiempo_evento = msg.datos_json.seg_evento;
    }

    if (typeof msg.datos_json.rumbo === 'number') {
      msg.datos_json.rumbo = Math.round(msg.datos_json.rumbo)
    }
  }

  msg.lat = Number(msg.latitud);
  msg.long = Number(msg.longitud);

  if (profile.formatos_json.coordinate === 'dms') {
    msg.latitud = setCoordinates(msg.latitud, ['N', 'S']);
    msg.longitud = setCoordinates(msg.longitud, ['E', 'W']);
  }


  msg.rutas?.map((item) => {
    item.eta = formatDate(item.eta, profile);
    return item;
  })

  return getListItem(msg);
}

export function getListItem(msg): IListItems {

  return {
    id: msg.id,
    activo: msg.activo,
    evento: msg.evento,
    alim_ext: msg.io_json.alim_ext,
    bateria: msg.bateria,
    calidad_gps: msg.calidad_gps,
    canal_comunicacion: msg.canal_comunicacion,
    direccion: msg.datos_json.direccion,
    evento_nombre: msg.evento_nombre,
    fecha_hora_equipo: msg.fecha_hora_equipo,
    fecha_hora_servidor: msg.fecha_hora_servidor,
    fecha_hora_equipo_iso: msg.fecha_hora_equipo_iso,
    ignicion: msg.io_json.ign,
    cinturon: msg.io_json.cnt,
    nombre: msg.nombre,
    rumbo: Math.round(msg.datos_json.rumbo),
    simcard: msg.io_json.simcard,
    velocidad: msg.velocidad,
    marcador: msg.marcador,
    tipo: msg.tipo,
    lat: msg.lat,
    latitud: msg.latitud,
    long: msg.long,
    longitud: msg.longitud,
    no_report: null,
    tiempo_evento: msg.tiempo_evento,
    placa: msg.placa,
    report: msg
  } as IListItems;
}

export function getMarkerItem(msg): IMarkerItem {
  return {
    id: msg.id,
    activo: msg.activo,
    calidad_gps: msg.calidad_gps,
    evento_nombre: msg.evento_nombre,
    fecha_hora_equipo: msg.fecha_hora_equipo,
    fecha_hora_servidor: msg.fecha_hora_servidor,
    ignicion: msg.ignicion,
    lat: msg.lat,
    latitud: msg.latitud,
    long: msg.long,
    longitud: msg.longitud,
    marcador: msg.marcador || STATIC_URL + '/images/maps/marcador.png',
    nombre: msg.nombre,
    placa: msg.placa,
    rumbo: msg.rumbo,
    tipo: msg.tipo,
    tiempo_evento: msg.tiempo_evento,
    velocidad: msg.velocidad,
    unCluster: false
  } as IMarkerItem;
}


export function processResponseGetLocation(response) {
  let message = '';
  let identificador: string;
  let data;
  let status = 'success';

  if (response?.length > 0) {
    identificador = response[0]?.equipos_identificador;

    if (undefined === response[0]?.respuesta && response[0].id === null) {
      message = 'RESPONSE_ERROR';
      status = 'warning';
    } else if (undefined !== response[0]?.respuesta?.calidad_gps) {
      message = 'LOCATION_OBTAINED';
      data = {
        lat: response[0].respuesta.latitud,
        long: response[0].respuesta.longitud,
        calidad_gps: response[0].respuesta.calidad_gps,
        direccion: response[0].respuesta.direccion
      }
    } else if ('OK' === response[0].respuesta || response[0].id !== null) {
      message = 'COMMAND_SENDED';
    } else {
      message = response[0].respuesta;
      status = 'warning';
    }
    return {message, identificador, data, status};
  }
  return {message: JSON.stringify(response)};
}
