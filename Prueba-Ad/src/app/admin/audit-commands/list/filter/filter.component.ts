import { Component, ChangeDetectionStrategy, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { CHOICES } from '@shared/consts/general.consts';
import { formFields } from './filter.forms';
import { CommonFilter } from '@shared/commons/filter.common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { endOfToday } from 'date-fns';

@Component({
  selector: 'adms-tpms-list-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsFilterComponent extends CommonFilter {

  
  formGroup = new FormGroup(cloneDeep(formFields));
  choices = CHOICES;

  today = endOfToday();

  filterConversionKeys = {
    cliente__in: 'array_int',
    activo_nombre__in:"array",
    activo_placa__in: 'array',
    username__in: 'array',
    dt__lte: "string",
    dt__gte: "string"
  };


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<CommandsFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }

}
