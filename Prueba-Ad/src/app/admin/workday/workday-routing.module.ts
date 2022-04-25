import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { WorkdayCreateComponent } from './form/form.component';
import { WorkdayContainerComponent } from './list/container/list.container';

const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {permissions: [PERMISSIONS.rutas.jornadaLaboral.ver]},
    children: [
      {path: '', component: WorkdayContainerComponent},
      {path: '', component: ListHeaderComponent, outlet: 'header'},
    ]
  },
  {
    path: 'form',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.rutas.jornadaLaboral.crear],
    },
    children: [
      {path: '', component: WorkdayCreateComponent},
      {path: '', component: FormHeaderComponent, outlet: 'header'},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkdayRoutingModule { }
