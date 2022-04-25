import { environment } from '@environments/environment';

export const STATIC_URL = environment.staticUrl;
export const ENDPOINT: string = environment.serverUrl + '/v2';
export const OLD_ENDPOINT: string = environment.serverUrl;
export const TABLEAUTH: string = "https://tableau.adminsat.com";
export const API_URL1 = {
  requestLocation: OLD_ENDPOINT + '/operacion/comandos/solicitarubicacion/',
  sendCommand: OLD_ENDPOINT + '/operacion/comandos/enviarcomando/'
};

export const API_URL = {
  auth: {
    getToken: ENDPOINT + '/autenticacion/token/',
    refreshToken: ENDPOINT + '/autenticacion/token/refrescar/',
    logout: ENDPOINT + '/autenticacion/token/cerrar-sesion/',
    devices: ENDPOINT + '/autenticacion/token/sesiones/',
  },
  theme: {
    theme: ENDPOINT + '/tema/',
    profile: ENDPOINT + '/tema/perfil/',
    permissions: ENDPOINT + '/permisos/verificar/'
  },
  alarm: {
    general: ENDPOINT + '/alarmas/',
    attend: ENDPOINT + '/alarmas/attend/',
    instance: ENDPOINT + '/alarmas/{id}/',
    counter: ENDPOINT + '/alarmas/counter/',
  },
  reports: {
    tipos: ENDPOINT + "/informes/",
    tpms: ENDPOINT + '/informes/tpms/alarmas/download/',
    ecu: {
      general: "/informes/ecu/general/"
    },
    historical: {
      general: ENDPOINT + '/informes/ubicacion/general/',
      download: ENDPOINT + '/informes/ubicacion/general/download/'
    }
  },
  fleet:{
    fleet: ENDPOINT + '/zonascontrol/permanence/overview/',
    subinstallations: ENDPOINT + '/zonascontrol/permanence/{id}/sub-overview/'
  },
  llegandoacero: {
    mi_resgo_promedio: ENDPOINT + '/llegandoacero/riesgo-promedio/download/',
  },
  auditoria_commands: {
    general: ENDPOINT + '/auditoria/logs/commands/',
    download: ENDPOINT + '/auditoria/logs/commands/download/',

    get_status: ENDPOINT + '/auditoria/logs/commands/get-commands/'
  },
  asset: {
    general: ENDPOINT + '/activos/',
    instance: ENDPOINT + '/activos/{id}/',
    details: ENDPOINT + '/activos/{id}/details/',
    certificates: ENDPOINT + '/activos/{id}/certificate/',
    select: ENDPOINT + '/activos/select/',
    choices: ENDPOINT + '/activos/choices/',
    download: ENDPOINT + '/activos/download/',
    bulk_delete: ENDPOINT + '/activos/bulk_destroy/',
    documents: {
      general: ENDPOINT + '/activos/{assetId}/documentos/',
      instance: ENDPOINT + '/activos/{assetId}/documentos/{id}/',
      select: ENDPOINT + '/activos/{assetId}/documentos/select/'
    },
    assetsgroup: {
      general: ENDPOINT + '/Gruposactivo/',
      select: ENDPOINT + '/Gruposactivo/select/',
      choices: ENDPOINT + '/Gruposactivo/choices/',
      download: ENDPOINT + '/Gruposactivo/download/',
      bulk_delete: ENDPOINT + '/Gruposactivo/bulk_destroy/',
    },
  },
  tpms: {
    general: ENDPOINT + '/tpms/',
    instance: ENDPOINT + '/tpms/{id}/',
    details: ENDPOINT + '/tpms/{id}/details/',
    select: ENDPOINT + '/tpms/select/',
    choices: ENDPOINT + '/tpms/choices/',
    download: ENDPOINT + '/tpms/download/',
    bulk_delete: ENDPOINT + '/tpms/bulk_destroy/',

  },
  device: {
    select: ENDPOINT + '/equipos/select/',
    details: ENDPOINT + '/equipos/{id}/details/',
  },
  client: {
    count: ENDPOINT + '/clientes/select/count/',
    select: ENDPOINT + '/clientes/select/',
  },
  dashboard: {
    tracking: ENDPOINT + '/dashboard/tracking/',
    update: ENDPOINT + '/dashboard/change/'
  },
  controlZone: {
    bulk_delete: ENDPOINT + '/zonascontrol/bulk_destroy/',
    general: ENDPOINT + '/zonascontrol/',
    instance: ENDPOINT + '/zonascontrol/{id}/',
    features: ENDPOINT + '/zonascontrol/features/',
    details: ENDPOINT + '/zonascontrol/{id}/details/',
    select: ENDPOINT + '/zonascontrol/select/',
    operativeWindow: {
      general: ENDPOINT + '/zonascontrol/{idZone}/operative-window/',
      details: ENDPOINT + '/zonascontrol/{idZone}/operative-window/',
      instance: ENDPOINT + '/zonascontrol/{idZone}/operative-window/{id}/',
      select: ENDPOINT + '/zonascontrol/{idZone}/operative-window/select/',
      bulk_delete: ENDPOINT + '/zonascontrol/{idZone}/operative-window/bulk_destroy/',

    }

  },
  zones: {
    general: ENDPOINT + '/zonascontrol/references/zone/',
    instance: ENDPOINT + '/zonascontrol/references/zone/{id}/',
    download: ENDPOINT + '/zonascontrol/references/zone/download/',
    bulk_delete: ENDPOINT + '/zonascontrol/references/zone/bulk_destroy/',
  },
  subzones: {
    general: ENDPOINT + '/zonascontrol/references/subzone/',
    instance: ENDPOINT + '/zonascontrol/references/subzone/{id}/',
    download: ENDPOINT + '/zonascontrol/references/subzone/download/',
    bulk_delete: ENDPOINT + '/zonascontrol/references/subzone/bulk_destroy/',
  },
  installations: {
    permanence: ENDPOINT + '/zonascontrol/permanence/analysis/',
    general: ENDPOINT + '/zonascontrol/references/installation-type/',
    instance: ENDPOINT + '/zonascontrol/references/installation-type/{id}/',
    download: ENDPOINT + '/zonascontrol/references/installation-type/download/',
    bulk_delete: ENDPOINT + '/zonascontrol/references/installation-type/bulk_destroy/',
  },
  subinstallations: {
    general: ENDPOINT + '/zonascontrol/references/subinstallation-type/',
    instance: ENDPOINT + '/zonascontrol/references/subinstallation-type/{id}/',
    download: ENDPOINT + '/zonascontrol/references/subinstallation-type/download/',
    bulk_delete: ENDPOINT + '/zonascontrol/references/subinstallation-type/bulk_destroy/',
  },
  pointInterst: {
    features: ENDPOINT + '/puntointeres/features/'
  },
  tracking: {
    location: ENDPOINT + '/ubicacion/',
    markers: ENDPOINT + '/ubicacion/marcadores/',
    asset_retrieve: ENDPOINT + '/ubicacion/{id}/',
    retrieve: ENDPOINT + '/ubicacion/{id}/{table}/',
  },
  profile: {
    general: ENDPOINT + '/perfil/',
    change: ENDPOINT + '/perfil/change/',
    change_password: ENDPOINT + '/perfil/change-password/',
    choices: ENDPOINT + '/perfil/choices/',
    sessions: {
      list: ENDPOINT + '/perfil/sessions/',
      item: ENDPOINT + '/perfil/{id}/sessions/'
    }
  },
  references: {

    country:{
      select: ENDPOINT + '/referencias/country/select/'
    },
    municipality:{
      select: ENDPOINT + '/referencias/municipality/select/'
    },
    department:{
      select: ENDPOINT + '/referencias/department/select/'
    },
    installation_type: {
      select: ENDPOINT + '/zonascontrol/references/installation-type/select/'
    },
    subinstallation_type: {
      select: ENDPOINT + '/zonascontrol/references/subinstallation-type/select/'
    },
    zone: {
      select: ENDPOINT + '/zonascontrol/references/zone/select/'
    },
    subzone: {
      select: ENDPOINT + '/zonascontrol/references/subzone/select/'
    },
    tipo_equipos: {
      select: ENDPOINT + '/referencias/tipo-equipo/select/'
    },
    comandos_equipo: {
      select: ENDPOINT + '/referencias/comando-equipo/select/'
    },
    road_actor: {
      select: ENDPOINT + '/referencias/tipo-actor-vial/select/'
    },
    events: {
      general: ENDPOINT + '/referencias/eventos/',
      select: ENDPOINT + '/referencias/eventos/select/'
    },
    icons: {
      select: ENDPOINT + '/referencias/iconos/select/'
    },
    tireManufacturers: {
      select: ENDPOINT + '/referencias/fabricante-llantas/select/'
    },

    command: {
      getAssetCommands: ENDPOINT + '/referencias/comando-equipo/{id}/activo/',
      getAssetLocationCommand: ENDPOINT + '/referencias/comando-equipo/{id}/activo/ubicacion/',
    },
    documentType: {
      select: ENDPOINT + '/referencias/tipo-documento/select/'
    },
    vehicleType: {
      select: ENDPOINT + '/referencias/tipo-vechiculo/select/'
    },
    benefits: {
      choices: ENDPOINT + '/referencias/prestaciones/choices/'
    }
  },
  routes: {
    details: ENDPOINT + '/rutas/{id}/details/',
    select: ENDPOINT + '/rutas/select/',
    clients: {
      select: ENDPOINT + '/rutas/clientes/select/'
    },
    historicalShiftAssignment: {
      general: ENDPOINT + '/rutas/historico/',
      details: ENDPOINT + '/rutas/historico/{id}/details/',
      apertures: ENDPOINT + '/rutas/enturnamiento/{id}/departure/',
      observationDepartures: ENDPOINT + '/rutas/enturnamiento/{id}/departure/{departure}/',
      aperturesDetails: ENDPOINT + '/rutas/enturnamiento/{departure}/departure/{id}/details/',
      choices: ENDPOINT + '/rutas/historico/choices/',
      reset: ENDPOINT + '/rutas/historico/reiniciar/'
    },
    workday: {
      general: ENDPOINT + '/rutas/workday/',
      details: ENDPOINT + '/rutas/workday/{id}/details/',
      finish: ENDPOINT + '/rutas/workday/completefinish/',
      download: ENDPOINT + '/rutas/workday/download/',
      recalculate: ENDPOINT + '/rutas/workday/recalculate/',
      config: {
        general: ENDPOINT + "/rutas/workday/settings/",
        instance: ENDPOINT + '/rutas/workday/settings/{id}/',
        bulk_delete: ENDPOINT + '/rutas/workday/settings/bulk_destroy/',
      },
      observation: {
        general: ENDPOINT + '/rutas/workday/{id}/observation/',
      },
      enturnamiento: {
        select: ENDPOINT + "/rutas/enturnamiento/select/"
      },
      novelty: {
        select: ENDPOINT + '/rutas/workday/manualevents/',
        actores: ENDPOINT + '/rutas/enturnamiento/{id}/actores/',
        cambiarActor: ENDPOINT + '/rutas/workday/{id}/changeactor/',
        finalizacionManual: ENDPOINT + '/rutas/workday/{id}/manualfinish/',

      }
    },
    shiftAssignment: {
      general: ENDPOINT + '/rutas/enturnamiento/',
      download: ENDPOINT + '/rutas/enturnamiento/download/',
      choices: ENDPOINT + '/rutas/enturnamiento/choices/',
      instance: ENDPOINT + '/rutas/enturnamiento/{id}/',
      details: ENDPOINT + '/rutas/enturnamiento/{id}/details/',
      alarms: ENDPOINT + '/rutas/enturnamiento/{id}/alarmas/',
      pausar: ENDPOINT + '/rutas/enturnamiento/{id}/pausar/',
      reiniciar: ENDPOINT + '/rutas/enturnamiento/{id}/reiniciar/',
      observation: {
        general: ENDPOINT + '/rutas/enturnamiento/{id}/observacion/',
      },
      controlZone: {
        select: ENDPOINT + '/rutas/enturnamiento/{id}/zonacontrol/select/',
        features: ENDPOINT + '/rutas/enturnamiento/{id}/zonacontrol/features/',
        instance: ENDPOINT + '/rutas/enturnamiento/{id}/zonacontrol/{controlZoneId}/'
      },
      finish: ENDPOINT + '/rutas/enturnamiento/finalizar/',
    },
    novelty: {
      general: ENDPOINT + '/rutas/novedad/',
      select: ENDPOINT + '/rutas/novedad/select/',
      instance: ENDPOINT + '/rutas/novedad/{id}/',
      bulk_delete: ENDPOINT + '/rutas/novedad/bulk_destroy/',
    }
  },
  email: {
    validate: ENDPOINT + '/correos/validar/{uuid}/{token}'
  },
  tasks: {
    general: ENDPOINT + '/tareas/'
  },
  password: {
    recover: ENDPOINT + '/autenticacion/recuperar-contrasena/',
    validate: ENDPOINT + '/autenticacion/recuperar-contrasena/{uuid}/validar/{token}/',
    change: ENDPOINT + '/autenticacion/recuperar-contrasena/{uuid}/cambiar/{token}/'
  },
  road_actor: {
    general: ENDPOINT + '/actorvial/',
    instance: ENDPOINT + '/actorvial/{id}/',
    details: ENDPOINT + '/actorvial/{id}/details/',
    select: ENDPOINT + '/actorvial/select/',
    choices: ENDPOINT + '/actorvial/choices/',
    download: ENDPOINT + '/actorvial/download/',
    bulk_delete: ENDPOINT + '/actorvial/bulk_destroy/',
    tickets: {
      general: ENDPOINT + '/actorvial/comparendos/',
      instance: ENDPOINT + '/actorvial/comparendos/{id}/',
      bulk_delete: ENDPOINT + '/actorvial/comparendos/bulk_destroy/',
      select: ENDPOINT + '/actorvial/comparendos/select/'
    }
  },
  users: {
    resendValidateMail: ENDPOINT + '/usuarios/resend-verification-mail/'
  },
  notifications: {
    tracking: {
      general: ENDPOINT + "/notifications/tracking/",
      instance: ENDPOINT + '/notifications/tracking/{id}/',
      bulk_delete: ENDPOINT + '/notifications/tracking/bulk_destroy/'
    },
    ecu: {
      general: ENDPOINT + "/notifications/ecu/",
      instance: ENDPOINT + '/notifications/ecu/{id}/',
      bulk_delete: ENDPOINT + '/notifications/ecu/bulk_destroy/'
    }
  },
  ecuAlarm: {
    general: ENDPOINT + "/notifications/ecu-alarms/",
    instance: ENDPOINT + '/notifications/ecu-alarms/{id}/',
    download: ENDPOINT + '/notifications/ecu-alarms/download/',
    history: ENDPOINT + '/notifications/ecu-alarms/{id}/history/',
    choices: ENDPOINT + '//notifications/ecu-alarms/choices/'
  },
  messaging: {
    general: ENDPOINT + "/messaging/",
    instance: ENDPOINT + '/messaging/{id}/',
    download: ENDPOINT + '/messaging/download/'
  },
  assetEfficiency:{
    general:ENDPOINT + '/zonascontrol/permanence/efficiency/',
    latest: ENDPOINT + '/zonascontrol/permanence/{id}/timeline/'
  }
};


