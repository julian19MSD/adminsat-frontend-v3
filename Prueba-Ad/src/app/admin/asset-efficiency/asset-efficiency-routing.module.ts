import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';
import { AssetEfficiencyComponent } from './asset-efficiency.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {permissions: [PERMISSIONS.usuarios.informes]},
    children: [
      {path: '', component: AssetEfficiencyComponent},
      {path: '', component: FormHeaderComponent, outlet: 'header'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetEfficiencyRoutingModule { }
