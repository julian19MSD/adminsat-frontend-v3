import {ChangeDetectionStrategy, Component, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { CommonSort } from '@shared/commons/sort.common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { formFieldsSort } from './sort.forms';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsSortComponent extends CommonSort {

  formGroup = new FormGroup(cloneDeep(formFieldsSort));

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    route: ActivatedRoute,
    router: Router,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<CommandsSortComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, route, router, formManageService, bottomSheetRef, cdRef);
  }
}
