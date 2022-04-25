import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { PermanenceContainerComponent } from './list/container/list.container';

const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {permissions: [PERMISSIONS.miFlota.ver]},
    children: [
      {path: '', component: PermanenceContainerComponent},
      {path: '', component: ListHeaderComponent, outlet: 'header'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermanenceRoutingModule { }
