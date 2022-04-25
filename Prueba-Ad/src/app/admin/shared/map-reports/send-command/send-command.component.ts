import {  Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep'
import { FormFieldsSendCommands } from './send-commands.forms';
import { CommonDestroy } from '@shared/commons/destroy.common';
import {   take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IListCommands } from '@shared/models/send-command.model';

@Component({
  selector: 'adms-send-command',
  templateUrl: './send-command.component.html',
  styleUrls: ['./send-command.component.scss']
})
export class SendCommandDialogComponent extends CommonDestroy implements OnInit {

  commands = {};
  sort: number = 0;
  formGroup = new FormGroup(cloneDeep(FormFieldsSendCommands));
  listCommands = Array<IListCommands>();
  traducciones = { sinActivo: "", sinEnviar: "" }


  constructor(
    public dialogRef: MatDialogRef<SendCommandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translateService: TranslateService,
  ) {
    super();
  }


  ngOnInit(): void {

    this.translateService.get(['WITHOUT_ASSOCIATED_ASSETS', 'WITHOUT_SEND'])
      .pipe(
        take(1)
      )
      .subscribe(
        (res) => {
          this.traducciones.sinActivo = res.WITHOUT_ASSOCIATED_ASSETS;
          this.traducciones.sinEnviar = res.WITHOUT_SEND;

        });

  }



  sendCommands() {

    this.formGroup.get('commandsId').value.forEach(c => {
      var command = null;

      command = this.data.commands.comandos.find(cO => cO.id == c)
      this.sort++;

      var commandsort = {
        id: null,
        status_nombre: this.traducciones.sinEnviar,
        cliente: this.data.cliente.id,
        client_name: this.data.cliente.name,
        device: this.data.commands.equipo_id,
        identifier: this.data.commands.identificador,
        activo: this.data.activo,
        command_type: command.comando_equipo_id,
        technical_command: command.comando,
        command: command.nombre,
        order: this.sort,
        technical_response: "",
        response_message: "",

      } as IListCommands;

      this.listCommands.push(commandsort);


    })

    this.dialogRef.close(this.listCommands);
  }



  /**
 * Agrega todos los items del select.
 */
  addAll(itemForm: string) {

    const items = [];
    this.formGroup.get(itemForm)
      .patchValue(
        this.data.commands.comandos.map((command) => {
          return command.id;
        })
      );
  }





  closeDialog(): void {
    this.dialogRef.close();
  }

}
