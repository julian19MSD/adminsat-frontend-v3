import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {CommonFilter} from '@shared/commons/filter.common';
import {RootAction} from '@store/root.action';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { CHOICES } from '@shared/consts/general.consts';
import { formFieldsFilter } from './filter.forms';


@Component({
  selector: 'adms-permanence-filter',
  templateUrl: './filter.component.html',
})
export class PermanenceFilterComponent extends CommonFilter {

  formGroup = new FormGroup(cloneDeep(formFieldsFilter));
  choices = CHOICES;

  filterConversionKeys = {
    cliente: 'array_int',
    cliente_nombre: 'array',
    placa: 'array',
    vehiculo_seguro: 'boolean',
    zona_control_nombre:'array',
    orden_cargue:'array',
    remolque:'array',

  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<PermanenceFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }


}
