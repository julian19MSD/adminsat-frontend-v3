import {IReportListItem, IReportListItemRutas} from '@shared/models/tracking.models';
import {ThemeState} from '@store/reducers/theme.reducer';
import {formatDate} from '@shared/utils/conversion.utils';

export function proccesMessage(msg: IReportListItem, ruta: IReportListItemRutas, profile: ThemeState): any {

  ['activo_id', 'actor_vial_id', 'cliente_id', 'evento_id'].forEach(key => {
    msg[key.replace('_id', '')] = msg[key];
    delete msg[key];
  });

  let rango = null;

  if (![undefined, null].includes(ruta.retraso_minutos)) {
    if (ruta.retraso_minutos > 120) {
      rango = 121;
    } else if (ruta.retraso_minutos > 60) {
      rango = 61;
    } else if (ruta.retraso_minutos > 30) {
      rango = 31;
    } else if (ruta.retraso_minutos > 0) {
      rango = 1;
    } else if (ruta.retraso_minutos === 0) {
      rango = 0;
      ruta.retraso_minutos = 0.1;
    } else if (ruta.retraso_minutos <= 0) {
      rango = 0;
    }
  }

  return {
    id: ruta.id,
    orden_cargue: ruta.orden_cargue,
    origen: ruta.origen,
    departures: ruta.departures,
    destino: ruta.destino,
    via: ruta.via,
    ruta: ruta.ruta_id,
    producto: ruta.producto,
    estado: ruta.estado,
    estado_nombre: ruta.estado_nombre,
    eta: formatDate(ruta.eta, profile),
    activo: {
      id: msg.activo,
      placa: msg.placa,
      nombre: msg.nombre
    },
    cliente_enturne: {
      id: null,
      codigo: null,
      nombre: ruta.cliente_enturne
    },
    cliente: {
      id: msg.cliente,
      nombre: msg.cliente_nombre
    },
    planilla: ruta.planilla,
    id_carga: ruta.id_carga,
    trailer: ruta.tt,
    ultimo_reporte: {
      actor_vial: {
        id: msg.actor_vial,
        nombre: msg.actor_vial_nombre
      },
      zonascontrol: ruta.zonascontrol,
      retraso_minutos: ruta.retraso_minutos,
      fecha: formatDate(msg.fecha_hora_equipo, profile),
      zona_actual: ruta.zona_actual,
      retraso: ruta.retraso
    },
    alarmas: ruta.alarmas,
    fecha_hora_asignacion_iso: new Date(ruta.fecha_hora_asignacion),
    enturnamientos: msg.rutas.length,
    retraso_rango: rango,
    isSelected:false
  };
}

