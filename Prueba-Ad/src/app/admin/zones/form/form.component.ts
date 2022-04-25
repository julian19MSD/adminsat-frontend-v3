import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormFieldsZones } from './zones.forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormGroup } from '@angular/forms';
import { STATIC_URL, API_URL } from '@shared/consts/api.consts';
import { IZonesRetrieve } from '@shared/models/zones.model';
import { IHttpParameters } from '@shared/models/form.model';
import { ZonesHttpService } from '../services/http.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGeneralObject } from '@shared/models/general.model';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { takeUntil } from 'rxjs/operators';
import { IClientOption } from '@shared/models/client.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'adms-zones-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ZonesCreateComponent extends CommonDestroy implements AfterViewInit {

  formStatus: IGeneralObject;


  loading = true;
  title : string = 'CREATE_ZONE';
  actionButton : string ="CREATE";


  formGroup = new FormGroup(cloneDeep(FormFieldsZones));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;
  clients: IClientOption[] = [];
  instance: IZonesRetrieve;


  httpParams: IHttpParameters = {
    method: 'post',
    url: API_URL.zones.general,
  };

  constructor(
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private httpClient: HttpClient,
    private cdRef: ChangeDetectorRef,
    public zonesHttp: ZonesHttpService,
    public dialogRef: MatDialogRef<ZonesCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    super();

  }


  ngAfterViewInit() {
    this.formManageService.getFormStatus(this.formGroup)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((errors) => {
        this.formStatus = errors;
        this.cdRef.detectChanges();
      });
    this.getClients()

  }


  /**
 * Obiene la lista de clientes del usuario.
 */
  getClients(): void {
    this.loading = true;
    this.cdRef.detectChanges();

    this.httpClient.get<IClientOption[]>(API_URL.client.select)
      .subscribe(
        clients => {
          this.clients = clients;
          this.loading = false;
          this.cdRef.detectChanges();
        },
        () => {
          this.loading = false;
          this.cdRef.detectChanges();
        },
        () => this.getInstance()
      );
  }




  onSubmit($event: any) {
    $event.preventDefault();
    this.httpParams.params = { id: this.data.id };

    this.formManageService
      .submitForm(this.formGroup, this.httpParams)
      .subscribe(() => this.dialogRef.close(true),
        (err) => {
          this.notificationService.sendErrorNotification({}, err)
        }
      )
  }

  /**
 * Obtiene la informacion de la instancia.
 */
  getInstance(): void {
    if (!this.data.id) {
      if (1 === this.clients.length) {
        this.formGroup.get('cliente').setValue(this.clients[0].id);
      }
      this.loading = false;
    } else {
      this.title = 'EDIT_ZONE';
      this.actionButton ="EDIT";
      this.httpParams.method = 'patch';
      this.httpParams.url = API_URL.zones.instance
      this.zonesHttp.retrieve(this.data.id).subscribe(
        (instance) => {
          this.formGroup.patchValue(instance);
          this.instance = instance;
          this.loading = false;
          this.cdRef.detectChanges();

        },
        (err) => {
          this.loading = false;
          this.cdRef.detectChanges();
          this.notificationService.sendErrorNotification({}, err)
        }
      );
    }
  }


}
