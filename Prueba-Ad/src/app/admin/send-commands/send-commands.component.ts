import { Component, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonForm } from '@shared/commons/form.common';
import { IFormHeaderState } from '@shared/models/header.model';
import { API_URL } from '@shared/consts/api.consts';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep'
import {  FormFieldsSendCommands } from './send-commands.forms';
import { SendCommandsHttpService } from './services/http.service'
import { distinctUntilChanged, filter, map, take, takeUntil } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { IListCommands, ISendCommandDeviceSelect, ITypesSendCommands } from '@shared/models/send-command.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomCommandComponent } from './custom-command/custom-command.component';
import { CommandsDetailsComponent } from '@admin/shared/commands/details/details.component';
import { IClientOption } from '@shared/models/client.model';


@Component({
  selector: 'app-send-commands',
  templateUrl: './send-commands.component.html',
  styleUrls: ['./send-commands.component.scss']
})
export class SendCommandsComponent extends CommonForm implements AfterViewInit {

  formHeaderData = {
    title: 'COMMANDS',
    formId: 'sendCommandsForm',
    defaultActionText: 'REQUEST',
  } as IFormHeaderState


  sort: number = 0;
  nCustom: number = 0;

  httpParams = {
    request: {
      method: 'post',
      url: API_URL.auditoria_commands.general,
    }
  };
  actionName = 'request';
  formGroup = new FormGroup(cloneDeep(FormFieldsSendCommands));

  deviceOptions = [];
  devicesOptions = [];
  commandsOptions = [];
  commandsSelected = [];
  commandsCustom = [];
  listCommands = Array<IListCommands>();
  idCliente: number;
  canUpdateList = false;

  @ViewChild(MatTable, { static: true }) myTable: MatTable<any>;
  displayedColumns: string[] = ['activo_nombre', 'equipo', 'comando_nombre', 'status', 'respuesta_msg','action'];

  traducciones = { sinActivo: "", sinEnviar: "" }


  reportSelected: ITypesSendCommands;
  deviceTypeDisable = true;


  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private sendCommandsHttp: SendCommandsHttpService,
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


