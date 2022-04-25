import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ChangeDetectorRef, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RootAction} from '@store/root.action';
import {Store} from '@ngrx/store';
import {addChip, pasteChip, removeChip, validatedData} from '@shared/utils/form.utils';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {IGeneralObject} from '@shared/models/general.model';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {takeUntil} from 'rxjs/operators';

export abstract class CommonFilter extends CommonDestroy implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  formGroup = new FormGroup({});
  filterConversionKeys: any;
  formStatus: IGeneralObject;

  protected constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public formManageService: FormManageService,
    public bottomSheetRef: MatBottomSheetRef,
    public cdRef: ChangeDetectorRef
  ) {
    super();

  }

  ngOnInit() {
    const data = {};
    this.route.snapshot.queryParamMap.keys.forEach(key => {
      if (key in this.formGroup.controls) {
        switch (this.filterConversionKeys[key]) {
          case 'int':
            data[key] = parseInt(this.route.snapshot.queryParams[key], 10);
            break;
          case 'array_int':
            data[key] = [];
            this.route.snapshot.queryParams[key].split(',').forEach(item => {
              data[key].push(parseInt(item, 10));
            });
            break;
          case 'array':
            data[key] = this.route.snapshot.queryParams[key].split(',');
            break;
          case 'boolean':
            data[key] = JSON.parse(this.route.snapshot.queryParams[key]);
            break;
          default:
            data[key] = this.route.snapshot.queryParams[key];
        }
      }
    });
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

  close(event: MouseEvent, res: boolean, routerQueryParam: boolean): void {
    if (res) {
      if (routerQueryParam) {
        const data = validatedData(this.formGroup);
        this.router.navigate([], {relativeTo: this.route, queryParamsHandling: 'merge', queryParams: data});
      }
      this.bottomSheetRef.dismiss(true);
    } else {
      this.bottomSheetRef.dismiss();
    }
    event.preventDefault();
  }

  chipRemove(field: string, value: string) {
    removeChip(this.formGroup, field, value);
  }

  chipAdd(field: string, $event: MatChipInputEvent, max: number = 5) {
    addChip(this.formGroup, field, $event.input, $event.value, max);
  }

  chipPaste(field: string, event: ClipboardEvent, max: number = 5, mail: boolean = false): void {
    pasteChip(this.formGroup, field, event, max, mail);
  }
}
