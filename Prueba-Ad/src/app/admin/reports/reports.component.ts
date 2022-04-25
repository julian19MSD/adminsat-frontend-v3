import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonForm } from '@shared/commons/form.common';
import { IFormHeaderState } from '@shared/models/header.model';
import { API_URL, ENDPOINT } from '@shared/consts/api.consts';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep'
import { FormFieldsReports, ITypesReports } from './reports.forms';
import { IClientOption } from '@shared/models/client.model';
import { ReportsHttpService } from './services/http.service'
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';
import { ListItemsECUModel } from './consults/ecu/mocks/forms';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent extends CommonForm implements AfterViewInit {

  formHeaderData: IFormHeaderState = {
    title: 'REPORTS',
    formId: 'reportsForm',
    defaultActionText: 'REQUEST',
    defaultActionSecondText: 'DOWNLOAD'
  }

  formats = {
    excellHojas:
      [{ id: 0, nombre: "CONSOLIDATE" },
      { id: 1, nombre: "ACTIVE_PER_SHEET" }]

  }
  consult = "";
  ECU: ListItemsECUModel[] = [];

  httpParams = {
    request: {
      method: 'post',
      url: "",
    }
  };
  actionName = 'request';
  formGroup = new FormGroup(cloneDeep(FormFieldsReports));
  roadActorOptions = [];
  assetsOptions = [];
  controlZonesOptions = [];
  eventsOptions = [];
  reportsOptions = Array<ITypesReports>();
  reportSelected: ITypesReports;


  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    private reportsHttp: ReportsHttpService,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
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
    this.watchClient();
    this.getClients();
    this.getTypes();
    this.watchTypeReport();
    super.ngAfterViewInit();
  }


  /**
 * Vigila si cambia el tipo de reporte para cambiar la request
 */
  watchTypeReport() {
    this.formGroup.get('reporte').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        if (this.reportSelected?.name){
         
          this[this.reportSelected.name] = [];
          this.consult = null;
        }

        this.reportSelected = this.reportsOptions.find(item => item.id === selectedValue);
        if ([1, 3].includes(selectedValue)) {
          this.formHeaderData.defaultActionText = '';
        }
        else if ([2].includes(selectedValue)) {
          this.formHeaderData.defaultActionText = 'REQUEST';
        }

        setTimeout(() => {
          this.headerMessengerService.sendMessageToHeader({ value: this.formHeaderData });
        }, 0);

      });
  }



  getTypes() {
    this.reportsHttp.getTipos()
      .subscribe(
        (types) => {
          this.reportsOptions = types;
        },
        () => (this.loader = false)
      );
  }
  /**
 * Obiene la lista de clientes del usuario.
 */
  getClients(): void {
    this.httpClient.get<IClientOption[]>(API_URL.client.select)
      .subscribe(clients => {
        this.clients = clients
        if (1 === this.clients.length) {
          this.formGroup.get('cliente').setValue(this.clients[0].id);
        } else {
          this.loader = false;
        }

      },
        (err) => {
          this.notificationService.sendErrorNotification({}, err)
          this.loader = false
        }
      );
  }


  /**
 * Vigila si cambia el cliente para traer nuevamente la informacion relacionada al cliente.
 */
  clientChanged(client: number) {
    this.getRoadActors(client);
  }


  /**
 * Obtiene la lista de actores viales.
 */
  private getRoadActors(clientId: number): void {
    this.loader = true;
    this.httpClient.get<any[]>(API_URL.road_actor.select, { params: { cliente__in: clientId.toString() } })
      .subscribe(
        res => {
          this.roadActorOptions = res

        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          this.loader = false
        },
        () => this.getAssets(clientId)
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
        () => this.getControlZones(clientId)
      );
  }


  /**
 * Obtiene la lista de control de zonas
 */
  private getControlZones(clientId: number): void {

    this.httpClient.get<any[]>(API_URL.controlZone.select, { params: { cliente: clientId.toString() } })
      .subscribe(
        res => {
          this.controlZonesOptions = res;
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          this.loader = false;
        },
        () => this.getEvents(clientId)
      );
  }


  /**
* Obtiene la lista de activos.
*/
  private getEvents(clientId: number): void {
    this.httpClient.get<any[]>(API_URL.references.events.select)
      .subscribe(
        res => { this.eventsOptions = res; },
        () => this.loader = false,
        () => this.loader = false
      );
  }


  /**
   * Agrega todos los items del select.
   */
  addAll(filtro: string, itemForm: string) {

    const items = [];
    this.formGroup.get(itemForm)
      .patchValue(
        this[filtro].map((actor) => {
          return actor.id;
        })
      );
  }

  /**
* Es llamando por el formulario para iniciar el envio del mismo.
*/
  onSubmit($event: any): void {
    $event.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (document.activeElement.id === "submit-1") {
        this.httpParams.request.url = ENDPOINT + "/informes/" + this.reportSelected.url;
      }
      else if (document.activeElement.id === "submit-2") {
        this.httpParams.request.url = ENDPOINT + "/informes/" + this.reportSelected.url + this.reportSelected.download;
      }
    }

    super.onSubmit($event)
  }



  onSuccessSubmit(res) {


    if (document.activeElement.id === "submit-1") {
      this[this.reportSelected.name] = res;
      this.consult = this.reportSelected.name.trim();
    }
    else if (document.activeElement.id === "submit-2") {
      return super.onSuccessSubmit(res)
    }


  }

  gotoElement(evento) {
    var el = document.getElementById('elementoConsulta');
    el.scrollIntoView({ block: "start", behavior: "smooth" });
  }


}
