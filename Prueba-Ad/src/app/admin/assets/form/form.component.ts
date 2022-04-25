import {AfterViewInit, ChangeDetectorRef, Component, ViewChild,} from '@angular/core';
import {CommonForm} from '@shared/commons/form.common';
import * as cloneDeep from 'lodash/cloneDeep';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';

import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {IFormHeaderState} from '@shared/models/header.model';
import {FormFieldsAsset as formFieldsAsset, FormRequiredFieldsAsset,} from './asset.forms';
import {FormControl, FormGroup} from '@angular/forms';
import {API_URL, STATIC_URL} from '@shared/consts/api.consts';
import {IAssetChoices, IAssetDocument, IAssetRetrieve,} from '@shared/models/assets.model';
import {RootAction} from '@store/root.action';
import {distinctUntilChanged, filter, switchMap, take, takeUntil,} from 'rxjs/operators';
import {hideLoader} from '@shared/utils/general.utils';
import {AssetDocumentsHttpService, AssetHttpService,} from '../services/http.service';
import {ActionConfirmComponent} from '@shared/components/action-confirm/action-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {VirtualScrollerComponent} from 'ngx-virtual-scroller';
import {IHttpParameters} from '@shared/models/form.model';
import {AssetDocumentsCreateComponent} from '@admin/assets/documents/documents.component';
import {IName} from '@shared/models/general.model';

