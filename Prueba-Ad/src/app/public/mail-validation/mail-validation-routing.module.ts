import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MailValidationComponent} from './mail-validation.component';

const routes: Routes = [
  {path: '', component: MailValidationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailValidationRoutingModule {
}
