import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';


import * as cloneDeep from 'lodash/cloneDeep';
import {CommonFilter} from '@shared/commons/filter.common';
import {RootAction} from '@store/root.action';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formFieldsFilter } from './filter.forms';

@Component({
  selector: 'adms-ecu-notification-filter',
  templateUrl: './filter.component.html',
})
export class ECUNotificationFilterComponent extends CommonFilter {

  formGroup = new FormGroup(cloneDeep(formFieldsFilter));
  filterConversionKeys = {
    cliente__in: 'array_int',

  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<ECUNotificationFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }


}