@Component({
  selector: 'adms-asset-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class AssetCreateComponent extends CommonForm implements AfterViewInit {
  formHeaderData = {
    title: 'CREATE_ASSET',
    backUrl: '/assets',
    formId: 'assetForm',
    defaultActionText: 'SAVE'
  } as IFormHeaderState;
  formGroup = new FormGroup(cloneDeep(formFieldsAsset));

  successMessages = 'CREATED_SUCCESSFUL';
  actionName = 'create'
  staticUrl = STATIC_URL;

  choices: IAssetChoices = {} as IAssetChoices;
  vehicleTypes: IName[] = [];
  icons: any[] = [];
  devices: IName[] = [];
  instance: IAssetRetrieve;
  metricsAlias: any;

  changeTitle = 'EDIT_ASSET';
  createUrl = '/assets/form';

  documentFormControl: FormControl = new FormControl();
  documentOptions: Array<IName> = [];
  documents: Array<IAssetDocument> = [];
  @ViewChild('iconScroll') iconScroll: VirtualScrollerComponent;

  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.asset.general,
      formDataUrl: API_URL.asset.instance
    },
    update: {
      method: 'patch',
      url: API_URL.asset.instance
    }
  };

  constructor(
    public store: Store<RootAction>,
    public assetHttp: AssetHttpService,
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public documentHttp: AssetDocumentsHttpService,
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
    this.watchAssetType();
    this.getClients();

    if (this.instanceId) {
      this.documentFormControl.valueChanges
        .pipe(
          takeUntil(this.ngDestroyed$),
          distinctUntilChanged()
        )
        .subscribe((selectedValue) => {
          if (selectedValue) {
            this.getDocuments(selectedValue);
          } else {
            this.documents = [];
          }
        });
    }
  }

  /**
   * Una vez cargada la lista de clientes, prosigue a traer los choices.
   */
  clientLoaded() {
    this.getChoices();
  }

  /**
   * Al cambiar el cliente trae la informacion relacionada al cliente seleccionado.
   */
  clientChanged(client: number) {
    this.getSelectors(client);
  }

  /**
   * Agrega  al activo todos los equipos del selector.
   */
  addAllDevices(): void {
    const devices = this.devices.map((item) => item.id);
    this.formGroup.get('equipos').patchValue(devices);
  }

  /**
   * Abre un dialogo con el formulario de crear documento.
   */
  addEditDocument(id: number = null): void {
    const component = AssetDocumentsCreateComponent;
    this.dialog
      .open(component, {
        data: {assetId: this.instanceId, documentId: id},
        disableClose: true
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((e) => !!e)
      )
      .subscribe(() => this.getDocumentsOptions());
  }

  /**
   * Elimina un documento asociado al activo.
   * @id: El Id del documento.
   */
  deleteDocument(id: number) {
    this.dialog
      .open(ActionConfirmComponent, {panelClass: 'notification'})
      .afterClosed()
      .pipe(
        take(1),
        filter((e: any) => !!e),
        switchMap(() => {
          hideLoader(false);
          return this.documentHttp.delete(this.instanceId, id);
        })
      )
      .subscribe(
        () => {
          this.notificationService.sendSuccessNotification({}, 'DELETED_SUCCESSFUL');
          this.getDocuments(this.documentFormControl.value);
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err)
        }
      );
  }

  /**
   * Obtiene la lista de tipos de documento asociados al activo.
   */
  getDocumentsOptions(): void {
    this.loader = true;
    this.documentHttp.select(this.instanceId).subscribe(
      (docs) => {
        this.documentOptions = docs;
        if (this.documentFormControl.value) {
          this.getDocuments(this.documentFormControl.value);
        } else {
          this.loader = false;
        }
      },
      () => (this.loader = false)
    );
  }

  /**
   * Obtiene la lista de documentos asociados, segun el tipo de documento recibido.
   * id: El id del tipo de documento
   */
  getDocuments(id: number): void {
    this.loader = true;
    this.documentHttp.list(this.instanceId, {tipo_documento: id}).subscribe(
      (documents) => {
        this.documents = documents;
        this.loader = false;
      },
      () => (this.loader = false)
    );
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
      this.assetHttp.retrieve(this.instanceId).subscribe(
        (instance) => {
          this.formGroup.patchValue(instance);
          this.instance = instance;
          const iconIndex = this.icons.findIndex((x) => x.id === this.instance.icono);
          this.iconScroll.scrollToIndex(iconIndex, true);
          this.getDocumentsOptions();
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

  // onSubmit($event){
  // }
  
  /**
   * Obiene la lista de las opciones de los diferentes selectores del modulo.
   */
  private getChoices(): void {
    this.assetHttp
      .getChoices()
      .pipe(take(1))
      .subscribe(
        (choices) => {
          this.choices = choices;
          this.getVehicleTypes();
        },
        () => (this.loader = false)
      );
  }

  /**
   * Obiene la lista de tipos de vehiculos.
   */
  private getVehicleTypes() {
    this.assetHttp
      .getVehicleTypes()
      .pipe(take(1))
      .subscribe(
        (vehicleTypes) => {
          this.vehicleTypes = vehicleTypes;
          this.getIcons();
        },
        () => (this.loader = false)
      );
  }

  /**
   * Obiene la lista de iconos.
   */
  private getIcons() {
    this.assetHttp
      .getIcons()
      .pipe(take(1))
      .subscribe(
        (icons) => {
          this.icons = icons;
          this.getInstance();
        },
        () => (this.loader = false)
      );
  }

  /**
   * Obtiene las diferentes listas de seleccion a partir de cliente recibido.
   * clientId: Un id de cliente.
   */
  private getSelectors(clientId: number) {
    this.loader = true;
    const param: { cliente: number; activo__unlink: boolean | number } = {
      cliente: clientId,
      activo__unlink: true,
    };
    if (this.instanceId) {
      param.activo__unlink = this.instanceId;
    }

    this.assetHttp
      .getDevices(param)
      .pipe(take(1))
      .subscribe(
        (devices) => {
          this.devices = devices;
          this.loader = false;
        },
        () => (this.loader = false)
      );
  }

  /**
   * Vigila si cambia el tipo de activo para cambiar los campos requeridos en el formulario.
   */
  private watchAssetType(): void {
    this.formGroup
      .get('tipo_activo')
      .valueChanges.pipe(takeUntil(this.ngDestroyed$))
      .subscribe((typeAsset) => {
        FormRequiredFieldsAsset.forEach((key) => {
          if (typeAsset === 1) {
            this.formGroup.get(key).disable();
          } else if (typeAsset === 0) {
            this.formGroup.get(key).enable();
          }
        });
      });
  }
}
