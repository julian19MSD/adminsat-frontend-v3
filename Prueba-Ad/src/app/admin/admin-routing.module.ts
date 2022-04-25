import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminContainer} from '@admin/container/admin.container';
import {HasPermissionsGuard} from '@core/services/guards/has-permissions.guard';
import {PERMISSIONS} from '@shared/consts/permissions.consts';

const routes: Routes = [
  {
    path: '',
    component: AdminContainer,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        data: {
          preload: true,
        },
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile/profile.module').then((m) => m.ProfileModule),
          },
          {
            path: 'sessions',
            loadChildren: () =>
              import('./opened-sessions/opened-sessions.module').then(
                (m) => m.OpenedSessionsModule
              ),
          },
          {
            path: 'change-password',
            loadChildren: () =>
              import('./change-password/change-password.module').then(
                (m) => m.ChangePasswordModule
              ),
          },
        ],
      },
      {
        path: 'alarms',
        data: {
          permissions: [PERMISSIONS.alarmas.ver],
        },
        canActivate: [HasPermissionsGuard],
        loadChildren: () =>
          import('./alarms/alarms.module').then((m) => m.AlarmsModule),
      },
      {
        path: 'assets',
        children: [
          {
            path: '',
            data: {

            },
            loadChildren: () =>
              import('./assets/assets.module').then((m) => m.AssetsModule),
          },
          {
            path: 'assets-group',
            loadChildren: () =>
              import('./assets-group/assets-Groups.module').then((m) => m.AssetsGroupModule),
          },
        ],
      },
      {
        path: 'tpms',
        children: [
          {
            path: '',
            data: {
              preload: true,
            },
            loadChildren: () =>
              import('./tpms/tpms.module').then((m) => m.TpmsModule),
          },
        ],
      },
      {
        path: 'tableau',
        children: [
          {
            path: 'motor-time',

            loadChildren: () => import('./tableau-tiempo-motor/tableau-tiempo-motor.module').then(m => m.TableauTiempoMotorModule)
          },
          {
            path: 'total-fleet',

            loadChildren: () => import('./tableau-flota-total/tableau-flota-total.module').then(m => m.TableauFlotaTotalModule)
          },
          {
            path: 'shift-assignment',

            loadChildren: () => import('./tableau-enturnamiento/tableau-enturnamiento.module').then(m => m.TableauEnturnamientoModule)
          },
          {
            path: 'speeding',

            loadChildren: () => import('./tableau-exceso-velocidad/tableau-exceso-velocidad.module').then(m => m.TableauExcesoVelocidadModule)
          },
          {
            path: 'speed-analysis',

            loadChildren: () => import('./tableau-analisis-velocidad/tableau-analisis-velocidad.module').then(m => m.TableauAnalisisVelocidadModule)
          },
          {
            path: 'workday',

            loadChildren: () => import('./tableau-jornada-laboral/tableau-jornada-laboral.module').then(m => m.TableauJornadaLaboralModule)
          },
          {
            path: 'tpms',

            loadChildren: () => import('./tableau-tpms/tableau-tpms.module').then(m => m.TableauTPMSModule)
          },
        ]
      },
      {
        path: 'monitoring',
        children: [
          {
            path: 'tracking',
            data: {
              preload: true
            },
            loadChildren: () => import('./tracking/tracking.module').then(m => m.TrackingModule)
          },
          {
            path: 'reportsV2',
            data: {
              preload: true
            },
            loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
          },
          {
            path: 'messaging',           
            loadChildren: () => import('./messaging/messaging.module').then(m => m.MessagingModule)
          }
        ]
      },
      {
        path: 'control-installations',
        children: [
          {
            path: 'installations-control',            
            loadChildren: () => import('./installations-control/installations-control.module').then(m => m.InstallationsControlModule)
          },
          {
            path: 'zones',            
            loadChildren: () => import('./zones/zones.module').then(m => m.ZonesModule)
          },
          {
            path: 'installations',            
            loadChildren: () => import('./installations/installations.module').then(m => m.InstallationsModule)
          },
          {
            path: 'my-fleet',
            loadChildren: () =>
              import('./my-fleet/my-fleet.module').then((m) => m.MyFleetModule),
          },
          {
            path: 'permanence',
            loadChildren: () =>
              import('./permanence/permanence.module').then((m) => m.PermanenceModule),
          },
          {
            path: 'asset-efficiency',
            loadChildren: () =>
              import('./asset-efficiency/asset-efficiency.module').then((m) => m.AssetEfficiencyModule),
          },
        ]
      },
      {
        path: 'operation',
        children: [
          {
            path: 'send-command',
            data: {
              preload: true
            },
            loadChildren: () => import('./send-commands/send-commands.module').then(m => m.SendCommandsModule)
          },
          {
            path: 'ecu-alarm',            
            loadChildren: () => import('./ecu-alarm/ecu-alert.module').then(m => m.EcuAlarmModule)
          }
         
        ]
      },
      {
        path: 'routes',
        children: [
          {
            path: 'shift-historical',
            loadChildren: () => import('./historical-shift-assignment/historical-shift-assignment.module').then(m => m.HistoricalShiftAssignmentModule)
          },
          {
            path: 'shift-assignment',
            children: [
              {
                path: '',
                data: {
                  preload: true,
                },
                loadChildren: () => import('./shift-assignment/shift-assignment.module').then(m => m.ShiftAssignmentModule)
              }
            ]
          },
          {
            path: 'workday',
            children: [
              {
                path: '',
                data: {
                  preload: true,
                },
                loadChildren: () => import('./workday/workday.module').then(m => m.WorkdayModule)
              }
            ]
          },
          {
            path: 'workday-config',
            children: [
              {
                path: '',
                data: {
                  preload: true

                },
                loadChildren: () => import('./workday-config/workday-config.module').then(m => m.WorkdayConfigModule)
              }
            ]
          },
          {
            path: 'noveltys',
            children: [
              {
                path: '',
                loadChildren: () => import('./novelty/novelty.module').then(m => m.NoveltyModule)
              },
            ]
          }
        ]
      },
      {
        path: 'audit',
        children: [
          {
            path: 'command',
            loadChildren: () => import('./audit-commands/commands.module').then(m => m.CommandsModule)
          }
        ]
      },
      {
        path: 'gettze',
        children: [
          {
            path: 'my-average-risk',
            loadChildren: () => import('./my-average-risk/my-average-risk.module').then(m => m.MyAverageRiskModule)
          }
        ]
      },
      {
        path: 'operation',
        children: [
          {
            path: 'actor-road',
            loadChildren: () => import('./actor-road/actor-road.module').then(m => m.ActorRoadModule)
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            
            path: 'tracking',
            loadChildren: () => import('./notifications-tracking/notifications.module').then(m => m.NotificationsModule)
          },
          {
            path: 'ecu',
            loadChildren: () => import('./notifications-ecu/notifications.module').then(m => m.ECUNotificationsModule)
          }
         
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
