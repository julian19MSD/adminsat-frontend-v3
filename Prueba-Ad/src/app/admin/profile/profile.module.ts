import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '@shared/shared.module';
import {ProfileHttpService} from '@admin/profile/services/http.service';
import {SharedAdminModule} from '@admin/shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    SharedAdminModule,
    SharedModule
  ],
  providers: [
    ProfileHttpService
  ]
})
export class ProfileModule {
}

