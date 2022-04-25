import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { TpmsListContainer } from './list/container/list.container';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';
import { TpmsCreateComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.tpms.ver],
    },
    children: [
      { path: '', component: TpmsListContainer },
      { path: '', component: ListHeaderComponent, outlet: 'header' },
    ]
  },
  {
    path: 'form',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.tpms.crear],
    },
    children: [
      { path: '', component: TpmsCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  },
  {
    path: 'form/:id',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.tpms.editar],
    },
    children: [
      { path: '', component: TpmsCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TpmsRoutingModule { }
