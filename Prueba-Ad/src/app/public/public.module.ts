import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@material/material.module';

import {PublicRoutingModule} from './public-routing.module';
import {PublicContainer} from './container/public.container';


@NgModule({
  declarations: [
    PublicContainer
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule
  ]
})
export class PublicModule {
}
