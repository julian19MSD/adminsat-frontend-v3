import {ChangeDetectorRef, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {CHOICES} from '@shared/consts/general.consts';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {takeUntil} from 'rxjs/operators';
import {IGeneralObject} from '@shared/models/general.model';
import {CommonDestroy} from '@shared/commons/destroy.common';

export class CommonSort extends CommonDestroy implements OnInit {

  choices = CHOICES;
  formGroup = new FormGroup({});
  formStatus: IGeneralObject;

  protected constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private route: ActivatedRoute,
              private router: Router,
              public formManageService: FormManageService,
              public bottomSheetRef: MatBottomSheetRef,
              public cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    const ordering = this.route.snapshot.queryParams.ordering;
    const data = {};
    if (ordering) {
      ordering.split(',').forEach(item => {
        if (item.startsWith('-')) {
          data[item.slice(1)] = '-';
        } else {
          data[item] = '+';
        }
      });
    }
    this.formGroup.patchValue(data);
    this.formManageService.getFormStatus(this.formGroup)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(errors => {
        this.formStatus = errors;
        this.cdRef.detectChanges();
      });
  }


  close(event: MouseEvent, res: boolean): void {
    if (res) {
      const sortItems = [];
      Object.keys(this.formGroup.value).forEach(key => {
        const val = this.formGroup.get(key).value;
        if (['-', '+'].includes(val)) {
          sortItems.push('-' === val ? '-' + key : key);
        }
      });

      const oredring = {ordering: 0 === sortItems.length ? null : sortItems.join(',')};

      this.router.navigate([], {relativeTo: this.route, queryParamsHandling: 'merge', queryParams: oredring});
      this.bottomSheetRef.dismiss(true);
    } else {
      this.bottomSheetRef.dismiss();
    }
    event.preventDefault();
  }

}
