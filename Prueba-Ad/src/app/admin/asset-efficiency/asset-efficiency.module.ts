import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetEfficiencyRoutingModule } from './asset-efficiency-routing.module';
import { AssetEfficiencyComponent } from './asset-efficiency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { AssetEfficiencyHttpService} from './services/http.service'
import { AnalysisEfficiencyComponent } from './efficiency-analysis/efficiency-analysis.component';
// import { EcuModule } from './consults/ecu/ecu.module';

@NgModule({
  declarations: [
    AnalysisEfficiencyComponent,
    AssetEfficiencyComponent],
  providers:[
    AssetEfficiencyHttpService
  ],
  imports: [
    CommonModule,
    FormsModule,
    AssetEfficiencyRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class AssetEfficiencyModule { }
