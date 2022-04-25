import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauExcesoVelocidadRoutingModule } from './tableau-exceso-velocidad-routing.module';
import { TableauExcesoVelocidadComponent } from './tableau-exceso-velocidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { TableauExcesoVelocidadHttpService} from './services/http.service'


@NgModule({
  declarations: [TableauExcesoVelocidadComponent],
  providers:[
    TableauExcesoVelocidadHttpService
  ],
  imports: [
    CommonModule,
    TableauExcesoVelocidadRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class TableauExcesoVelocidadModule { }
