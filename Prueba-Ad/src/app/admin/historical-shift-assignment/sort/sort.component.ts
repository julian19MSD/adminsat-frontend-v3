import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ActivatedRoute, Router} from '@angular/router';
import * as cloneDeep from 'lodash/cloneDeep';
import {formFieldsSort} from './sort.forms';
import {CommonSort} from '@shared/commons/sort.common';
import {FormManageService} from '@core/services/form-manage/form-manage.service';

@Component({
  selector: 'adms-historical-shift-assignment-sort',
  templateUrl: './sort.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalShiftAssignmentSortComponent extends CommonSort {

  form = new FormGroup(cloneDeep(formFieldsSort));

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              route: ActivatedRoute,
              router: Router,
              public formManageService: FormManageService,
              public bottomSheetRef: MatBottomSheetRef<HistoricalShiftAssignmentSortComponent>,
              public cdRef: ChangeDetectorRef) {
    super(data, route, router, formManageService, bottomSheetRef, cdRef);
  }

}

