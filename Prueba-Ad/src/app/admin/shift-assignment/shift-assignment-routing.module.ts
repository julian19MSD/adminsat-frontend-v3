import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HasPermissionsGuard} from '@core/services/guards/has-permissions.guard';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {ListHeaderComponent} from '@admin/container/list-header/list-header.component';
import {ShiftAssignmentListContainer} from '@admin/shift-assignment/list/container/list.container';
import {FormHeaderComponent} from '@admin/container/form-header/form-header.component';
import {ShiftAssignmentCreateComponent} from '@admin/shift-assignment/form/form.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {permissions: [PERMISSIONS.rutas.enturnamientos.ver]},
    children: [
      {path: '', component: ShiftAssignmentListContainer},
      {path: '', component: ListHeaderComponent, outlet: 'header'},
    ]
  },
  {
    path: 'form',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.rutas.enturnamientos.crear],
    },
    children: [
      {path: '', component: ShiftAssignmentCreateComponent},
      {path: '', component: FormHeaderComponent, outlet: 'header'},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftAssignmentRoutingModule {
}
