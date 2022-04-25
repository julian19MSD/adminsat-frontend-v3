import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as cloneDeep from 'lodash/cloneDeep';
import {CommonSort} from '@shared/commons/sort.common';
import {formFieldsSort} from '@admin/shift-assignment/list/sort/sort.forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormManageService} from '@core/services/form-manage/form-manage.service';

@Component({
  selector: 'adms-shift-assignment-sort',
  templateUrl: './sort.component.html',
})
export class ShiftAssignmentSortComponent extends CommonSort {

  formGroup = new FormGroup(cloneDeep(formFieldsSort));

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    route: ActivatedRoute,
    router: Router,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<ShiftAssignmentSortComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, route, router, formManageService, bottomSheetRef, cdRef);
  }

}
