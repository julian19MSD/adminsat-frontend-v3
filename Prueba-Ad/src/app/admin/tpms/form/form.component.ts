import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IFormHeaderState } from '@shared/models/header.model';
import { FormFieldsTpms } from './tpms.forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormGroup } from '@angular/forms';
import { STATIC_URL, API_URL } from '@shared/consts/api.consts';
import { ITpmsChoices, ITpmsRetrieve } from '@shared/models/tpms.model';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { IHttpParameters } from '@shared/models/form.model';
import { CommonForm } from '@shared/commons/form.common';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { TpmsHttpService } from '../services/http.service';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { IName } from '@shared/models/general.model';

@Component({
  selector: 'adms-tpms-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TpmsCreateComponent extends CommonForm implements AfterViewInit {

  formHeaderData = {
    title: 'CREATE_TPMS',
    backUrl: '/tpms',
    formId: 'tpmsForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;

  formGroup = new FormGroup(cloneDeep(FormFieldsTpms));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;


  choices: ITpmsChoices = {} as ITpmsChoices;
  instance: ITpmsRetrieve;
  metricsAlias: any;
  tireManufacturers: IName[] = [];

  changeTitle = 'EDIT_TPMS';
  createUrl = '/tpms/form';

  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.tpms.general,
      formDataUrl: API_URL.tpms.instance
    },
    update: {
      method: 'patch',
      url: API_URL.tpms.instance
    }
  };

  constructor(
    public store: Store<RootAction>,
    public tpmsHttp: TpmsHttpService,
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
    this.store
      .select('theme', 'metrics_alias')
      .pipe(take(1))
      .subscribe((info) => this.metricsAlias = info);
  }

  ngAfterViewInit(): void {
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
   * Obiene la lista de las opciones de los diferentes selectores del modulo.
   */
  private getChoices(): void {
    this.tpmsHttp.getChoices()
      .pipe(take(1))
      .subscribe(choices => {
        this.choices = choices;
        this.getManufacturersTire();
      },
        () => (this.loader = false)
      );
  }


  /**
 * obtienes los fabricante de llantas
 */
  private getManufacturersTire() {
    this.tpmsHttp.select_manufacturers_tire()
      .pipe(take(1))
      .subscribe(manufacturersTire => {
        this.tireManufacturers = manufacturersTire;
        this.getInstance();
      },
        () => (this.loader = false)
      );

  }

  /**
   * Funcion para ser rescrita en el componente de editar.
   */
  getInstance(): void {
    if (!this.instanceId) {
      if (1 === this.clients.length) {
        this.formGroup.get('cliente').setValue(this.clients[0].id);
      }
      this.loader = false;
    }
    else{
      this.tpmsHttp.retrieve(this.instanceId).subscribe(
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


  onSuccessSubmit(instance) {
    this.createSuccefull(instance);
    return super.onSuccessSubmit(instance);
  }

}
