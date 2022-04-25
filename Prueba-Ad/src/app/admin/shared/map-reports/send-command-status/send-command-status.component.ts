import {  Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { IListCommands } from '@shared/models/send-command.model';
import { MatTable } from '@angular/material/table';
import { SharedMapReportHttpService } from '../services/http.service';
import { CommandsDetailsComponent } from '@admin/shared/commands/details/details.component';
import { NotificationService } from '@core/services/notification/notification.service';


@Component({
  selector: 'adms-send-command-status',
  templateUrl: './send-command-status.component.html',
  styleUrls: ['./send-command-status.component.scss']
})
export class SendCommandStatusDialogComponent extends CommonDestroy {



  listCommands = Array<IListCommands>();
  displayedColumns: string[] = ['activo_nombre', 'equipo', 'comando_nombre', 'status', 'respuesta_msg', 'action'];



  constructor(
    public dialogRef: MatDialogRef<SendCommandStatusDialogComponent>,
    public dialog: MatDialog,
    private notificationService: NotificationService,    
    private mapReportHttp: SharedMapReportHttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
    this.listCommands = data;
  }


  
  openDetails(instance){
    this.dialog.open(CommandsDetailsComponent, { disableClose: true, data:{instance: instance},  panelClass: 'full-screen' })  }


  /**
  * actualiza el estado de los comandos enviados
  */
  updateStatusCommand() {
    
    var comandosEnviados = this.listCommands.map((command) => {
      return command.id;
    })
    this.mapReportHttp.updateStatusCommands({ ids: comandosEnviados })
      .subscribe(
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

        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
          })
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

}
