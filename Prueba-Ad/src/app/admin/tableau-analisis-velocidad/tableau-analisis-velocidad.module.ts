import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauAnalisisVelocidadRoutingModule } from './tableau-analisis-velocidad-routing.module';
import { TableauAnalisisVelocidadComponent } from './tableau-analisis-velocidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';


@NgModule({
  declarations: [TableauAnalisisVelocidadComponent],
  providers:[
    
  ],
  imports: [
    CommonModule,
    TableauAnalisisVelocidadRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class TableauAnalisisVelocidadModule { }
