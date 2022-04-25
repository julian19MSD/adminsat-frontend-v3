import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {formFields} from './forms.const';
import {getUserNotifications, RootAction} from '@store/root.action';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {CommonFilter} from '@shared/commons/filter.common';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {validatedData} from '@shared/utils/form.utils';

@Component({
  selector: 'adms-tracking-filter',
  templateUrl: './filter.component.html'
})
export class TrackingFilterComponent extends CommonFilter implements OnInit {

  formGroup = new FormGroup(cloneDeep(formFields));
  filterConversionKeys: any = {
    placa__in: 'array',
    nombre__in: 'array',
    identificador__in: 'array',
    punto_interes_nombre__in: 'array',
    actor_vial_nombre__in: 'array',
    actor_vial_apellidos__in: 'array',
    evento_nombre__in: 'array',
    evento__in: 'array',
  };
  alarms: number[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<TrackingFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);
  }

  ngOnInit() {
    super.ngOnInit();

    this.store.select(getUserNotifications)
      .pipe(take(1))
      .subscribe(alarms => this.alarms = alarms.alarms);

    if (this.formGroup.get('calidad_gps__isnull').value) {
      this.formGroup.get('calidad_gps').patchValue('last');
    }

    if (this.formGroup.get('evento__in').value) {
      this.formGroup.get('alarmas').patchValue(true);
    }
  }


  close(event: MouseEvent, res: boolean, routerQueryParam: boolean): void {
    if (res) {
      if (this.formGroup.get('calidad_gps').value === 'last') {
        this.formGroup.get('calidad_gps__isnull').patchValue(true);
        this.formGroup.get('calidad_gps').reset(null);
      } else {
        this.formGroup.get('calidad_gps__isnull').reset(null);
      }

      if (this.formGroup.get('alarmas').value) {
        this.formGroup.get('evento__in').patchValue(this.alarms);
      } else {
        this.formGroup.get('evento__in').reset(null);
      }
      this.formGroup.get('alarmas').reset(null);

      if (this.formGroup.get('fuera_servicio').value === false) {
        this.formGroup.get('fuera_servicio').setValue(null);
      }

      const data = validatedData(this.formGroup);
      this.router.navigate([], {relativeTo: this.route, queryParamsHandling: 'merge', queryParams: data});
    }
    super.close(event, res, routerQueryParam);
  }

}
