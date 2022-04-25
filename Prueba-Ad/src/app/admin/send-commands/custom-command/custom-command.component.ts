import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';
import { IGeneralObject, IName } from '@shared/models/general.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { IHttpParameters } from '@shared/models/form.model';
import { API_URL } from '@shared/consts/api.consts';
import { FormFieldsWorkdayObservation } from './custom-command.forms';

@Component({
  selector: 'adms-send-commands-custom',
  templateUrl: './custom-command.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomCommandComponent extends CommonDestroy implements AfterViewInit {

  formGroup = new FormGroup(cloneDeep(FormFieldsWorkdayObservation));

  formStatus: IGeneralObject;
  loading = true;



  constructor(
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CustomCommandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }


  ngAfterViewInit() {
    this.formManageService.getFormStatus(this.formGroup)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((errors) => {
        this.formStatus = errors;
        this.cdRef.detectChanges();
      });

    this.loading = false;
    this.cdRef.detectChanges();

  }




  onSubmit($event: any) {
    $event.preventDefault();

    if (this.formGroup.valid)
      this.dialogRef.close(this.formGroup.value)
  }
}


