import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { takeUntil} from 'rxjs/operators';
import {IGeneralObject} from '@shared/models/general.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IHttpParameters} from '@shared/models/form.model';
import {API_URL} from '@shared/consts/api.consts';
import { FormFieldsMessage } from './message.forms';

@Component({
  selector: 'adms-message',
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMessageComponent extends CommonDestroy implements AfterViewInit {

  formGroup = new FormGroup(cloneDeep(FormFieldsMessage));

  formStatus: IGeneralObject;

  loading = true;

  httpParams: IHttpParameters = {
    method: 'post',
    url: API_URL.messaging.general
  };

  constructor(
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<NewMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }



  ngAfterViewInit() {
    this.formGroup.get('cliente').setValue(this.data.cliente);
    this.formGroup.get('device').setValue(this.data.device);
    this.formGroup.get('activo').setValue(this.data.activo);

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
    this.httpParams.params = {id: this.data.id};

    this.formManageService
      .submitForm(this.formGroup, this.httpParams)
      .subscribe(() => this.dialogRef.close(true),
        (err) => {
          this.notificationService.sendErrorNotification({}, err, true)
        }
      )
  }
}


