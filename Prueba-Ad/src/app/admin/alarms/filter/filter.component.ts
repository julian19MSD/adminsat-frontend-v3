import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {RootAction} from '@store/root.action';
import {Store} from '@ngrx/store';
import {formFields} from './forms.const';
import {CommonFilter} from '@shared/commons/filter.common';
import {FormManageService} from '@core/services/form-manage/form-manage.service';


@Component({
  selector: 'adms-alarm-filter',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmFilterComponent extends CommonFilter {

  formGroup = new FormGroup(cloneDeep(formFields));
  filterConversionKeys: any = {
    activo__cliente__in: 'array_int',
    activo_placa__in: 'array',
    activo_nombre__in: 'array',
    evento_nombre__in: 'array',
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<AlarmFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }
}
