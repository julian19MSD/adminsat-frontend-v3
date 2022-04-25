import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {FormFieldsMyAverageRisk} from './my-average-risk.forms';
import {CommonForm} from '@shared/commons/form.common';
import {IFormHeaderState} from '@shared/models/header.model';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {IClientOption} from '@shared/models/client.model';
import {API_URL} from '@shared/consts/api.consts';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'adms-my-average-risk',
  templateUrl: './my-average-risk.component.html'
})
export class MyAverageRiskComponent extends CommonForm implements AfterViewInit {
  formHeaderData: IFormHeaderState = {
    title: 'MY_AVG_RISK',
    formId: 'myAvgRiskForm',
    defaultActionText: 'REQUEST'
  }
  formGroup = new FormGroup(cloneDeep(FormFieldsMyAverageRisk));
  roadActorOptions = [];
  actionName = 'request';
  httpParams = {
    request: {
      method: 'post',
      url: API_URL.llegandoacero.mi_resgo_promedio,
    }
  };

  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
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
    super.ngAfterViewInit();
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
   * Agrega todos los actores viales de la lista.
   */
  addAllRoadActors() {
    this.formGroup.get('actores_viales')
      .patchValue(
        this.roadActorOptions.map((actor) => {
          return actor.id;
        })
      );
  }


  /**
   * Obtiene la lista de actores viales.
   */
  private getRoadActors(clientId: number): void {
    this.loader = true;
    this.httpClient.get<any[]>(API_URL.road_actor.select, {params: {cliente: clientId.toString()}})
      .subscribe(
        res => {
          this.roadActorOptions = res
          this.loader = false;
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          this.loader = false
        }
      );
  }
}
