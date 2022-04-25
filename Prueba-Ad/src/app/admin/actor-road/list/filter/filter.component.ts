import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonFilter } from '@shared/commons/filter.common';
import { FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import * as cloneDeep from 'lodash/cloneDeep';
import { formFields } from './filter.forms';

@Component({
  selector: 'adms-actor-road-list-filter',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorRoadFilterComponent extends CommonFilter {
  
  formGroup = new FormGroup(cloneDeep(formFields));
  
  filterConversionKeys = {
    cliente__in: 'array_int',
    referencia__in: 'array',
    apellidos__in: "array",
    numero_documento_identidad__in: "array"
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<ActorRoadFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }

}
