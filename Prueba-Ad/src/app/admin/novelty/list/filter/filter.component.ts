import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {CommonFilter} from '@shared/commons/filter.common';
import {formFieldsFilter} from '@admin/novelty/list/filter/filter.forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {RootAction} from '@store/root.action';
import {FormManageService} from '@core/services/form-manage/form-manage.service';

@Component({
  selector: 'adms-novelty-filter',
  templateUrl: './filter.component.html',
})
export class NoveltyFilterComponent extends CommonFilter {

  formGroup = new FormGroup(cloneDeep(formFieldsFilter));
  filterConversionKeys = {
    cliente__in: 'array_int',
    novedad_padre_nombre__in: 'array',
    nombre__in: 'array',
    primer_nivel: 'boolean'
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<NoveltyFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }

}
