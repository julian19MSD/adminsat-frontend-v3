import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardContainer} from './container/dashboard.container';
import {DashboardHeaderComponent} from './header/header.component';

const routes: Routes = [
  {path: '', component: DashboardContainer},
  {path: '', component: DashboardHeaderComponent, outlet: 'header'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
