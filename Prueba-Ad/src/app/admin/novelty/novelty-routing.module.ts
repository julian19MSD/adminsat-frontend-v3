import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HasPermissionsGuard} from '@core/services/guards/has-permissions.guard';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {NoveltyListContainer} from '@admin/novelty/list/container/list.container';
import {ListHeaderComponent} from '@admin/container/list-header/list-header.component';
import {FormHeaderComponent} from '@admin/container/form-header/form-header.component';
import {NoveltyCreateComponent} from '@admin/novelty/form/form.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [HasPermissionsGuard],
    data: {permissions: [PERMISSIONS.rutas.novedades.ver]},
    children: [
      {path: '', component: NoveltyListContainer},
      {path: '', component: ListHeaderComponent, outlet: 'header'},
    ]
  },
  {
    path: 'form',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.rutas.novedades.crear],
    },
    children: [
      {path: '', component: NoveltyCreateComponent},
      {path: '', component: FormHeaderComponent, outlet: 'header'},
    ],
  },
  {
    path: 'form/:id',
    canActivate: [HasPermissionsGuard],
    data: {
      permissions: [PERMISSIONS.rutas.novedades.editar],
    },
    children: [
      {path: '', component: NoveltyCreateComponent},
      {path: '', component: FormHeaderComponent, outlet: 'header'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoveltyRoutingModule {
}
