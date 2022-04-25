import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonForm } from '@shared/commons/form.common';
import { API_URL } from '@shared/consts/api.consts';
import { IHttpParameters } from '@shared/models/form.model';
import { IFormHeaderState } from '@shared/models/header.model';
import * as cloneDeep from 'lodash/cloneDeep';
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';
import { WorkdayHttpService } from '../services/http.service';
import { formFieldsWorkday } from './workday.forms';


@Component({
  selector: 'app-workday-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class WorkdayCreateComponent extends CommonForm implements AfterViewInit {


  formHeaderData = {
    title: 'CREATE_WORKDAY',
    backUrl: '/routes/workday',
    formId: 'workdayForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;

  formGroup = new FormGroup(cloneDeep(formFieldsWorkday));
  roadActors: any[] = [];
  routes: any[] = [];
  shifts: any[] = [];
  assets: any[] = [];
  finalClients: any[] = [];


  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'

  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.routes.workday.general
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
    public workdayHttp: WorkdayHttpService
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
    this.watchShift();
    this.getClients();
  }



  onSuccessSubmit(instance) {
    this.formGroup.reset();
    this.router.navigate([this.formHeaderData.backUrl])

    return super.onSuccessSubmit(instance);
  }


  /**
 * Al cambiar el cliente trae nuevamente la informacion relacionada al cliente.
 */
  clientChanged(client: number) {
    this.loader = true;
    this.getAssets(client);
  }


  clientLoaded() {

    this.setClient();
  }

  /**
 * Obtiene la lista de activos
 * @param clientId: El id del cliente.
 */
  private getAssets(clientId: number) {
    this.workdayHttp.getAssets({ cliente: clientId })
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
        this.getShift(selectedValue);
      });
  }

  /**
   * Obtiene la lista de activos
   * @param idActivo: El id del activo.
   */
  private getShift(idActivo: number) {
    this.workdayHttp.getShift({ workday_available: idActivo })
      .pipe(take(1))
      .subscribe(
        shifts => {
          this.shifts = shifts;
          this.loader = false;
        },
        error => { this.loader = false })
  }


  /**
* Vigila si cambia el activo para traer nuevamente la informacion relacionada al activo.
*/
  watchShift() {
    this.formGroup.get('enturnamiento').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        this.loader = true;
        this.getRoadActors(selectedValue);
      });
  }

  /**
  * Obtiene la lista de actores viales
  * @param idEnturnamiento: El id del enturnamiento.
  */
  private getRoadActors(idEnturnamiento: number) {
    this.workdayHttp.getRoadActors({ enturnamiento__in: idEnturnamiento })
      .pipe(take(1))
      .subscribe(
        roadActors => {
          this.roadActors = roadActors;
          this.loader = false;
        },
        error => this.loader = false)

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



}
