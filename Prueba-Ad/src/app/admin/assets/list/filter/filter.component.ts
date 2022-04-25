import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {Store} from '@ngrx/store';

import {formFields} from './filter.forms';
import {RootAction} from '@store/root.action';
import {CommonFilter} from '@shared/commons/filter.common';
import {CHOICES} from '@shared/consts/general.consts';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormManageService} from '@core/services/form-manage/form-manage.service';

@Component({
  selector: 'adms-asset-list-filter',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetFilterComponent extends CommonFilter {

  formGroup = new FormGroup(cloneDeep(formFields));
  choices = CHOICES;
  filterConversionKeys = {
    cliente__in: 'array_int',
    placa__in: 'array',
    nombre__in: 'array',
    equipos_identificador__in: 'array',
    grupo_nombre__in: 'array',
    apagado_remoto: 'boolean',
    sensor_combustible: 'boolean',
    ecumonitor: 'boolean',
    boton_panico: 'boolean',
    is_active: 'boolean',
    vehiculo_seguro: 'boolean'
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<AssetFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }

}


