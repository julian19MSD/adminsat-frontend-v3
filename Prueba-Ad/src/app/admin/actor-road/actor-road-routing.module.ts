import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasPermissionsGuard } from '@core/services/guards/has-permissions.guard';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { ListHeaderComponent } from '@admin/container/list-header/list-header.component';
import { ActorRoadListContainer } from './list/container/list.container';
import { ActorRoadCreateComponent } from './form/form.component';
import { FormHeaderComponent } from '@admin/container/form-header/form-header.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.actorVial.ver],
    },
    children: [
      { path: '', component: ActorRoadListContainer },
      { path: '', component: ListHeaderComponent, outlet: 'header' },
    ],
  },
  {
    path: 'form',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.actorVial.crear],
    },
    children: [
      { path: '', component: ActorRoadCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  },
  {
    path: 'form/:id',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.actorVial.editar],
    },
    children: [
      { path: '', component: ActorRoadCreateComponent },
      { path: '', component: FormHeaderComponent, outlet: 'header' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorRoadRoutingModule { }
