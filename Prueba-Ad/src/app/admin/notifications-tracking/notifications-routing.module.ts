import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { NotificationCreateComponent } from './form/form.component';
import { NotificationListContainer } from './list/container/list.container';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.notificaciones.ver],
      verifyClient: true,
    },
    children: [
      { path: '', component: NotificationListContainer },
      { path: '', component: ListHeaderComponent, outlet: 'header' },
    ],
  },
  {
    path: 'form',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.notificaciones.crear],
    },
    children: [
      { path: '', component: NotificationCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  },
  {
    path: 'form/:id',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.notificaciones.editar],
    },
    children: [
      { path: '', component: NotificationCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
