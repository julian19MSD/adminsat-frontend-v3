import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauJornadaLaboralRoutingModule } from './tableau-jornada-laboral-routing.module';
import { TableauJornadaLaboralComponent } from './tableau-jornada-laboral.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { TableauJornadaLaboralHttpService} from './services/http.service'


@NgModule({
  declarations: [TableauJornadaLaboralComponent],
  providers:[
    TableauJornadaLaboralHttpService
  ],
  imports: [
    CommonModule,
    TableauJornadaLaboralRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class TableauJornadaLaboralModule { }
