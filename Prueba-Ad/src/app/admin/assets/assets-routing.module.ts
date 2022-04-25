import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsListContainer } from './list/container/list.container';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { AssetCreateComponent } from './form/form.component';
import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';

const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.activos.ver],
    },
    children: [
      { path: '', component: AssetsListContainer },
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
      { path: '', component: AssetCreateComponent },
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
      { path: '', component: AssetCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsRoutingModule {}
