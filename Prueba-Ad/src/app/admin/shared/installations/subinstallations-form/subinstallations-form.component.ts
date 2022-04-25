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
import {API_URL, STATIC_URL} from '@shared/consts/api.consts';
import { FormFieldsSubinstallations } from './subinstallations-form.forms';

@Component({
  selector: 'adms-subinstallations-form',
  templateUrl: './subinstallations-form.component.html',
  styleUrls: ['./subinstallations-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubinstallationsCreateComponent extends CommonDestroy implements  AfterViewInit {

  formStatus: IGeneralObject;

  loading = true;
  title : string = 'CREATE_SUB_INSTALLATION_TO';
  actionButton : string ="CREATE";


  formGroup = new FormGroup(cloneDeep(FormFieldsSubinstallations));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;

  httpParams: IHttpParameters = {
    method: 'post',
    url: API_URL.subinstallations.general,
  };

  constructor(
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<SubinstallationsCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    super();

  }


  ngAfterViewInit() {
    this.formManageService.getFormStatus(this.formGroup)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((errors) => {
        this.formStatus = errors;
        this.cdRef.detectChanges();
      });
    this.setForm();

  }

  setForm(){
    this.formGroup.get('cliente').setValue(this.data.cliente);
    this.formGroup.get('installation_type').setValue(this.data.id);
    this.loading = false;
    this.cdRef.detectChanges();

  }




  onSubmit($event: any) {
    $event.preventDefault();
    // this.httpParams.params = { id: this.data.id };

    this.formManageService
      .submitForm(this.formGroup, this.httpParams)
      .subscribe(() => this.dialogRef.close(true),
        (err) => {
          this.notificationService.sendErrorNotification({}, err)
        }
      )
  }
}


