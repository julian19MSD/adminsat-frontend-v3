import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangePasswordComponent} from './change-password.component';
import {FormHeaderComponent} from '@admin/container/form-header/form-header.component';

const routes: Routes = [
  {path: '', component: FormHeaderComponent, outlet: 'header'},
  {path: '', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule {
}
