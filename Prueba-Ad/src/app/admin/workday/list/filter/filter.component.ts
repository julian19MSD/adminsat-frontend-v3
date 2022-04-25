import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {CommonFilter} from '@shared/commons/filter.common';
import {RootAction} from '@store/root.action';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {formFieldsFilter} from '@admin/workday/list/filter/filter.forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'adms-workday-filter',
  templateUrl: './filter.component.html',
})
export class WorkdayFilterComponent extends CommonFilter {

  formGroup = new FormGroup(cloneDeep(formFieldsFilter));
  filterConversionKeys = {
    cliente__in: 'array_int',
    placa__in: 'array',
    origen__in: 'array',
    destino__in: 'array',
    via__in: 'array',
    actor_vial__in: 'array',

  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<WorkdayFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }


}
