import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonForm } from '@shared/commons/form.common';
import { IFormHeaderState } from '@shared/models/header.model';
import { FormGroup, FormControl } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormFieldsActor } from './actor-road.forms';
import { STATIC_URL, API_URL } from '@shared/consts/api.consts';
import { IName } from '@shared/models/general.model';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { IHttpParameters } from '@shared/models/form.model';
import { RootAction } from '@store/root.action';
import { Store } from '@ngrx/store';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take, filter, distinctUntilChanged, takeUntil, switchMap } from 'rxjs/operators';
import { RoadActorHttpService, ActorTicketsHttpService } from '../services/http.service';
import { hideLoader } from '@shared/utils/general.utils';
import { IRoadActorChoices, IRoadActorRetrieve, IRoadActorTicket } from '@shared/models/road-actor.model';
import { ActorTicketsCreateComponent } from '../tickets/tickets.component';
import { ActionConfirmComponent } from '@shared/components/action-confirm/action-confirm.component';


@Component({
  selector: 'adms-actor-road-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class ActorRoadCreateComponent extends CommonForm implements AfterViewInit {

  formHeaderData = {
    title: 'CREATE_ROAD_ACTOR',
    backUrl: '/operation/actor-road',
    formId: 'actorRoadForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;


  objectClient = true;

  formGroup = new FormGroup(cloneDeep(FormFieldsActor));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;

  choices: IRoadActorChoices = {} as IRoadActorChoices;
  vehicleTypes: IName[] = [];
  ActorTypes: IName[] = [];

  benefits: any[] = [];
  validateMail: string[] = [];
  assetsOptions = [];
  actoresSimples = [1, 3, 4, 5, 6];
  actorSimple = false;
  ticketFormControl: FormControl = new FormControl();
  ticketOptions: Array<IName> = [];
  tickets: Array<IRoadActorTicket> = [];

  detailsBenefit: { [k: string]: number } = {};

  instance: IRoadActorRetrieve;
  metricsAlias: any;

  filesUrl = {
    foto: null,
    runt: null,
    examen_atencion: null,
    examen_habilidad: null,
    examen_agudeza: null,
    examen_psicosensorica: null,
    examen_visiometria: null,
    examen_audiometria: null,
    examen_psicologia: null,
    examen_coordinacion_motriz: null,
    examen_medico: null,
    examen_prueba_teorica: null,
    examen_prueba_practica: null,
    examen_prueba_ingreso: null
  };

  changeTitle = 'EDIT_ROAD_ACTOR';
  createUrl = '/operation/actor-road/form';

  @ViewChild('iconScroll') iconScroll: VirtualScrollerComponent;

  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.road_actor.general,
      formDataUrl: API_URL.road_actor.instance
    },
    update: {
      method: 'patch',
      url: API_URL.road_actor.instance
    },
    validateMail: {
      method: 'post',
      url: API_URL.users.resendValidateMail,
    }
  };

  constructor(
    public store: Store<RootAction>,
    public actorRoadtHttp: RoadActorHttpService,
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public ticketHttp: ActorTicketsHttpService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router) {
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
    this.watchActor();
    this.getClients();
  }

  onSubmit($event: any): void {

    var benefits = [];
    Object.keys(this.detailsBenefit).forEach(key => {
      if (this.detailsBenefit[key] !== null)
        benefits.push(this.detailsBenefit[key]);
    })
    this.formGroup.get('prestacionessociales').setValue(benefits)

    Object.keys(this.filesUrl).forEach(key => {

      if (this.filesUrl[key] !== null)
        this.formGroup.removeControl(key);
    })
    super.onSubmit($event);
  }


  /**
 * Vigila si cambia el tipo de actor para habilitar o deshabilitar campos en el formulario
 */
  watchActor() {

    this.formGroup.get('tipo_actor').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        if (this.actoresSimples.includes(selectedValue)
          && !this.actoresSimples.includes(this.formGroup.value.tipo_actor)) {

          this.formGroup.get('ibutton').setValue(null);
          this.actorSimple = true;

        }
        if (!this.actoresSimples.includes(selectedValue)
          && this.actoresSimples.includes(this.formGroup.value.tipo_actor))
          this.actorSimple = false;

      });
  }




  getMailError(value: string) {
    return this.validateMail.includes(value)
      ? 'MAIL_VALIDATION_ERROR_FIELD'
      : '';
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


  /**
   * Una vez cargada la lista de clientes, prosigue a traer los choices.
   */
  clientLoaded() {
    this.getChoices();
  }


  onFileChange(key: string, event: FileReader): void {
    const value = {};
    value[key] = event;
    this.formGroup.patchValue(value);
    this.formGroup.get(key).markAsTouched();
    this.filesUrl[key] = null;

  }

  /**
 * Al cambiar el cliente trae la informacion relacionada al cliente seleccionado.
 */
  clientChanged(client: any) {

    if (client) {
      this.getBenefits(client);

      if (this.instance) {
        this.orderBenefits();
      }
    }
  }


  /**
   * Obiene la lista de las opciones de los diferentes selectores del modulo.
   */
  private getChoices(): void {
    this.actorRoadtHttp
      .getChoices()
      .pipe(take(1))
      .subscribe(
        (choices) => {
          this.choices = choices;
          this.getVehicleTypes();
        },
        () => (this.loader = false)
      );
  }


  /**
   * Obiene la lista de tipos de vehiculos.
   */
  private getVehicleTypes() {
    this.actorRoadtHttp
      .getVehicleTypes()
      .pipe(take(1))
      .subscribe(
        (vehicleTypes) => {
          this.vehicleTypes = vehicleTypes;
          this.getActorRoadTypes();
        },
        () => (this.loader = false)
      );
  }

  /**
   * Obiene la lista de iconos.
   */
  private getActorRoadTypes() {
    this.actorRoadtHttp
      .getRoadActorTypes()
      .pipe(take(1))
      .subscribe(
        (actorRoads) => {
          this.ActorTypes = actorRoads;
          this.getInstance();
        },
        () => (this.loader = false)
      );
  }

  orderBenefits() {

    if (this.instance.prestacionessociales_detalles.length) {
      for (var i = 0; i < this.instance.prestacionessociales_detalles.length; i++) {
        this.detailsBenefit[this.instance.prestacionessociales_detalles[i].tipo_nombre] = this.instance.prestacionessociales_detalles[i].id;
      }
    }

  }

  /**
 * Obtiene la informacion de la instancia.
 */
  getInstance(): void {
    if (!this.instanceId) {
      if (1 === this.clients.length) {
        this.formGroup.get('cliente').setValue(this.clients[0].id);
      }
      else
        this.loader = false;
    } else {

      this.actorRoadtHttp.retrieve(this.instanceId).subscribe(
        (instance) => {
          this.formGroup.patchValue(instance);
          this.validateMail = instance.validate_mail || [];
          this.instance = instance;
          Object.keys(this.filesUrl).forEach(key => {
            this.filesUrl[key] = instance[key]
          });
          this.getTickets();
        },
        (err) => {
          this.detailGettingError(err);
        }
      );
    }

  }




  /**
 * Obtiene la lista de comparendos asociados
 *
 */
  getTickets(): void {
    this.loader = true;
    this.ticketHttp.list({ actor_vial: this.instanceId }).subscribe(
      (tickets) => {
        this.tickets = tickets;
        this.loader = false;
      },
      () => (this.loader = false)
    );
  }


  /**
* Obtiene la lista de activos
*/
  private getAssets(client: any): void {
    this.loader = true;
    var params: any = {};
    if (this.instance?.id)
      params = { cliente: client.id.toString(), actor_vial__select: this.instance.id }
    else
      params = { cliente: client.id.toString(), actor_vial_null: true }

    this.httpClient.get<any[]>(API_URL.asset.select, { params })
      .subscribe(
        res => {
          this.assetsOptions = res;

          this.loader = false;
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          this.loader = false;
        }
      );
  }

  /**
 * Obiene la lista de beneficios.
 */
  private getBenefits(client: any) {
    this.loader = true;
    const param: { pais_in: number } = {
      pais_in: client.pais
    };
    this.actorRoadtHttp
      .getBenefits(param)
      .pipe(take(1))
      .subscribe(
        (benefits) => {
          this.benefits = [];
          for (var key in benefits) {
            if (key) {
              this.benefits.push(benefits[key]);
            }
          }
          if (!this.instance) {
            this.detailsBenefit = {};
            for (var i = 0; i < this.benefits.length; i++) {
              this.detailsBenefit[this.benefits[i].tipo_nombre] = 0;
            }
          }
          this.loader = false;
          this.getAssets(client)

        },
        () => (this.loader = false)
      );
  }

  /**
 * Abre un dialogo con el formulario de crear comparendo.
 */
  addEditTicket(id: number = null): void {
    const component = ActorTicketsCreateComponent;
    this.dialog
      .open(component, {
        data: { actorId: this.instanceId, ticketId: id, cliente: this.formGroup.get('cliente').value },
        disableClose: true
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((e) => !!e)
      )
      .subscribe(() => this.getTickets());
  }

  /**
 * Elimina un comparendo asociado al activo.
 * @id: El Id del comparendo.
 */
  deleteTicket(id: number, infraccion: string) {
    this.dialog
      .open(ActionConfirmComponent, { panelClass: 'notification' })
      .afterClosed()
      .pipe(
        take(1),
        filter((e: any) => !!e),
        switchMap(() => {
          hideLoader(false);
          // return this.ticketHttp.delete(this.instanceId, id);
          return this.ticketHttp.bulk_destroy([id], [infraccion])

        })
      )
      .subscribe(
        () => {
          this.notificationService.sendSuccessNotification({}, 'DELETED_SUCCESSFUL');
          this.getTickets();
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err)
        }
      );
  }

  onSuccessSubmit(instance) {
    this.formGroup.reset();
    this.createSuccefull(instance);
    this.validateMail = instance.validate_mail || [];
    Object.keys(this.filesUrl).forEach(key => {
      this.filesUrl[key] = instance[key]
    })

    return super.onSuccessSubmit(instance);
  }

}
