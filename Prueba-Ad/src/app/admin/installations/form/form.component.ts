import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { FormFieldsInstallations } from './installations.forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormGroup } from '@angular/forms';
import { STATIC_URL, API_URL } from '@shared/consts/api.consts';
import { IInstallationsRetrieve } from '@shared/models/installations.model';
import { IHttpParameters } from '@shared/models/form.model';
import { InstallationsHttpService } from '../services/http.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGeneralObject } from '@shared/models/general.model';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { take, takeUntil } from 'rxjs/operators';
import { IClientOption } from '@shared/models/client.model';
import { HttpClient } from '@angular/common/http';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';

@Component({
  selector: 'adms-installations-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class InstallationsCreateComponent extends CommonDestroy implements AfterViewInit {

  formStatus: IGeneralObject;


  loading = true;
  title : string = 'CREATE_INSTALLATION';
  actionButton : string ="CREATE";
  icons: any[] = [];


  formGroup = new FormGroup(cloneDeep(FormFieldsInstallations));
  @ViewChild('iconScroll') iconScroll: VirtualScrollerComponent;

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;
  clients: IClientOption[] = [];
  instance: IInstallationsRetrieve;


  httpParams: IHttpParameters = {
    method: 'post',
    url: API_URL.installations.general,
  };

  constructor(
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private httpClient: HttpClient,
    private cdRef: ChangeDetectorRef,
    public installationsHttp: InstallationsHttpService,
    public dialogRef: MatDialogRef<InstallationsCreateComponent>,
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
          this.cdRef.detectChanges();
        },
        () => {
          this.loading = false;
          this.cdRef.detectChanges();
        },
        () =>  this.getIcons() 
      );
  }

    /**
   * Obiene la lista de iconos.
   */
     private getIcons() {
      this.installationsHttp
        .getIcons()
        .pipe(take(1))
        .subscribe(
          (icons) => {
            this.icons = icons;
            this.getInstance();
          },
          () => {
            this.loading = false;
          this.cdRef.detectChanges();
          }
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
      this.cdRef.detectChanges();

    } else {
      this.title = 'EDIT_INSTALLATION';
      this.actionButton ="EDIT";
      this.httpParams.method = 'patch';
      this.httpParams.url = API_URL.installations.instance

      this.installationsHttp.retrieve(this.data.id).subscribe(
        (instance) => {
          this.formGroup.patchValue(instance);
          this.instance = instance;
          if(this.iconScroll){
            const iconIndex = this.icons.findIndex((x) => x.id === this.instance.icono);
            this.iconScroll.scrollToIndex(iconIndex, true)
          }
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
