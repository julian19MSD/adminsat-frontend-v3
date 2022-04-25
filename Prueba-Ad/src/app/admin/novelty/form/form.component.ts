import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {CommonForm} from '@shared/commons/form.common';
import * as cloneDeep from 'lodash/cloneDeep';
import {IHttpParameters} from '@shared/models/form.model';
import {API_URL} from '@shared/consts/api.consts';
import {IAssetRetrieve} from '@shared/models/assets.model';
import {IClientOption} from '@shared/models/client.model';
import {IFormHeaderState} from '@shared/models/header.model';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {FormFieldsNovelty} from '@admin/novelty/form/novlety.forms';
import {NoveltyHttpService} from '@admin/novelty/services/http.service';
import {IName} from '@shared/models/general.model';

@Component({
  selector: 'adms-novelty-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class NoveltyCreateComponent extends CommonForm implements AfterViewInit {
  formHeaderData = {
    title: 'CREATE_NOVELTY',
    backUrl: '/routes/noveltys',
    formId: 'noveltyForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;

  formGroup = new FormGroup(cloneDeep(FormFieldsNovelty));
  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'

  clients: IClientOption[] = [];
  instance: IAssetRetrieve;

  changeTitle = 'EDIT_NOVELTY';
  createUrl = '/routes/noveltys/form';

  noveltyOptions: IName[] = [];

  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.routes.novelty.general
    },
    update: {
      method: 'patch',
      url: API_URL.routes.novelty.instance
    }
  };


  constructor(
    public store: Store<RootAction>,
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private noveltyHttp: NoveltyHttpService
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
    this.getInstance();
  }

  /**
   * Al cambiar el cliente trae la informacion relacionada al cliente seleccionado.
   */
  clientChanged(client: number) {
    this.getNoveltysOptions(client);
  }

  onSuccessSubmit(instance) {
    this.createSuccefull(instance);
    return super.onSuccessSubmit(instance);
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
      this.noveltyHttp.retrieve(this.instanceId)
        .subscribe(
          (instance) => {
            this.formGroup.patchValue(instance);
            this.instance = instance;
            this.loader = false;
          },
          (err) => {
            this.detailGettingError(err);
          }
        );
    }
  }

  /**
   * Obtiene la lista de novedades padre.
   */
  private getNoveltysOptions(clientId: number): void {
    this.loader = true;
    let params = {};
    if (this.instanceId) {
      params = {primer_nivel: true, exclude_id: this.instanceId, cliente: clientId};
    } else {
      params = {primer_nivel: true, cliente: clientId};
    }
    this.noveltyHttp.select(params)
      .subscribe(
        res => {
          this.noveltyOptions = res
          this.loader = false;
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          this.loader = false;
        }
      );
  }
}
