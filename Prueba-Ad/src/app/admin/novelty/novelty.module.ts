import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NoveltyRoutingModule} from './novelty-routing.module';
import {NoveltyFilterComponent} from '@admin/novelty/list/filter/filter.component';
import {NoveltySortComponent} from '@admin/novelty/list/sort/sort.component';
import {NoveltyHttpService} from '@admin/novelty/services/http.service';
import {NoveltyListContainer} from '@admin/novelty/list/container/list.container';
import {SharedModule} from '@shared/shared.module';
import {NoveltyItemComponent} from './list/item/novelty-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NoveltyCreateComponent } from './form/form.component';


@NgModule({
  declarations: [
    NoveltyListContainer,
    NoveltyFilterComponent,
    NoveltySortComponent,
    NoveltyItemComponent,
    NoveltyCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoveltyRoutingModule,
    SharedModule
  ],
  providers: [
    NoveltyHttpService
  ]
})
export class NoveltyModule {
}
