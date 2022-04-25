import { AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { NotificationService } from '@core/services/notification/notification.service';
import { addChip, pasteChip, removeChip } from '@shared/utils/form.utils';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { IFormHeaderState } from '@shared/models/header.model';
import { IClientOption } from '@shared/models/client.model';
import { hideLoader } from '@shared/utils/general.utils';
import { API_URL } from '@shared/consts/api.consts';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IGeneralObject } from '@shared/models/general.model';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { IHttpParameters } from '@shared/models/form.model';
import { LOADER_CONTENT } from '@shared/consts/loader';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


export abstract class CommonForm extends CommonDestroy implements AfterViewInit, OnDestroy {
  formGroup: FormGroup;
  formData: FormData;

  // filesUrl :{[k: string]: string} = {};


  formHeaderData: IFormHeaderState = {} as IFormHeaderState;
  updateHeaderData = true;

  httpParams: { [propName: string]: IHttpParameters } = {};
  actionName = 'update';

  objectClient = false;

  formStatus: IGeneralObject;
  formFieldErrorsMap: IGeneralObject = {};

  successMessages = 'UPDATE_SUCCESSFUL';
  successNotificationParams = {};
  errorNotificationParams = {};


  loaderContent = LOADER_CONTENT;
  loader = true;

  changeTitle: string;
  createUrl: string;
  instance: any;
  instanceId: number;

  resetFiles: boolean;
  clients: IClientOption[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private newTaskText: string;

  protected constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super();

    this.translateService.get('NEW_TASK')
      .subscribe((res) => this.newTaskText = res)
  }

  /**
   * Funcion pensada para que cada modulo defina una accion cuando cambie el cliente.
   */
  clientChanged(value: any) {
  };


  ngAfterViewInit(): void {

    if (this.updateHeaderData) {
      setTimeout(() => {
        this.headerMessengerService.sendMessageToHeader({ value: this.formHeaderData });
      }, 0);
    }

    if (this.changeTitle) {
      this.route.params
        .pipe(
          takeUntil(this.ngDestroyed$),
          filter((e) => !!e.id)
        )
        .subscribe((param) => {

          const id = parseInt(param.id, 10);
          if (!this.instanceId) {
            this.instanceId = id;
            this.actionName = 'update';
            this.httpParams.update.params = { id };
            this.formHeaderData = {
              ...this.formHeaderData,
              title: this.changeTitle,
              addActionUrl: this.createUrl,
            };
            this.successMessages = 'UPDATE_SUCCESSFUL';
          } else if (id !== this.instanceId) {
            this.instanceId = id;
            this.httpParams.update.params = { id };
            setTimeout(() => this.getClients(), 0);
          }
        });
    }

    this.formManageService.getFormStatus(this.formGroup, this.formFieldErrorsMap)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((errors) => {
        this.formStatus = errors;
        this.cdRef.detectChanges();
      });
  }



  /**
   * Actualiza la informacion de archivos en el formulario.
   *  model: Nombre del campo.
   *  event: Contenido.
   */
  updateFormData(model: string, event: FormDataEntryValue): void {
    if (!this.formData) {
      this.formData = new FormData();
    }
    this.formData.set(model, event);
  }

  /**
   * Obiene la lista de clientes del usuario.
   */
  getClients(): void {
    this.httpClient.get<IClientOption[]>(API_URL.client.select)
      .subscribe(
        clients => {
          this.clients = clients;
          this.cdRef.detectChanges();
          this.clientLoaded();
        },
        () => hideLoader(true)
      );
  }

  /**
   * Vigila si cambia el cliente para traer nuevamente la informacion relacionada al cliente.
   */
  watchClient() {

    this.formGroup.get('cliente').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        if (this.objectClient === false)
          this.clientChanged(selectedValue);
        else
          this.clientChanged(this.clients.find(c => c.id === selectedValue));
      });
  }

  /**
   * Funcion pensada para ser que cada modulo defina una accion cuando se cargue la lista de clientes.
   *
   */
  clientLoaded() {
    hideLoader(true);
  }

  /**
   *  Agrega un elemento a un chip.
   *  field: El nombre del campo.
   *  $event: El evento del MatChip
   *  max: El maximo de elementos que recibira el chip
   *  mail: Si es el contenido es de correo.
   */
  chipAdd(field: string, $event: MatChipInputEvent, max: number = 5, mail: boolean = false) {
    addChip(this.formGroup, field, $event.input, $event.value, max, mail);
  }

  /**
   * Elimina un elemento del chip
   *  field: Nombre del campo.
   *  value: Valor del elemento.
   */
  chipRemove(field: string, value: string) {
    removeChip(this.formGroup, field, value);
  }


  /**
   * Agrega elementos al chip cuando se copia y se pega.
   *  field: Nombre del campo.
   *  event: Evento ClipboardEvent.
   */
  chipPaste(field: string, event: ClipboardEvent, max: number = 5, mail: boolean = false): void {
    pasteChip(this.formGroup, field, event, max, mail);
  }

  /**
   * Envio del formulario de edicion/creacion.
   * @param $event: El evento submit
   */
  onSubmit($event: any) {
    $event.preventDefault();
    hideLoader(false);
    this.formManageService.submitForm(this.formGroup, this.httpParams[this.actionName], this.formData)
      .subscribe(
        (instance) => {
          this.onSuccessSubmit(instance);
          this.cdRef.detectChanges();
        },
        (err) => {
          this.onErrorSubmit(err);
          this.cdRef.detectChanges();
        }
      );
  }


  createSuccefull(instance) {
    if (this.instanceId) {
      this.formGroup.patchValue(instance);
      this.instance = instance;
      this.resetFiles = true;
      setTimeout(() => this.resetFiles = false, 200);
    } else {
      this.router.navigate([this.createUrl, instance.id])
    }
  }

  /**
   * Comportamiento por defecto cuando se procese de forma exitosa el formulario enviado.
   */
  onSuccessSubmit(instance) {

    if (instance?.detalles_json?.task_id) {
      return this.notificationService.sendSuccessNotification({ task: true }, [this.newTaskText], '');
    }
    return this.notificationService.sendSuccessNotification(
      this.successNotificationParams,
      null,
      this.successMessages,
      instance.validateMail);
  }

  /**
   * Comportamiento por defecto cuando no se procese de forma exitosa el formulario enviado.
   */
  onErrorSubmit(err): Observable<any> | void {
    return this.notificationService.sendErrorNotification(this.errorNotificationParams, err);
  }


  detailGettingError(err) {
    this.loader = false;
    this.notificationService.sendErrorNotification({}, err)
    this.router.navigate([this.formHeaderData.backUrl])
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.updateHeaderData) {
      this.headerMessengerService.clearMessages();
    }
  }
}
