import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {formFields} from './forms.const';
import {ActivatedRoute, Router} from '@angular/router';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {CommonSort} from '@shared/commons/sort.common';

@Component({
  selector: 'adms-alarm-sort',
  templateUrl: './sort.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmSortComponent extends CommonSort {

  formGroup = new FormGroup(cloneDeep(formFields));

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    route: ActivatedRoute,
    router: Router,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<AlarmSortComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, route, router, formManageService, bottomSheetRef, cdRef);
  }

}
