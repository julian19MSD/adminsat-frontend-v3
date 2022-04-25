export const PERMISSIONS = {
  activos: {
    ver: 'Activos__view_activos',
    crear: 'Activos__add_activos',
    editar: 'Activos__change_activos',
    eliminar: 'Activos__delete_activos',
  grupos: {
    ver: 'Activos__view_grupos',
    crear: 'Activos__add_grupos',
    editar:'Activos__change_grupos',
    eliminar: 'Activos__delete_grupos',
    }
  },
  zones:{
    ver: 'ZonasControl__view_zone',
    crear: 'ZonasControl__add_zone',
    editar: 'ZonasControl__change_zone',
    eliminar: 'ZonasControl__delete_zone'
  },
  subzones:{
    ver: 'ZonasControl__view_subzone',
    crear: 'ZonasControl__add_subzone',
    editar: 'ZonasControl__change_subzone',
    eliminar: 'ZonasControl__delete_subzone'
  },
  instalacion:{
    ver: 'ZonasControl__view_installationtype',
    crear: 'ZonasControl__add_installationtype',
    editar: 'ZonasControl__change_installationtype',
    eliminar: 'ZonasControl__delete_installationtype'
  },
  subinstalacion:{
    ver: 'ZonasControl__view_subinstallationtype',
    crear: 'ZonasControl__add_subinstallationtype',
    editar: 'ZonasControl__change_subinstallationtype',
    eliminar: 'ZonasControl__delete_subinstallationtype'
  },
  tpms: {
    ver: 'tpms__view_tpms',
    crear: 'tpms__add_tpms',
    editar: 'tpms__change_tpms',
    eliminar: 'tpms__delete_tpms'
  },
  miFlota:{
    ver: 'ZonasControl__view_permanence'
  },
  actorVial: {
    ver: 'ActorVial__view_actorvial',
    crear: 'ActorVial__add_actorvial',
    editar: 'ActorVial__change_actorvial',
    eliminar: 'ActorVial__delete_actorvial',
    verEventosRiesgo: 'ActorVial__view_eventos_riesgo'
  },
  alarmas: {
    ver: 'Alarmas__view_alarmas',
    atender: 'Alarmas__change_alarmas',
  },
  auditoria: {
    verLogPlataforma: 'Auditoria__view_logplataforma',
    verLogComandos: 'Auditoria__view_logcomandos',
  },
  clientes: {
    ver: 'Clientes__view_clientes',
  },
  equipos: {
    ver: 'Equipos__view_equipos',
  },
  fuec: {
    ver: 'FUEC__view_fuec'
  },
  llegandoACero: {
    verMiRiesgo: 'LlegandoaCero__view_riesgo',
    verEventosRiesgo: 'LlegandoaCero__view_eventos',
    verAnalisisConductor: 'LlegandoaCero__view_analisis_conductor',
    parametros: {
      ver: 'LlegandoaCero__view_parametrizacion'
    }
  },
  mantenimiento: {
    ver: 'Mantenimiento__view_mantenimiento',
    verHisotrico: 'Mantenimiento__view_mantenimientohistorico',
    proveedores: {
      ver: 'Mantenimiento__view_proveedores',
    }
  },

  maquinaria: {
    ver: 'Maquinaria__view_maquinaria',
    supervisor: {
      ver: 'Maquinaria__view_supervisor',
    }
  },
  pesv: {
    verGestionDocumental: 'PESV__view_gestiondocumental',
    inspeccion: {
      crear: 'PESV__add_inspeccion',
      ver: 'PESV__view_inspeccion',
    },
    prueba: {
      ver: 'PESV__view_prueba',
    },
    capacitacion: {
      ver: 'PESV__view_capacitacion',
    },
    verInformeActor: 'PESV__view_informeactor',
    verInformeGeneral: 'PESV__view_informeglobal',
  },
  puntosInteres: {
    ver: 'PuntosInteres__view_puntosinteres',
    crear: 'PuntosInteres__add_puntosinteres',
  },
  referencias: {
    enviarComando: 'Referencias__send_comando',
    solicitarUbicacion: 'Referencias__get_location'
  },
  rutas: {
    estados: {
      ver: 'Rutas__view_estados',
    },
    observaciones: {
      crear: 'Rutas__add_observaciones',
      ver: 'Rutas__view_observaciones',
    },
    clientes: {
      ver: 'Rutas__view_clientesenturne'
    },
    enturnamientos: {
      crear: 'Rutas__add_historico',
      editar: 'Rutas__change_historico',
      ver: 'Rutas__view_historico',
    },
    jornadaLaboral: {
      crear: 'Rutas__add_workday',
      editar: 'Rutas__change_workday',
      ver: 'Rutas__view_workday',
      observaciones: {
        crear: 'Rutas__add_observation',
      }
    },
    novedades: {
      ver: 'Rutas__view_novedades',
      crear: 'Rutas__add_novedades',
      editar: 'Rutas__change_novedades',
      eliminar: 'Rutas__delete_novedades',
    },
    ver: 'Rutas__view_rutas',
  },
  sensores: {
    ver: 'Sensores__view_sensores',
  },
  tramites: {
    ver: 'Tramites__view_tramites',
    tipos: {
      ver: 'Tramites__view_tipos',
    }
  },
  usuarios: {
    ver: 'Usuarios__view_usuarios',
    dashboard: {
      edit: 'Usuarios__change_dashboard',
      verUbicacion: 'Usuarios__view_dashboard_location',
    },
    seguimiento: 'Usuarios__view_reportes',
    informes: 'Usuarios__view_estadisticas',
    verPermisosGrupos: 'auth__view_group',
    verLogConexiones: 'Usuarios__view_log_conexiones',
    verReferencias: 'Usuarios__view_referencias',
    verTrama: 'Usuarios__view_trama'
  },
  zonasControl: {
    ver: 'ZonasControl__view_zonascontrol',
    crear:'ZonasControl__add_zonascontrol',
    editar: 'ZonasControl__change_zonascontrol',
    eliminar: 'ZonasControl__delete_zonascontrol',

  },
  notificaciones: {
    ver: 'notifications__view_notification',
    crear: 'notifications__add_notification',
    editar: 'notifications__change_notification',
    eliminar: 'notifications__delete_notification',
  },

  EcuAlarma: {
    ver: 'notifications__view_ecualarm',

  },
  tableau:{
    tpms: "Usuarios__view_dashboard_tpms",
    tiempo_motor: "Usuarios__view_dashboard_engine_time",
    flota_total: "Usuarios__view_dashboard_total_fleet",
    enturnamiento: "Usuarios__view_dashboard_shifts",
    excesosVelocidad: "Usuarios__view_dashboard_speed",
    jornadaLaboral: "Usuarios__view_dashboard_workday",
    analisisVelocidad:"Usuarios__view_dashboard_speed_analysis"
  },
  mensajeria:{
    ver: 'Mensajeria__view_message',
    crear: 'Mensajeria__add_message',
  }
};

