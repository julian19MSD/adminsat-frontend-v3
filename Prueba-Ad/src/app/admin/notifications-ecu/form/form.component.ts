import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CommonForm } from '@shared/commons/form.common';
import { API_URL, STATIC_URL } from '@shared/consts/api.consts';
import { INotificationRetrieve } from '@shared/models/admin-notification.model';
import { IECUNotificationRetrieve } from '@shared/models/ecu-notification.model';
import { IHttpParameters } from '@shared/models/form.model';
import { IFormHeaderState } from '@shared/models/header.model';
import { hideLoader } from '@shared/utils/general.utils';
import { RootAction } from '@store/root.action';
import * as cloneDeep from 'lodash/cloneDeep';
import { map, take } from 'rxjs/operators';
import { ECUNotificationHttpService } from '../services/http.service';
import { FormFieldsNotification } from './notification.forms';

@Component({
  selector: 'adms-ecu-notification-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ECUNotificationCreateComponent extends CommonForm implements AfterViewInit {

  formHeaderData = {
    title: 'CREATE_ECU_NOTIFICATION',
    backUrl: '/notifications/ecu',
    formId: 'notificationForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;

  formGroup = new FormGroup(cloneDeep(FormFieldsNotification));
  validateMail: string[] = [];
  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;
  assetsOptions = [];

  instance: IECUNotificationRetrieve;

  changeTitle = 'EDIT_ECU_NOTIFICATION';
  createUrl = '/notifications/ecu/form';


  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.notifications.ecu.general
    },
    update: {
      method: 'patch',
      url: API_URL.notifications.ecu.instance
    },
    validateMail: {
      method: 'post',
      url: API_URL.users.resendValidateMail,
    }
  };

  metricsAlias: any;

  constructor(
    public store: Store<RootAction>,
    public ecuHttp: ECUNotificationHttpService,
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(
      headerMessengerService,
      notificationService,
      translateService,
      httpClient,
      formManageService,
      cdRef,
      route,
      router
    );

    this.store.select('theme', 'metrics_alias').pipe(take(1)).subscribe(info => this.metricsAlias = info);

  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.watchClient();
    this.getClients();

  }

  clientLoaded() {
    hideLoader(true);
    this.getInstance();
  }




  



  /**
  * Obtiene la informacion de la instancia.
  */
  getInstance(): void {
    if (!this.instanceId) {
      if (1 === this.clients.length) {
        this.formGroup.get('cliente').setValue(this.clients[0].id);
      }
      this.loader = false;
    } else {
      this.ecuHttp.retrieve(this.instanceId)
        .subscribe(
          (instance) => {

            this.formGroup.patchValue(instance);
            this.validateMail = instance.validate_mail || [];
            this.instance = instance;
            this.loader = false;

          },
          (err) => {
            this.detailGettingError(err);
            this.loader = false;
          }
        );
    }
  }




  onSuccessSubmit(instance) {

    this.createSuccefull(instance);
    this.validateMail = instance.validate_mail || [];
    return super.onSuccessSubmit(instance);

  }

  onValidateMailSubmit(mail: string) {
    hideLoader(false);
    const mailForm = new FormGroup({ correo: new FormControl(mail) });
    this.formManageService
      .submitForm(mailForm, this.httpParams.validateMail)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.notificationService.sendSuccessNotification({}, null, null, [mail]);
      }, err => {
        this.notificationService.sendErrorNotification({}, err);
      });
  }

  getMailError(value: string) {
    return this.validateMail.includes(value)
      ? 'MAIL_VALIDATION_ERROR_FIELD'
      : '';
  }




}
