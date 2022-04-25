import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { WorkdayConfigCreateComponent } from './form/form.component';
import { WorkdayConfigListContainer } from './list/container/list.container';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.rutas.jornadaLaboral.ver],
    },
    children: [
      { path: '', component: WorkdayConfigListContainer },
      { path: '', component: ListHeaderComponent, outlet: 'header' },
    ],
  },
  {
    path: 'form',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.activos.crear],
    },
    children: [
      { path: '', component: WorkdayConfigCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  },
  {
    path: 'form/:id',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.activos.editar],
    },
    children: [
      { path: '', component: WorkdayConfigCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkdayConfigRoutingModule { }
