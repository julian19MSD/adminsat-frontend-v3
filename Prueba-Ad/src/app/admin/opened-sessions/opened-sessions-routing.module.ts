import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OpenedSessionsListContainer} from './containers/opened-sessions.container';
import {OpenedSessionsHeaderComponent} from './header/header.component';

const routes: Routes = [
  {path: '', component: OpenedSessionsListContainer},
  {path: '', component: OpenedSessionsHeaderComponent, outlet: 'header'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenedSessionsRoutingModule {
}
