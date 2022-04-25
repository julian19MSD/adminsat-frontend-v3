import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AlarmsContainer} from '@admin/alarms/container/alarms.container';
import {ListHeaderComponent} from '@admin/container/list-header/list-header.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AlarmsContainer
      },
      {path: '', component: ListHeaderComponent, outlet: 'header'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmsRoutingModule {
}
