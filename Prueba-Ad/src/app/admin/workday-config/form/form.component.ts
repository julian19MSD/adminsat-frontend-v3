import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CommonForm } from '@shared/commons/form.common';
import { API_URL, STATIC_URL } from '@shared/consts/api.consts';
import { IHttpParameters } from '@shared/models/form.model';
import { IFormHeaderState } from '@shared/models/header.model';
import { IWorkdayConfigRetrieve } from '@shared/models/workday-config.model';
import { hideLoader } from '@shared/utils/general.utils';
import { RootAction } from '@store/root.action';
import * as cloneDeep from 'lodash/cloneDeep';
import { map, take } from 'rxjs/operators';
import { WorkdayConfigHttpService } from '../services/http.service';
import { FormFieldsWorkdayConfig } from './workday-config.forms';

@Component({
  selector: 'adms-wworkday-config-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class WorkdayConfigCreateComponent extends CommonForm implements AfterViewInit {

  formHeaderData = {
    title: 'CREATE_WORKDAY_SETTING',
    backUrl: '/routes/workday-config',
    formId: 'workdayConfigForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;

  formGroup = new FormGroup(cloneDeep(FormFieldsWorkdayConfig));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;
  metricsAlias: any;


  instance: IWorkdayConfigRetrieve;

  changeTitle = 'EDIT_WORKDAY_SETTING';
  createUrl = '/routes/workday-config/form';


  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.routes.workday.config.general
    },
    update: {
      method: 'patch',
      url: API_URL.routes.workday.config.instance
    }
  };


  constructor(
    public store: Store<RootAction>,
    public workdayHttp: WorkdayConfigHttpService,
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
      .subscribe((info) => {
        this.metricsAlias = info
      });

  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.getClients();

  }

  clientLoaded() {
    hideLoader(true);
    this.getInstance();
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
        .pipe(
          map(i => {

            if (this.metricsAlias.velocity !== "km/h")
              i.rest_limit_speed = this.velocityConvert(i.rest_limit_speed)
            return i;
          })
        )
        .subscribe(
          (instance) => {

            this.formGroup.patchValue(instance);
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

  velocityConvert(vel): number {
    switch (this.metricsAlias.velocity) {
      case "mi/h":
        return Math.round(vel * 0.621371)
      case "kt":
        return Math.round(vel * 0.53995694);
      case "kt(UK)":
        return Math.round(vel * 0.5396118248377);
      default:
        return vel;
    }

  }


  velocityKmConvert(vel): number {
    switch (this.metricsAlias.velocity) {
      case "mi/h":
        return Math.round(vel * 1.60934);
      case "kt":
        return Math.round(vel * 1.852);
      case "kt(UK)":
        return Math.round(vel * 1.853184);
      default:
        return vel;
    }
  }

  onSuccessSubmit(instance) {
    if (this.metricsAlias.velocity !== "km/h")
      instance.rest_limit_speed = this.velocityConvert(instance.rest_limit_speed);
    this.createSuccefull(instance);
    return super.onSuccessSubmit(instance);

  }


  onSubmit($event: any) {
    if (this.metricsAlias.velocity !== "km/h") {
      var vel = this.formGroup.get('rest_limit_speed').value;
      this.formGroup.get('rest_limit_speed').setValue(this.velocityKmConvert(vel));
    }
    super.onSubmit($event);
  }



}
