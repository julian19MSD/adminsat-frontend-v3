import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IFormHeaderState } from '@shared/models/header.model';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormGroup } from '@angular/forms';
import {  API_URL } from '@shared/consts/api.consts';
import { IHttpParameters } from '@shared/models/form.model';
import { CommonForm } from '@shared/commons/form.common';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagingHttpService } from '../services/http.service';
import { FormFieldsMessage } from '../message/message.forms';
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'adms-messaging-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class MessagingCreateComponent extends CommonForm implements AfterViewInit {

  formHeaderData = {
    title: 'CREATE_MESSAGE',
    backUrl: '/monitoring/messaging',
    formId: 'messagingForm',
    defaultActionText: 'SEND'
  } as IFormHeaderState;

  formGroup = new FormGroup(cloneDeep(FormFieldsMessage));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  assets: any[] = [];
  devices: any[] = [];



  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.messaging.general,
      formDataUrl: API_URL.messaging.instance
    },
   
  };

  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    public httpMesssaging: MessagingHttpService
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

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.watchClient();
    this.watchAsset();
    this.getClients();
  }


  onSuccessSubmit(instance) {
    this.formGroup.reset();
    this.router.navigate([this.formHeaderData.backUrl])

    return super.onSuccessSubmit(instance);
  }



  clientLoaded() {
    this.setClient();
  }

  
  /**
  * Vigila si cambia el activo para traer nuevamente la informacion relacionada al activo.
  */
   watchAsset() {
    this.formGroup.get('activo').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        this.loader = true;
        this.getDevices(selectedValue);
      });
  }


  /**
 * Si solo tiene acceso a un cliente, lo incializa.
 */
   private setClient(): void {
    if (1 === this.clients.length) {
      this.formGroup.get('cliente').setValue(this.clients[0].id);
    }
    this.loader = false;
  }

  
  /**
 * Al cambiar el cliente trae nuevamente la informacion relacionada al cliente.
 */
   clientChanged(client: number) {
    this.loader = true;
    this.getAssets(client);
  }

  
  /**
 * Obtiene la lista de activos
 * @param clientId: El id del cliente.
 */
   private getAssets(clientId: number) {
    this.httpMesssaging.getAssets({ cliente: clientId })
      .pipe(take(1))
      .subscribe(
        assets => {
          this.assets = assets;
          this.loader = false;
        },
        error => this.loader = false,
      )
  }


    /**
 * Obtiene la lista de activos
 * @param activo: El id del activo.
 */
     private getDevices(activo: number) {
      this.httpMesssaging.getDevices({ activo: activo })
        .pipe(take(1))
        .subscribe(
          devices => {
            this.devices = devices;
            this.loader = false;
          },
          error => this.loader = false,
        )
    }


}