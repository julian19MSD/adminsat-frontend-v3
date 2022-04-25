import {PERMISSIONS} from '@shared/consts/permissions.consts';

export const NAVMENU = [
  {
    id: 'dashboard',
    menu: 'SIDENAV_MENU.DASHBOARD',
    icon: 'home',
    custom_icon: false,
    url: '/dashboard',
    isOpen: false,
    permission: null,
    submenu: null
  },
  // {
  //   id: 'tableau',
  //   menu: 'Tableau',
  //   icon: 'analytics',
  //   custom_icon: false,
  //   href: true,
  //   url: 'https://tableau.adminsat.com/',
  //   isOpen: false,
  //   permission: null,
  //   submenu: null
  // },
  {
    id: 'tableau',
    menu: 'Tableau',
    icon: 'analytics',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.TABLEAU.TOTAL_FLEET',
        url: 'total-fleet',
        permission: PERMISSIONS.tableau.flota_total
      },
      {
        name: 'SIDENAV_MENU.TABLEAU.SPEEDING',
        url: 'speeding',
        permission: PERMISSIONS.tableau.excesosVelocidad
      },
      {
        name: 'SIDENAV_MENU.TABLEAU.SPEED_ANALYSIS',
        url: 'speed-analysis',
        permission: PERMISSIONS.tableau.analisisVelocidad
      },
      {
        name: 'SIDENAV_MENU.TABLEAU.SHIFT_ASSIGNMENT',
        url: 'shift-assignment',
        permission: PERMISSIONS.tableau.enturnamiento
      },
      {
        name: 'SIDENAV_MENU.TABLEAU.WORKDAY',
        url: 'workday',
        permission: PERMISSIONS.tableau.jornadaLaboral
      },      
      {
        name: 'SIDENAV_MENU.TABLEAU.MOTOR_TIME',
        url: 'motor-time',
        permission: PERMISSIONS.tableau.tiempo_motor
      },
      {
        name: 'SIDENAV_MENU.TABLEAU.TPMS',
        url: 'tpms',
        permission: PERMISSIONS.tableau.tpms
      },
    ]
  },
 
  {
    id: 'monitoring',
    menu: 'SIDENAV_MENU.MONITORING.MONITORING',
    icon: 'place',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.MONITORING.TRACKING',
        url: 'tracking',
        permission: PERMISSIONS.usuarios.seguimiento
      },
      {
        name: 'SIDENAV_MENU.MONITORING.REPORTS',
        url: 'reports',
        href: true,
        permission: PERMISSIONS.usuarios.informes
      },
      {
        name: 'SIDENAV_MENU.MONITORING.REPORTSV2',
        url: 'reportsV2',
        permission: PERMISSIONS.usuarios.informes
      },
      {
        name: 'SIDENAV_MENU.MONITORING.MESSAGING',
        url: 'messaging',
        permission: PERMISSIONS.mensajeria.ver
      }
    ]
  },
  {
    id: 'routes',
    menu: 'SIDENAV_MENU.ROUTES.ROUTES',
    icon: 'directions',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.ROUTES.ROUTES',
        url: '',
        href: true,
        permission: PERMISSIONS.rutas.observaciones.ver
      },
      {
        name: 'SIDENAV_MENU.ROUTES.SHIFT_ASSIGNMENT',
        url: 'shift-assignment',
        permission: PERMISSIONS.rutas.enturnamientos.ver
      },
      {
        name: 'SIDENAV_MENU.ROUTES.WORKDAY',
        url: 'workday',
        permission: PERMISSIONS.rutas.jornadaLaboral.ver
      },
      {
        name: 'SIDENAV_MENU.ROUTES.WORKDAY_SETTING',
        url: 'workday-config',
        permission: PERMISSIONS.rutas.jornadaLaboral.ver
      },
      {
        name: 'SIDENAV_MENU.ROUTES.HISTORICAL',
        url: 'shift-historical',
        permission: PERMISSIONS.rutas.enturnamientos.ver
      },
      {
        name: 'SIDENAV_MENU.ROUTES.STATES',
        url: 'state',
        href: true,
        permission: PERMISSIONS.rutas.estados.ver
      },
      {
        name: 'SIDENAV_MENU.ROUTES.CONTROL_ROUTES',
        url: 'route-control',
        href: true,
        permission: PERMISSIONS.rutas.observaciones.crear
      },
      {
        name: 'SIDENAV_MENU.ROUTES.NOVELTYS',
        url: 'noveltys',
        permission: PERMISSIONS.rutas.novedades.ver
      },
      {
        name: 'SIDENAV_MENU.ROUTES.CLIENTS',
        url: 'clients',
        href: true,
        permission: PERMISSIONS.rutas.clientes.ver
      }
    ]
  },
  {
    id: 'gettze',
    menu: 'SIDENAV_MENU.GETTING_TO_ZERO.GETTING_TO_ZERO',
    icon: 'icon-gettze',
    custom_icon: true,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.GETTING_TO_ZERO.MY_RISK',
        url: 'my-risk',
        href: true,
        permission: PERMISSIONS.llegandoACero.verMiRiesgo
      },
      {
        name: 'SIDENAV_MENU.GETTING_TO_ZERO.RISK_EVENTS',
        url: 'events',
        href: true,
        permission: PERMISSIONS.llegandoACero.verEventosRiesgo
      },
      {
        name: 'SIDENAV_MENU.GETTING_TO_ZERO.EVENTS_COUNTER',
        url: 'events-counter',
        href: true,
        permission: PERMISSIONS.actorVial.verEventosRiesgo
      },
      {
        name: 'SIDENAV_MENU.GETTING_TO_ZERO.ANALYSIS_PER_DRIVER',
        url: 'analysis',
        href: true,
        permission: PERMISSIONS.llegandoACero.verAnalisisConductor
      },
      {
        name: 'SIDENAV_MENU.GETTING_TO_ZERO.MY_AVG_RISK',
        url: 'my-average-risk',
        permission: PERMISSIONS.llegandoACero.verAnalisisConductor
      },
      {
        name: 'SIDENAV_MENU.GETTING_TO_ZERO.PARAMETERS',
        url: 'parameters',
        href: true,
        permission: PERMISSIONS.llegandoACero.parametros.ver
      }
    ]
  },
  {
    id: 'pesv',
    menu: 'SIDENAV_MENU.PESV.PESV',
    icon: 'icon-road',
    custom_icon: true,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.PESV.DOCUMENT_MANAGEMENT',
        url: 'archive',
        href: true,
        permission: PERMISSIONS.pesv.verGestionDocumental
      },
      {
        name: 'SIDENAV_MENU.PESV.INSPECTION_BEFORE_LAUNCH',
        url: 'inspection-create',
        href: true,
        permission: PERMISSIONS.pesv.inspeccion.crear
      },
      {
        name: 'SIDENAV_MENU.PESV.CONSULT_INSPECTIONS',
        url: 'inspection-report',
        href: true,
        permission: PERMISSIONS.pesv.inspeccion.ver
      },
      {
        name: 'SIDENAV_MENU.PESV.TESTS',
        url: 'test',
        href: true,
        permission: PERMISSIONS.pesv.prueba.ver
      },
      {
        name: 'SIDENAV_MENU.PESV.TRAININGS',
        url: 'training',
        href: true,
        permission: PERMISSIONS.pesv.capacitacion.ver
      },
      {
        name: 'SIDENAV_MENU.PESV.ESTADISTICS_BY_ACTOR',
        url: 'estadistics-actor',
        href: true,
        permission: PERMISSIONS.pesv.verInformeActor
      },
      {
        name: 'SIDENAV_MENU.PESV.GLOBAL_ESTADISTICS',
        url: 'estadistics',
        href: true,
        permission: PERMISSIONS.pesv.verInformeGeneral
      }
    ]
  },
  {
    id: 'assets',
    menu: 'SIDENAV_MENU.ASSETS.ASSETS',
    icon: 'directions_car',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.ASSETS.ASSETS',
        url: '',
        permission: PERMISSIONS.activos.ver
      },
      {
        name: 'SIDENAV_MENU.ASSETS.GROUPS',
        url: 'group',
        href: true,
        permission: PERMISSIONS.activos.grupos.ver
      }
    ]
  },
  {
    id: 'tpms',
    menu: 'SIDENAV_MENU.TPMS.TPMS',
    icon: 'icon-tpms',
    custom_icon: true,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.TPMS.REFERENCES',
        url: '',
        permission: PERMISSIONS.tpms.ver
      }
    ]
  },
  {
    id: 'machinery',
    menu: 'SIDENAV_MENU.MACHINERY.MACHINERY',
    icon: 'icon-retro',
    custom_icon: true,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.MACHINERY.REPORTS',
        url: 'reports',
        href: true,
        permission: PERMISSIONS.maquinaria.ver
      },
      {
        name: 'SIDENAV_MENU.MACHINERY.SUPERVISORS',
        url: 'supervisors',
        href: true,
        permission: PERMISSIONS.maquinaria.supervisor.ver
      },
    ]
  },
  {
    id: 'notifications',
    menu: 'SIDENAV_MENU.NOTIFICATIONS.NOTIFICATIONS',
    icon: 'warning',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: PERMISSIONS.notificaciones.ver,
    submenu: [
      {
        name: 'SIDENAV_MENU.NOTIFICATIONS.TRACKING',
        url: 'tracking',
        permission: PERMISSIONS.notificaciones.ver
      },
      {
        name: 'SIDENAV_MENU.NOTIFICATIONS.ECU',
        url: 'ecu',
        permission: PERMISSIONS.notificaciones.ver
      }      
    ]
  },
  {
    id: 'control-installations',
    menu: 'SIDENAV_MENU.CONTROL_INSTALLATIONS.CONTROL_INSTALLATIONS',
    icon: 'icon-polygon-1',
    custom_icon: true,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.CONTROL_INSTALLATIONS.CONTROLZONES',
        url: 'installations-control',
        permission: PERMISSIONS.zonasControl.ver
      },
      {
        name: 'SIDENAV_MENU.CONTROL_INSTALLATIONS.ZONES',
        url: 'zones',
        permission: PERMISSIONS.zones.ver
      },
      {
        name: 'SIDENAV_MENU.CONTROL_INSTALLATIONS.INSTALLATIONS',
        url: 'installations',
        permission: PERMISSIONS.instalacion.ver
      },
      {

        name: 'SIDENAV_MENU.EFFICIENCY.MY_FLEET',
        url: 'my-fleet',
        permission: PERMISSIONS.miFlota.ver
      },
      {

        name: 'SIDENAV_MENU.EFFICIENCY.PERMANENCE',
        url: 'permanence',
        permission:PERMISSIONS.miFlota.ver
      },
      {

        name: 'SIDENAV_MENU.EFFICIENCY.ASSET_EFFICIENCY',
        url: 'asset-efficiency',
        permission:PERMISSIONS.miFlota.ver
      }
    ]
  },
  {
    id: 'operation',
    menu: 'SIDENAV_MENU.OPERATION.OPERATION',
    icon: 'work',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.OPERATION.FUEC',
        url: 'fuec',
        href: true,
        permission: PERMISSIONS.fuec.ver
      },
      {
        name: 'SIDENAV_MENU.OPERATION.CONTROLZONES',
        url: 'control-zone',
        href: true,
        permission: PERMISSIONS.zonasControl.ver
      },
      {
        name: 'SIDENAV_MENU.OPERATION.SENSORS',
        url: 'sensors',
        href: true,
        permission: PERMISSIONS.sensores.ver
      },
      {
        name: 'SIDENAV_MENU.OPERATION.ECU_ALARMS',
        url: 'ecu-alarm',
        permission: PERMISSIONS.EcuAlarma.ver
      },
      {
        name: 'SIDENAV_MENU.OPERATION.ACTORS_ROADS',
        url: 'actor-road',
        permission: PERMISSIONS.actorVial.ver
      },
      {
        name: 'SIDENAV_MENU.OPERATION.COMMANDS',
        url: 'send-command',
        permission: PERMISSIONS.referencias.enviarComando
      },      
    ]
  },

  {
    id: 'admin',
    menu: 'SIDENAV_MENU.ADMINISTRATION.ADMINISTRATION',
    icon: 'settings',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.ADMINISTRATION.CLIENTS',
        url: 'client',
        href: true,
        permission: PERMISSIONS.clientes.ver
      },
      // {
      //   name: 'SIDENAV_MENU.ADMINISTRATION.NOTIFICATIONS',
      //   url: 'notification',
      //   permission: PERMISSIONS.notificaciones.ver
      // },
      {
        name: 'SIDENAV_MENU.ADMINISTRATION.DEVICES',
        url: 'device',
        href: true,
        permission: PERMISSIONS.equipos.ver
      },
      {
        name: 'SIDENAV_MENU.ADMINISTRATION.GROUP_PERMISSIONS',
        url: 'group-permission',
        href: true,
        permission: PERMISSIONS.usuarios.verPermisosGrupos
      },
      {
        name: 'SIDENAV_MENU.ADMINISTRATION.USERS',
        url: 'user',
        href: true,
        permission: PERMISSIONS.usuarios.ver
      }
    ]
  },
  {
    id: 'procedure',
    menu: 'SIDENAV_MENU.PROCEDURES.PROCEDURES',
    icon: 'playlist_add_check',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.PROCEDURES.PROCEDURES',
        url: 'procedure',
        href: true,
        permission: PERMISSIONS.tramites.ver
      },
      {
        name: 'SIDENAV_MENU.PROCEDURES.TYPES',
        url: 'type',
        href: true,
        permission: PERMISSIONS.tramites.tipos.ver
      }
    ]
  },
  {
    id: 'points_of_interest',
    menu: 'SIDENAV_MENU.POINTS_OF_INTEREST.POINTS_OF_INTEREST',
    icon: 'near_me',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.POINTS_OF_INTEREST.POINTS_OF_INTEREST',
        url: 'points-of-interest',
        href: true,
        permission: PERMISSIONS.puntosInteres.ver
      }
    ]
  },
  {
    id: 'maintenance',
    menu: 'SIDENAV_MENU.MAINTENANCE.MAINTENANCE',
    icon: 'build',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.MAINTENANCE.MAINTENANCE',
        url: '',
        href: true,
        permission: PERMISSIONS.mantenimiento.ver
      },
      {
        name: 'SIDENAV_MENU.MAINTENANCE.HISTORICAL',
        url: '',
        href: true,
        permission: PERMISSIONS.mantenimiento.verHisotrico
      },
      {
        name: 'SIDENAV_MENU.MAINTENANCE.PROVIDERS',
        url: 'provider',
        href: true,
        permission: PERMISSIONS.mantenimiento.proveedores.ver
      }
    ]
  },
  {
    id: 'audit',
    menu: 'SIDENAV_MENU.AUDIT.AUDIT',
    icon: 'fingerprint',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: null,
    submenu: [
      {
        name: 'SIDENAV_MENU.AUDIT.USER_MOVEMENTS',
        url: 'user',
        href: true,
        permission: PERMISSIONS.auditoria.verLogPlataforma
      },      
      {
        name: 'SIDENAV_MENU.AUDIT.SENDED_COMMANDS',
        url: 'command',
        href: true,
        permission: PERMISSIONS.auditoria.verLogComandos
      },
      {
        name: 'SIDENAV_MENU.AUDIT.SENDED_COMMANDS_V2',
        url: 'command',
        permission: PERMISSIONS.auditoria.verLogComandos
      },
      {
        name: 'SIDENAV_MENU.AUDIT.ALARM_HISTORY',
        url: 'alarm',
        href: true,
        permission: PERMISSIONS.alarmas.ver
      },
      {
        name: 'SIDENAV_MENU.AUDIT.CONNECTIONS_LOG',
        url: 'connections',
        href: true,
        permission: PERMISSIONS.usuarios.verLogConexiones
      }
    ]
  },
  {
    id: 'references',
    menu: 'SIDENAV_MENU.REFERENCE_TABLES.REFERENCE_TABLES',
    icon: 'bookmark',
    custom_icon: false,
    url: null,
    isOpen: false,
    permission: PERMISSIONS.usuarios.verReferencias,
    submenu: [
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.SOCIAL_BENEFITS',
        url: 'social-benefits',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.EVENTS_CODE',
        url: 'event-code',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.COMMAND_NAMES',
        url: 'command-name',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.DEVICE_COMMANDS',
        url: 'device-command',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.EVENTS',
        url: 'event',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.ICONS',
        url: 'icon',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.POINTS_OF_INTEREST_ICONS',
        url: 'icon-points-of-interest',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.NETWORK_OPERATORS',
        url: 'network-operator',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.MAINTENANCE_ITEMS',
        url: 'maintenance-cardItem',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.UNITS_MEASURE',
        url: 'units-measure',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.TYPE_ACTOR',
        url: 'type-actor',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.TYPE_DOCUMENT',
        url: 'type-document',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.TYPE_DEVICES',
        url: 'type-device',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.TYPES_VEHICLE',
        url: 'type-vehicle',
        href: true,
        permission: null
      },
      {
        name: 'SIDENAV_MENU.REFERENCE_TABLES.INPUT_TYPES',
        url: 'type-sensor',
        href: true,
        permission: null
      }
    ]
  }
];


