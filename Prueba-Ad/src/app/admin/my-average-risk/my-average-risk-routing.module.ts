import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyAverageRiskComponent} from './my-average-risk.component';
import {HasPermissionsGuard} from '@core/services/guards/has-permissions.guard';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {FormHeaderComponent} from '@admin/container/form-header/form-header.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {permissions: [PERMISSIONS.llegandoACero.verAnalisisConductor]},
    children: [
      {path: '', component: MyAverageRiskComponent},
      {path: '', component: FormHeaderComponent, outlet: 'header'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAverageRiskRoutingModule {
}
