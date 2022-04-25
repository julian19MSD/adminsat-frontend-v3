import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyFleetContainer} from './container/my-fleet.container';
import {MyFleetHeaderComponent} from './header/header.component';

const routes: Routes = [
  {path: '', component: MyFleetContainer},
  {path: '', component: MyFleetHeaderComponent, outlet: 'header'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFleetRoutingModule {
}
