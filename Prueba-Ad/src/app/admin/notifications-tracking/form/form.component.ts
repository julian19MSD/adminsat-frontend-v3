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
import { IHttpParameters } from '@shared/models/form.model';
import { IFormHeaderState } from '@shared/models/header.model';
import { hideLoader } from '@shared/utils/general.utils';
import { RootAction } from '@store/root.action';
import * as cloneDeep from 'lodash/cloneDeep';
import { map, take } from 'rxjs/operators';
import { NotificationHttpService } from '../services/http.service';
import { FormFieldsNotification } from './notification.forms';

@Component({
  selector: 'adms-notification-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class NotificationCreateComponent extends CommonForm implements AfterViewInit {

  formHeaderData = {
    title: 'CREATE_TRACKING_NOTIFICATION',
    backUrl: '/notifications/tracking',
    formId: 'notificationForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;

  formGroup = new FormGroup(cloneDeep(FormFieldsNotification));
  validateMail: string[] = [];
  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;
  assetsOptions = [];

  instance: INotificationRetrieve;

  changeTitle = 'EDIT_TRACKING_NOTIFICATION';
  createUrl = '/notifications/tracking/form';


  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.notifications.tracking.general
    },
    update: {
      method: 'patch',
      url: API_URL.notifications.tracking.instance
    },
    validateMail: {
      method: 'post',
      url: API_URL.users.resendValidateMail,
    }
  };


  constructor(
    public store: Store<RootAction>,
    public workdayHttp: NotificationHttpService,
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
 * Al cambiar el cliente trae la informacion relacionada al cliente seleccionado.
 */
  clientChanged(client: number) {
    this.getAssets(client);
  }

    /**
   * Agrega todos los actores viales de la lista.
   */
  addAllAssets() {
    this.formGroup.get('tracking.assets')
      .patchValue(
        this.assetsOptions.map((asset) => {
          return asset.id;
        })
      );
  }



  /**
 * Obtiene la lista de activos
 */
  private getAssets(clientId: number): void {

    this.httpClient.get<any[]>(API_URL.asset.select, { params: { cliente: clientId.toString() } })
      .subscribe(
        res => {
          this.assetsOptions = res;
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          this.loader = false;
        },
        () => this.loader = false

      );
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
      this.workdayHttp.retrieve(this.instanceId)
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
