import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { CommandsListContainer } from './list/container/list.container';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.auditoria.verLogComandos],
    },
    children: [
      { path: '', component: CommandsListContainer },
      { path: '', component: ListHeaderComponent, outlet: 'header' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandsRoutingModule { }
