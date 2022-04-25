import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {ActivatedRoute, Router} from '@angular/router';
import {trackingSortFormControls} from './forms.const';
import {CHOICES} from '@shared/consts/general.consts';
import {CommonSort} from '@shared/commons/sort.common';
import {FormManageService} from '@core/services/form-manage/form-manage.service';

@Component({
  selector: 'adms-tracking-sort',
  templateUrl: './sort.component.html'
})
export class TrackingSortComponent extends CommonSort {

  public choices = CHOICES;
  public formGroup = new FormGroup(cloneDeep(trackingSortFormControls));

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    route: ActivatedRoute,
    router: Router,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<TrackingSortComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, route, router, formManageService, bottomSheetRef, cdRef);
  }
}
