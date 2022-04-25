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
import { FormFieldsReports } from './asset-efficiency.forms';
import { IClientOption } from '@shared/models/client.model';
import { AssetEfficiencyHttpService } from './services/http.service'
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';
import { AnalysisEfficienyAssetModel } from '@shared/models/asset-efficiency.models';



@Component({
  selector: 'app-asset-efficiency',
  templateUrl: './asset-efficiency.component.html',
  styleUrls: ['./asset-efficiency.component.scss']
})
export class AssetEfficiencyComponent extends CommonForm implements AfterViewInit {

  formHeaderData: IFormHeaderState = {
    title: 'ASSETS_EFFICIENCY',
    formId: 'assetEfficiencyForm',
    defaultActionText: 'REQUEST'
  }

  consult = "";
  // ECU: ListItemsECUModel[] = [];

  httpParams = {
    request: {
      method: 'post',
      url: API_URL.installations.permanence,
    }
  };
  actionName = 'request';
  formGroup = new FormGroup(cloneDeep(FormFieldsReports));
  assetsOptions = [];
  instance:AnalysisEfficienyAssetModel;



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
    this.getAssets(client);
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
 



  onSuccessSubmit(res) {

    this.instance = res;
    return null

  }

  gotoElement(evento) {
    var el = document.getElementById('elementoConsulta');
    el.scrollIntoView({ block: "start", behavior: "smooth" });
  }


}
