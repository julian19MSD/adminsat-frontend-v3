import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {CommonForm} from '@shared/commons/form.common';
import {IFormHeaderState} from '@shared/models/header.model';
import {FormGroup} from '@angular/forms';
import {FormFieldsAsset as formFieldsAsset} from '@admin/assets/form/asset.forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {IHttpParameters} from '@shared/models/form.model';
import {API_URL} from '@shared/consts/api.consts';
import {IShiftAsingmentChoices} from '@shared/models/shift-assignment';
import {IName} from '@shared/models/general.model';
import {ShiftAssignmentHttpService} from '@admin/shift-assignment/services/http.service';
import {formFieldsShiftAssignment} from '@admin/shift-assignment/form/shift-assignment.forms';

@Component({
  selector: 'adms-shift-assignment-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ShiftAssignmentCreateComponent extends CommonForm implements AfterViewInit {

  formHeaderData = {
    title: 'CREATE_SHIFT_ASSIGNMENT',
    backUrl: '/routes/shift-assignment',
    formId: 'shiftAssignmentForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;
  formGroup = new FormGroup(cloneDeep(formFieldsShiftAssignment));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'

  choices: IShiftAsingmentChoices = {} as IShiftAsingmentChoices;
  roadActors: IName[] = [];
  routes: IName[] = [];
  assets: IName[] = [];
  finalClients: IName[] = [];

  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.routes.shiftAssignment.general
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
    public  shiftAssignmentHttp: ShiftAssignmentHttpService
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
    this.getClients();
  }

  /**
   * Una vez cargada la lista de clientes, prosigue a traer los choices.
   */
  clientLoaded() {
    this.getChoices();
  }

  /**
   * Al cambiar el cliente trae nuevamente la informacion relacionada al cliente.
   */
  clientChanged(client: number) {
    this.loader = true;
    this.getAssets(client);
  }

  onSuccessSubmit(instance) {
    this.formGroup.reset();
    return super.onSuccessSubmit(instance);
  }


  /**
   * Obiene la lista de las opciones de los diferentes selectores del modulo.
   */
  private getChoices(): void {
    this.shiftAssignmentHttp.getChoices()
      .subscribe(choices => {
          this.choices = choices;
          this.setClient()
        },
        (err) => {
          this.loader = false;
          this.notificationService.sendErrorNotification({}, err);
        }
      );
  }

  /**
   * Si solo tiene acceso a un cliente, lo incializa.
   */
  private setClient(): void {
    this.loader = false;
    if (1 === this.clients.length) {
      this.formGroup.get('cliente').setValue(this.clients[0].id);
    }
  }

  /**
   * Obtiene la lista de activos
   * @param clientId: El id del cliente.
   */
  private getAssets(clientId: number) {
    this.shiftAssignmentHttp.getAssets({cliente: clientId})
      .subscribe(
        assets => {
          this.assets = assets;
          this.getRoutes(clientId)
        },
        (err) => {
          this.loader = false;
          this.notificationService.sendErrorNotification({}, err);
        }
      )
  }

  /**
   * Obtiene la lista de rutas
   * @param clientId: El id del cliente.
   */
  private getRoutes(clientId: number) {
    this.shiftAssignmentHttp.getRoutes({cliente: clientId})
      .subscribe(
        routes => {
          this.routes = routes;
          this.getRoadActors(clientId)
        },
        (err) => {
          this.loader = false;
          this.notificationService.sendErrorNotification({}, err);
        }
      )
  }

  /**
   * Obtiene la lista de actores viales
   * @param clientId: El id del cliente.
   */
  private getRoadActors(clientId: number) {
    this.shiftAssignmentHttp.getRoadActors({cliente: clientId})
      .subscribe(
        (roadActors) => {
          this.roadActors = roadActors;
          this.getFinalClients(clientId)
        },
        (err) => {
          this.loader = false;
          this.notificationService.sendErrorNotification({}, err);
        }
      )
  }

  /**
   * Obtiene la lista de clientes finales
   * @param clientId: El id del cliente.
   */
  private getFinalClients(clientId: number) {
    this.shiftAssignmentHttp.getFinalClients({cliente: clientId})
      .subscribe(
        (finalClients) => {
          this.finalClients = finalClients;
          this.loader = false;
        },
        (err) => {
          this.loader = false;
          this.notificationService.sendErrorNotification({}, err);
        }
      )
  }
}