    this.translateService.get(['WITHOUT_ASSOCIATED_ASSETS', 'WITHOUT_SEND'])
      .pipe(
        take(1)
      )
      .subscribe(
        (res) => {
          this.traducciones.sinActivo = res.WITHOUT_ASSOCIATED_ASSETS;
          this.traducciones.sinEnviar = res.WITHOUT_SEND;

          this.watchClient();
          this.getClients();
          this.watchTypeDevice();
          this.watchCommands;
          this.watchDevice();
          super.ngAfterViewInit();
        });
  }


  /**
  * Funcion pensada para ser que cada modulo defina una accion cuando se cargue la lista de clientes.
  *
  */
  clientLoaded() {
    this.loader = false;
  }


  addCommand() {
    
    var cliente = this.clients.find(cO => cO.id == this.formGroup.get('cliente').value)

    this.formGroup.get('device').value.forEach(device => {

      this.formGroup.get('commandsId').value.forEach(c => {

        var command = null;
        if (typeof c === 'object')
          command = c;
        else {
          command = this.commandsOptions.find(cO => cO.id == c)
        }
        var foundDevice = this.devicesOptions.find(dO => dO.id == device)

        this.sort++;

        var commandsort = {
          id: null,
          status_nombre: this.traducciones.sinEnviar,
          cliente: cliente.id,
          client_name: cliente.nombre,
          device: foundDevice.id,
          identifier: foundDevice.identificador,
          asset_name: foundDevice.activo_nombre,
          activo: foundDevice.activo_id,
          command_type: command.id === 0 ? null : command.id,
          technical_command: command.comando_nombre,
          command: command.nombre,
          order: this.sort,
          technical_response: "",
          response_message: "",

        } as IListCommands;

        this.listCommands.push(commandsort);

      });
    });

    this.formGroup.get('device').reset([]);
    this.formGroup.get('commandsId').reset([]);
    this.formGroup.get('device_type').reset(null);

    this.myTable.renderRows();

  }

  deleteRowData(row_obj) {
    this.listCommands = this.listCommands.filter((value, key) => {
      return value.order != row_obj;
    });
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


  clientChanged(client: number) {    
    this.idCliente = client;
    this.deviceOptions = null;
    this.commandsOptions = null;

    this.formGroup.get('device_type').reset(null);
    this.formGroup.get('device').reset([]);
    this.formGroup.get('commandsId').reset([]);


    this.formGroup.get('device').disable();
    this.formGroup.get('commandsId').disable();

    this.getTypes(client);
  };

  getTypes(client: number) {
    this.formGroup.get('device_type').enable();
    this.loader = true;
    this.sendCommandsHttp.getTiposEquipos({ cliente: client.toString() })
      .subscribe(
        (types) => {
          this.deviceOptions = types;
        },
        (err) => {
            this.notificationService.sendErrorNotification({}, err);
            this.loader = false
          },
        () => (this.loader = false)

      );
  }


  watchTypeDevice() {

    this.formGroup.get('device_type').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        this.loader = true;
        this.sendCommandsHttp.getComandos({ tipo_equipo__in: selectedValue })
          .subscribe(
            (comands) => {

              this.commandsOptions = comands;

            },
            (err) => {
              this.notificationService.sendErrorNotification({}, err);
              this.loader = false
            },
            () => (this.getEquipos(selectedValue))

          )

      });

  }


  watchDevice() {

    this.formGroup.get('device').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        if (selectedValue.length > 0)
          this.formGroup.get('commandsId').enable();
        else
          this.formGroup.get('commandsId').disable();

      });

  }

  getEquipos(selectedValue) {
    this.sendCommandsHttp.getEquipos({ cliente: this.idCliente, tipo_equipo: selectedValue })
      .pipe(
        map((devices: ISendCommandDeviceSelect[]) => {
          devices.map(device => {
            device.nombre = (device.activo_nombre ?? this.traducciones.sinActivo) + " (" + device.identificador + ")";
          })
          return devices
        })
      )
      .subscribe(
        (device) => {
          this.devicesOptions = device;
          this.formGroup.get('device').enable();


        },
        () => (this.loader = false),
        () => (this.loader = false)
      )
  }



  watchCommands() {

    this.formGroup.get('commandsId').valueChanges
      .pipe(
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        this.loader = true;

      });

  }

  /**
   * actualiza el estado de los comandos enviados
   */
  updateStatusCommand() {
    this.loader = true;
    var comandosEnviados = [];
    this.listCommands.forEach((command) => {
      if (command.id !== null)
        comandosEnviados.push(command.id)

    })
    this.sendCommandsHttp.updateStatusCommands({ ids: comandosEnviados })
      .pipe(
        take(1)
      ).subscribe(
        (res) => {
          res.forEach(command => {

            var comandoEncontrado = this.listCommands.find(cl => cl.id == command.id)
            if (comandoEncontrado) {
              comandoEncontrado.response_message = command.response_message;
              comandoEncontrado.status_nombre = command.status_nombre;
              comandoEncontrado.retries = command.retries;
              comandoEncontrado.status = command.status;
              comandoEncontrado.technical_response = command.technical_response;
            }
          })

          this.myTable.renderRows();

          this.loader = false;
        },
        (err) => { this.loader = true; })
  }

  /**
* Es llamando por el formulario para iniciar el envio del mismo.
*/
  onSubmit($event: any): void {

    var comandosPendientes = [];
    this.listCommands.forEach((command) => {
      if (command.id == null)
        comandosPendientes.push(command)

    })
    this.formGroup.get('commands').setValue(comandosPendientes)
    super.onSubmit($event);
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



  onSuccessSubmit(res) {

    this.canUpdateList = true;
    this.listCommands = this.listCommands.filter(command => command.id !== null)

    this.listCommands = this.listCommands.concat(res)

    this.myTable.renderRows();
    this.formGroup.get('commands').reset([]);
    return super.onSuccessSubmit(res)


  }

  openDetails(instance){
    this.dialog.open(CommandsDetailsComponent, { disableClose: true, data:{instance: instance},  panelClass: 'full-screen' })  }


  addCustomCommand() {

    this.dialog.open(CustomCommandComponent, { disableClose: true })
      .afterClosed()
      .pipe(
        take(1)
      )
      .subscribe((result) => {
        if(result.comando_nombre){
        result.id = 0;
        result.nCustom = this.nCustom++;
        result.custom = true;
        var previewCommands = this.formGroup.get('commandsId').value
        previewCommands.push(result)
        this.formGroup.get('commandsId').reset([]);
        this.formGroup.get('commandsId').setValue(previewCommands)
        }
      });
  }

}
