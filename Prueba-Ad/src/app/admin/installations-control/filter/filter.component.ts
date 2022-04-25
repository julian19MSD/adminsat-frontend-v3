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
import { CHOICES } from '@shared/consts/general.consts';

@Component({
  selector: 'adms-control-zones-filter',
  templateUrl: './filter.component.html'
})
export class InstallationsControlFilterComponent extends CommonFilter implements OnInit {

  formGroup = new FormGroup(cloneDeep(formFields));
  choices = CHOICES;
  metricsAlias:any;

  filterConversionKeys: any = {
    cliente__in: 'array_int',
    nombre__in: 'array',
    activos__in: 'array'
  };
  alarms: number[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef<InstallationsControlFilterComponent>,
    public cdRef: ChangeDetectorRef
  ) {
    super(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef);

    this.store
    .select('theme', 'metrics_alias')
    .pipe(take(1))
    .subscribe((info) =>{ this.metricsAlias = info
    });
  }

  close(event: MouseEvent, res: boolean, routerQueryParam: boolean): void {
    if (res) {

      const data = validatedData(this.formGroup);
      this.router.navigate([], {relativeTo: this.route, queryParamsHandling: 'merge', queryParams: data});
    }
    super.close(event, res, routerQueryParam);
  }


}
