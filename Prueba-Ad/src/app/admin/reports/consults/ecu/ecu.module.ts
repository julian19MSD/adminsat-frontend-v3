import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { EcuComponent } from './ecu.component';
import { FormsModule } from '@angular/forms';
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [EcuComponent],
  providers:[CurrencyPipe],
  exports:[EcuComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCurrencyFormatModule,
    SharedModule

  ]
})
export class EcuModule { }
