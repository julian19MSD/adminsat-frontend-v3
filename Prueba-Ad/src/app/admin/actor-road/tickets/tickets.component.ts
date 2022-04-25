import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonForm } from '@shared/commons/form.common';
import { FormFieldsActorTickets } from './tickets.forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormGroup, Validators } from '@angular/forms';
import { IRoadActorTicket } from '@shared/models/road-actor.model';
import { IName } from '@shared/models/general.model';
import { IHttpParameters } from '@shared/models/form.model';
import { API_URL } from '@shared/consts/api.consts';
import {RootAction} from '@store/root.action';
import { Store } from '@ngrx/store';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { ActorTicketsHttpService } from '../services/http.service';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { requiredFileType } from '@shared/validators/form-validator';

@Component({
  selector: 'adms-actor-tickets-create',
  templateUrl: './tickets.component.html',
  styles: [
  ]
})
export class ActorTicketsCreateComponent extends CommonForm implements AfterViewInit {

  formGroup = new FormGroup(cloneDeep(FormFieldsActorTickets));
  title = 'NEW_TICKET';
  instance: IRoadActorTicket;
  documentsTypes: IName[] = [];
  assetsOptions = [];
  actionName = 'create';
  updateHeaderData = false;
  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.road_actor.tickets.general,
      formDataUrl: API_URL.road_actor.tickets.instance
    },
    update: {
      method: 'patch',
      url: API_URL.road_actor.tickets.instance
    }
  };

  filesUrl = {
    comparendo: null,
    comprobante_pago: null,
  };


  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ActorTicketsCreateComponent>,
    public adapter: DateAdapter<any>,
    public ticketHttp: ActorTicketsHttpService,
    public route: ActivatedRoute,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    super.ngAfterViewInit();

    if (this.data.ticketId) {
      this.instanceId = this.data.ticketId;
      this.httpParams.update.params = {id: this.data.ticketId};
      this.successMessages = 'UPDATE_SUCCESSFUL';
      this.title = 'EDIT_DOCUMENT';
      this.actionName = 'update';
    } else {
      this.httpParams.create.params = {actorId: this.data.actorId}
    }

    this.formGroup.get('actor_vial').setValue(this.data.actorId);
    this.watchPago()
    this.getInstance();
  }

    /**
 * Vigila se marca como pagado para que suba de forma obligatoria el recibo
 */
     watchPago() {

      this.formGroup.get('pago').valueChanges
        .pipe(
          filter((e: any) => !!e),
          distinctUntilChanged(),
          takeUntil(this.ngDestroyed$))
        .subscribe(selectedValue => {
          if(selectedValue){
          this.formGroup.get('comprobante_pago').setValidators([Validators.required, requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])])
          this.formGroup.get('comprobante_pago').updateValueAndValidity();
          }
          else{
          this.formGroup.get('comprobante_pago').clearValidators();
          this.formGroup.get('comprobante_pago').updateValueAndValidity();            
          }
        });
    }

  onSubmit($event: any): void {


    Object.keys(this.filesUrl).forEach(key => {

      if (this.filesUrl[key] !== null)
        this.formGroup.removeControl(key);
    })
    super.onSubmit($event);
  }


    /**
* Obtiene la lista de activos
*/
private getAssets(): void {
  this.loader = true;
  this.cdRef.detectChanges();
  var params: any = {};
    params = { cliente:  this.data.cliente.toString()}

  this.httpClient.get<any[]>(API_URL.asset.select, { params })
    .subscribe(
      res => {
        this.assetsOptions = res;

        
        this.endLoad();

      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
        this.endLoad();

      }
    );
}


  onFileChange(key: string, event: FileReader): void {
    const value = {};
    value[key] = event;
    this.formGroup.patchValue(value);
    this.formGroup.get(key).markAsTouched();
    this.filesUrl[key] = null;

  }

  getInstance(): void {

    if (this.instanceId) {
      this.ticketHttp.retrieve(this.data.ticketId)
        .subscribe(
          (instance) => {

            this.formGroup.patchValue(instance);

            this.instance = instance;
            Object.keys(this.filesUrl).forEach(key => {
              this.filesUrl[key] = instance[key]
            })
            
            this.getAssets();

          },
          () => this.endLoad()
        )
    } else {
      this.getAssets();
      this.endLoad();
    }
  }

  onSuccessSubmit(instance) {
    this.dialogRef.close(true);
    return super.onSuccessSubmit(instance);
  }

  private endLoad() {
    this.loader = false;
    this.cdRef.detectChanges();
  }


}
