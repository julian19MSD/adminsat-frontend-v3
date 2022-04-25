import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {FormHeaderComponent} from '@admin/container/form-header/form-header.component';

const routes: Routes = [
  {path: '', component: ProfileComponent},
  {path: '', component: FormHeaderComponent, outlet: 'header'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
