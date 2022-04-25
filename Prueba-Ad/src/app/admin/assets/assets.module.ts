import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AssetsListContainer} from './list/container/list.container';
import {AssetSortComponent} from './list/sort/sort.component';
import {AssetFilterComponent} from './list/filter/filter.component';
import {AssetDocumentsHttpService, AssetHttpService} from '@admin/assets/services/http.service';
import {SharedModule} from '@shared/shared.module';
import {AssetItemComponent} from '@admin/assets/list/item/asset-item.component';
import {SharedAdminModule} from '@admin/shared/shared.module';
import {AssetsRoutingModule} from './assets-routing.module';
import {AssetCreateComponent} from './form/form.component';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {QuillModule} from 'ngx-quill';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from '@busacca/ng-pick-datetime';
import {AssetDocumentsCreateComponent} from '@admin/assets/documents/documents.component';

@NgModule({
  declarations: [
    AssetsListContainer,
    AssetSortComponent,
    AssetFilterComponent,
    AssetItemComponent,
    AssetCreateComponent,
    AssetDocumentsCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssetsRoutingModule,
    VirtualScrollerModule,
    QuillModule.forRoot(),
    SharedModule,
    SharedAdminModule,
  ],
  providers: [
    AssetHttpService,
    AssetDocumentsHttpService
  ],
})
export class AssetsModule {
}
