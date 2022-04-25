import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksContainer} from '@admin/tasks/container/tasks.container';
import {TasksHeaderComponent} from '@admin/tasks/header/header.component';


const routes: Routes = [
  {path: '', component: TasksContainer},
  {path: '', component: TasksHeaderComponent, outlet: 'header'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
