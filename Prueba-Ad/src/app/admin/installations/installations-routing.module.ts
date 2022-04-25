import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { InstallationsListContainer } from './list/container/list.container';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';
import { InstallationsCreateComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.zones.ver],
    },
    children: [
      { path: '', component: InstallationsListContainer },
      { path: '', component: ListHeaderComponent, outlet: 'header' },
    ]
  },
  {
    path: 'form',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.zones.crear],
    },
    children: [
      { path: '', component: InstallationsCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  },
  {
    path: 'form/:id',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.zones.editar],
    },
    children: [
      { path: '', component: InstallationsCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallationsRoutingModule { }
