import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HasPermissionsGuard} from '@core/services/guards/has-permissions.guard';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {InstallationsControlContainer} from '@admin/installations-control/container/installations-control.container';
import {ListHeaderComponent} from '@admin/container/list-header/list-header.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.zonasControl.ver]
    },
    children: [
      {path: '', component: InstallationsControlContainer},
      {path: '', component: ListHeaderComponent, outlet: 'header'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallationsControlRoutingModule {
}
