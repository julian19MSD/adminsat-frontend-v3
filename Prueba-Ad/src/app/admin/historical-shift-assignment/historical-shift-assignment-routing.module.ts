import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HasPermissionsGuard} from '@core/services/guards/has-permissions.guard';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {ListHeaderComponent} from '@admin/container/list-header/list-header.component';
import {HistoricalShiftAssignmentContainer} from '@admin/historical-shift-assignment/container/historical-shift-assignment.container';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.rutas.enturnamientos.ver],
    },
    children: [
      {path: '', component: HistoricalShiftAssignmentContainer},
      {path: '', component: ListHeaderComponent, outlet: 'header'},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricalShiftAssignmentRoutingModule {
}
