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
import { FormFieldsSubzones } from './subzone-form.forms';

@Component({
  selector: 'adms-subzone-form',
  templateUrl: './subzone-form.component.html',
  styleUrls: ['./subzone-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubzonesCreateComponent extends CommonDestroy implements  AfterViewInit {

  formStatus: IGeneralObject;

  loading = true;
  title : string = 'CREATE_SUB_ZONE_TO';
  actionButton : string ="CREATE";


  formGroup = new FormGroup(cloneDeep(FormFieldsSubzones));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;
  // clients: IClientOption[] = [];
  // instance: IZonesRetrieve;

  // httpParams: { [propName: string]: IHttpParameters } = {
  //   create: {
  //     method: 'post',
  //     url: API_URL.zones.general,
  //     formDataUrl: API_URL.zones.instance
  //   },
  //   update: {
  //     method: 'patch',
  //     url: API_URL.zones.instance
  //   }
  // };

  httpParams: IHttpParameters = {
    method: 'post',
    url: API_URL.subzones.general,
  };

  constructor(
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<SubzonesCreateComponent>,
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
    this.formGroup.get('zone').setValue(this.data.id);
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


