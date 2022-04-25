import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '@core/services/notification/notification.service';
import { API_URL } from '@shared/consts/api.consts';
import { IClientOption } from '@shared/models/client.model';
import { IHttpParameters } from '@shared/models/form.model';
import { IGeneralObject, IName } from '@shared/models/general.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { distinctUntilChanged, filter, switchMap, take, takeUntil } from 'rxjs/operators';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormFieldsControlInstallations } from './control-installations.forms';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { ControlZonesWindowsHttpService, SharedMapReportHttpService } from '../services/http.service';
import { hideLoader } from '@shared/utils/general.utils';
import { LOADER_CONTENT } from '@shared/consts/loader';
import { CommonForm } from '@shared/commons/form.common';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { OperatingWindowsCreateComponent } from '../operating-windows/operating-windows.component';
import { MatDialog } from '@angular/material/dialog';
import { IControlZoneOperatingWindow } from '@shared/models/installations-control.models';
import { ActionConfirmComponent } from '@shared/components/action-confirm/action-confirm.component';

@Component({
  selector: 'adms-control-installations-create',
  templateUrl: './control-installations-create.component.html',
  styleUrls: ['./control-installations-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ControlInstallationsCreateComponent extends CommonForm implements AfterViewInit {

  @Input() instanceId: number;
  @Input() metricsAlias: any;
  @Input() disabled: boolean;
  @Input() drawCreated: any;


  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() successCompleted: EventEmitter<any> = new EventEmitter<any>();


  showButton = true;
  loaderContent = LOADER_CONTENT;
  actionName: string = "create";
  sinPoligono: boolean;

  formStatus: IGeneralObject;
  loader = true;
  title: string = 'CREATE_CONTROLZONE';
  actionButton: string = "CREATE";
  //TODO: CAMBIAR TIPADO
  instance: any;
  validateMail: string[] = [];
  assetsOptions = [];
  zones = [];
  installationsType = [];
  subzones = [];
  subinstallationsType = [];
  countrys = [];
  departments = [];
  municipalitys = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  difDias = 0;
  diasOperacion = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]

  formGroup = new FormGroup(cloneDeep(FormFieldsControlInstallations));
  clients: IClientOption[] = [];


  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.controlZone.general,
    },
    update: {
      method: 'patch',
      url: API_URL.controlZone.instance
    },
    validateMail: {
      method: 'post',
      url: API_URL.users.resendValidateMail,
    }
  };

  offset = new Date().getTimezoneOffset();
  panelOpenState = false;
  windowFormControl: FormControl = new FormControl();
  windowOptions: Array<IName> = [];
  window: IControlZoneOperatingWindow;

  constructor(
    public store: Store<RootAction>,
    public headerMessengerService: HeaderMessengerService,
    public formManageService: FormManageService,
    public translateService: TranslateService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public httpClient: HttpClient,
    public cdRef: ChangeDetectorRef,
    public route: ActivatedRoute,
    public router: Router,
    public httpWindows: ControlZonesWindowsHttpService,
    public mapHttpService: SharedMapReportHttpService,
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


  ngAfterViewInit() {
    if (this.instanceId) {
      this.actionName = "update";
      this.title = 'EDIT_CONTROLZONE';
      this.successMessages = 'UPDATE_SUCCESSFUL';
    };

    this.updateHeaderData = false;
    this.getClients()
    this.watchClient();
    this.watchZones();
    this.watchCountry();
    this.watchDepartment();
    this.watchInstallationsType();
    super.ngAfterViewInit();

    if (this.instanceId) {
      this.windowFormControl.valueChanges
        .pipe(
          takeUntil(this.ngDestroyed$),
          distinctUntilChanged()
        )
        .subscribe((selectedValue) => {
          if (selectedValue) {
            this.getWindow(selectedValue);
          } else {
            this.window = null;
          }
        });
    }

  }

  /**
   * conveirte la hora guardada UTC a la hora regional
   * @param time la hora a modificar
   * @param isStart si es la hora de inicio realiza el calculo de los dias segun la region
   * @returns el tiempo a la hora regional
   */
  convertTimeUTCTimeZone(time, isStart: boolean = false): string {

    let hh = time.substring(0, 2);
    let mm = time.substring(3, 5)

    let date = new Date(Date.UTC(1990, 1, 10, hh, mm, 0));

    if (isStart) {
      this.difDias = date.getDay() - date.getUTCDay();

    }

    return (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

  }

  /**
   * Obtiene la lista de ventanas operativas asociadas
   * id: El id del tipo de la ventana operativa
   */
  getWindow(id: number): void {
    this.loader = true;
    this.httpWindows.retrieve(this.instanceId, id).subscribe(
      (window) => {

        if (window) {
          window.start_time = this.convertTimeUTCTimeZone(window.start_time, true);
          window.end_time = this.convertTimeUTCTimeZone(window.end_time);

          for (var i = 0; i <= 6; i++) {

            if (window['day_' + i]) {

              if (i + this.difDias > 6) {
                let day = i - this.difDias - 5;
                this.diasOperacion[day] = true;


              }
              else if (i + this.difDias < 0) {
                let day = 7 + i + this.difDias;
                this.diasOperacion[day] = true;


              } else {
                this.diasOperacion[i + this.difDias] = true;


              }
            }

          }


          this.window = window;
        }
        this.loader = false;
        this.cdRef.detectChanges();

      },
      () => {
        this.loader = false
        this.cdRef.detectChanges();

      }
    );
  }


  onSuccessSubmit(instance) {
    if (this.actionName === 'create') {

      this.instanceId = instance.id;
      this.actionName = "update";
      this.title = 'EDIT_CONTROLZONE';
      this.successMessages = 'UPDATE_SUCCESSFUL';
      this.httpParams.update.params = { id: this.instanceId };
    }
    this.createSuccefull(instance);
    return super.onSuccessSubmit(instance);
  }


  /**
 * Agrega todos los items del select.
 */
  addAll(filtro: string, itemForm: string) {

    //const items = [];
    this.formGroup.get(itemForm)
      .patchValue(
        this[filtro].map((actor) => {
          return actor.id;
        })
      );
  }


  /**
 * Vigila si cambia el cliente para traer nuevamente la informacion relacionada al cliente.
 */
  watchClient() {

    this.formGroup.get('cliente').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        this.loader = true;
        this.getAssets(selectedValue)
      }, () => {
        this.loader = false;
      }
      );
  }

  /**
  * Vigila si cambia de zona para traer las subzonas
  */
  watchZones() {

    this.formGroup.get('zone').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        if (selectedValue === null) {

          this.subzones = [];
          this.formGroup.get("sub_zone").setValue(null);
          this.cdRef.detectChanges();

        }
        else {
          this.getSubzones(selectedValue)
          this.loader = true;
        }
      });
  }


  /**
   * Agrega o edita ventanas operativas a la zona de control
   */
  addEditWindowsOperatings(id: number = null) {

    const component = OperatingWindowsCreateComponent;
    this.dialog
      .open(component, {
        data: { zoneId: this.instanceId, clientId: this.instance.cliente, windowId: id },
        disableClose: true
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((e) => !!e)
      )
      .subscribe(() => {
        this.getWindowsOptions();
      }
      );
  }



  /**
  * Vigila si cambia de tipo de instalacion para traer las subintalaciones
  */
  watchInstallationsType() {

    this.formGroup.get('installation_type').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        if (selectedValue === null) {
          this.subinstallationsType = [];
          this.formGroup.get("sub_installation_type").setValue(null);
          this.cdRef.detectChanges();

        }
        else {
          this.loader = true;
          this.getSubnstallationsType(selectedValue)

        }
      });
  }


  /**
* Vigila si cambia de pais
*/
  watchCountry() {

    this.formGroup.get('country').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        this.formGroup.get("department").setValue(null);
        this.formGroup.get("municipality").setValue(null);
        if (selectedValue === null) {
          this.departments = [];
          this.municipalitys = [];
          this.cdRef.detectChanges();

        }
        else {
          this.loader = true;
          this.getDepartment(selectedValue)

        }
      });
  }



  /**
* Vigila si cambia de pais
*/
  watchDepartment() {

    this.formGroup.get('department').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        this.formGroup.get("municipality").setValue(null);
        if (selectedValue === null) {
          this.departments = [];
          this.municipalitys = [];
          this.cdRef.detectChanges();

        }
        else {
          this.loader = true;
          this.getMunicipality(selectedValue)

        }
      });
  }

  private getCountry() {

    this.mapHttpService.getCountry().subscribe(
      res => {
        this.countrys = res;
        this.getInstance();
        // this.loader = false;
        // this.cdRef.detectChanges();

      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
        this.loader = false;
        this.cdRef.detectChanges();

      },
    )
  }

  private getMunicipality(department: number) {

    this.mapHttpService.getMunicipality({ department: department.toString() }).subscribe(
      res => {
        this.municipalitys = res;
        this.loader = false;
        this.cdRef.detectChanges();

      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
        this.loader = false;
        this.cdRef.detectChanges();

      },
    )
  }

  

  private getDepartment(country: number) {

    this.mapHttpService.getDepartment({ country: country.toString() }).subscribe(
      res => {
        this.departments = res;
        this.loader = false;
        this.cdRef.detectChanges();

      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
        this.loader = false;
        this.cdRef.detectChanges();

      },
    )
  }




  /**
* Obtiene la lista de activos
*/
  private getAssets(clientId: number): void {

    this.httpClient.get<any[]>(API_URL.asset.select, { params: { cliente: clientId.toString() } })
      .subscribe(
        res => {
          this.assetsOptions = res;
          this.getZones(clientId)
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          this.loader = false;
          this.cdRef.detectChanges();

        }
      )
  }

  private getZones(clientId: number) {

    this.mapHttpService.getZones({ cliente: clientId.toString() }).subscribe(
      res => {
        this.zones = res;
        this.getInstallationsType(clientId);
      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
        this.loader = false;
        this.cdRef.detectChanges();

      },
    )
  }
  private getSubzones(zone: number) {

    this.mapHttpService.getSubzones({ zone: zone.toString() }).subscribe(
      res => {
        this.subzones = res;
        this.loader = false;
        this.cdRef.detectChanges();

      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
        this.loader = false;
        this.cdRef.detectChanges();

      },
    )
  }

  private getInstallationsType(clientId: number) {

    this.mapHttpService.getInstallationsType({ cliente: clientId.toString() }).subscribe(
      res => {
        this.installationsType = res;   
        this.loader = false;
        this.cdRef.detectChanges();

      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
        this.loader = false;
        this.cdRef.detectChanges();

      },
    )
  }

  private getSubnstallationsType(installation_type: number) {

    this.mapHttpService.getSubinstallationsType({ installation_type: installation_type.toString() }).subscribe(
      res => {
        this.subinstallationsType = res;
        this.loader = false;
        this.cdRef.detectChanges();

      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err);
        this.loader = false;
        this.cdRef.detectChanges();

      },
    )
  }



  clientLoaded() {
    this.getCountry();

    // this.getInstance();

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
      this.cdRef.detectChanges();

    } else {

      this.httpParams.update.params = { id: this.instanceId };
      this.mapHttpService.retrieveControlInstallations(this.instanceId).subscribe(
        (instance) => {
          this.formGroup.patchValue(instance);
          this.instance = instance;
          this.getWindowsOptions();
          this.cdRef.detectChanges();

        },
        (err) => {
          this.loader = false;
          this.cdRef.detectChanges();
          this.notificationService.sendErrorNotification({}, err)
        }
      );
    }
  }


  /**
 * Obtiene la lista de tipos de documento asociados al activo.
 */
  getWindowsOptions(): void {
    this.loader = true;
    this.httpWindows.select(this.instanceId).subscribe(
      (docs) => {
        this.windowOptions = docs;
        if (this.windowFormControl.value) {
          this.getWindow(this.windowFormControl.value);
        } else {
          this.loader = false;
        }
        this.cdRef.detectChanges();
      },
      () => {
        this.loader = false
        this.cdRef.detectChanges();

      }
    );
  }

  /**
   * Elimina un documento asociado al activo.
   * @id: El Id del documento.
   */
  deleteWindow(id: number) {
    this.dialog
      .open(ActionConfirmComponent, { panelClass: 'notification' })
      .afterClosed()
      .pipe(
        take(1),
        filter((e: any) => !!e),
        switchMap(() => {
          hideLoader(false);
          return this.httpWindows.delete(this.instanceId, id);
        })
      )
      .subscribe(
        () => {
          this.notificationService.sendSuccessNotification({}, 'DELETED_SUCCESSFUL');
          this.windowFormControl.reset(null)
          this.getWindowsOptions();
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err)
        }
      );
  }






  /**
 * Envio del formulario de edicion/creacion.
 * @param $event: El evento submit
 */
  onSubmit($event: any) {
    hideLoader(false)

    if (this.drawCreated) {

      switch (this.drawCreated.type) {

        case google.maps.drawing.OverlayType.RECTANGLE:
          this.formGroup.get('punto').reset(null);
          this.formGroup.get('radio_punto').reset(null);
          this.formGroup.get('poligono').setValue(this.drawCreated.data.geometry);

          break;

        case google.maps.drawing.OverlayType.POLYLINE:
          this.formGroup.get('punto').reset(null);
          this.formGroup.get('radio_punto').reset(null);
          this.formGroup.get('poligono').setValue(this.drawCreated.data.geometry);

          break;

        case google.maps.drawing.OverlayType.POLYGON:
          this.formGroup.get('punto').reset(null);
          this.formGroup.get('radio_punto').reset(null);
          this.formGroup.get('poligono').setValue(this.drawCreated.data.geometry);
          break;

        case google.maps.drawing.OverlayType.CIRCLE:
          this.formGroup.get('poligono').setValue(this.drawCreated.data.geometry);
          this.formGroup.get('punto').setValue(this.drawCreated.data.center);
          this.formGroup.get('radio_punto').setValue(this.drawCreated.data.radius);
          break;
      }
    }
    else {
      this.formGroup.get('poligono').reset(null);
      this.formGroup.get('punto').reset(null);
      this.formGroup.get('radio_punto').reset(null);
    }

    if (!this.formGroup.get('poligono').valid) {
      this.sinPoligono = true;
      this.loader = false;
    }

    super.onSubmit($event);
    this.cdRef.detectChanges();



  }

  closeForm(fitMap: boolean) {
    this.showButton = false;
    this.loader = true;
    setTimeout(() => this.onClose.emit(fitMap), 50);
    this.cdRef.detectChanges();

  }


  onValidateMailSubmit(mail: string) {
    hideLoader(false);
    const mailForm = new FormGroup({ correo: new FormControl(mail) });
    this.formManageService
      .submitForm(mailForm, this.httpParams.validateMail)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.notificationService.sendSuccessNotification({}, null, null, [mail]);
        hideLoader(true);

      }, err => {
        this.notificationService.sendErrorNotification({}, err);
        hideLoader(true);

      });
  }

  getMailError(value: string) {
    return this.validateMail.includes(value)
      ? 'MAIL_VALIDATION_ERROR_FIELD'
      : '';
  }
}


