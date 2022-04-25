import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {CommonFilter} from '@shared/commons/filter.common';
import {RootAction} from '@store/root.action';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {formFieldsFilter} from '@admin/shift-assignment/list/filter/filter.forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'adms-shift-assignment-filter',
  templateUrl: './filter.component.html',
})
export class ShiftAssignmentFilterComponent extends CommonFilter {

  formGroup = new FormGroup(cloneDeep(formFieldsFilter));
  filterConversionKeys = {
    cliente__in: 'array_int',
    cliente_final__in: 'array',
    placa__in: 'array',
    origen__in: 'array',
    destino__in: 'array',
    via__in: 'array',
    orden_cargue__in: 'array',
    planilla__in: 'array',
    id_carga__in: 'array',
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<ShiftAssignmentFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }


}
