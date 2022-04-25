import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HasPermissionsGuard} from '@core/services/guards/has-permissions.guard';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {TrackingContainer} from '@admin/tracking/container/tracking.container';
import {ListHeaderComponent} from '@admin/container/list-header/list-header.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.usuarios.seguimiento]
    },
    children: [
      {path: '', component: TrackingContainer},
      {path: '', component: ListHeaderComponent, outlet: 'header'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule {
}
