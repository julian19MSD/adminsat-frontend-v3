import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { IShiftAssignmentDepartures, IShiftAssignmentDetails } from '@shared/models/shift-assignment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedShiftAssignmentDeparturesHttpService,  } from '@admin/shared/shift-assignment/services/http.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { hideLoader, strFormat } from '@shared/utils/general.utils';
import { ControlZoneDetailComponent } from '@admin/shared/control-zones/details/details.component';
import { API_URL } from '@shared/consts/api.consts';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { IGeneralObject } from '@shared/models/general.model';
import { DepartureMapComponent } from '@admin/shared/departure-maps/departures-map.component';

@Component({
  selector: 'adms-shift-assignment-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.scss'],
})
export class ShiftAssignmentDeparturesComponent extends CommonDestroy implements OnInit {
  loading = true;
  loadMap: boolean;
  instance: IShiftAssignmentDepartures[];
  formGroup = new FormGroup({
    observation: new FormControl(null, [Validators.required])
  })
  departureIndex: number;
  controlZoneWay: boolean;
  historicalFilters: any;
  controlZoneFeaturesUrl: string;
  permissions = PERMISSIONS;
  fullWidth: boolean;
  hasControlZones: boolean;
  hasLocations: boolean;
  formStatus: IGeneralObject;

  constructor(public dialogRef: MatDialogRef<ShiftAssignmentDeparturesComponent>,
    private dialog: MatDialog,
    private shiftDeparturesHttp: SharedShiftAssignmentDeparturesHttpService,
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    public formManageService: FormManageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {

    this.formManageService.getFormStatus(this.formGroup)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((errors) => {
        this.formStatus = errors;
      });

    this.shiftDeparturesHttp.departures(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe((res) => {

        this.instance = res;
        this.loading = false;

      },
        () => {
          this.dialogRef.close();
        });
  }


  /**
   * Abre un dialogo con el detalle de la zona de control
   *  id: Id de la zona de control
   */
  openDeparturesMaps(id: number): void {
    this.dialog.open(DepartureMapComponent, { data: { id, idDeparture: this.data.id }, panelClass: 'full-screen' });
  }

  /**
   * Ajusta la informacion para mostrar el campo de editar la fecha y hora de ingreso o salida de una geocerca.
   *  initial: Dato inicial
   *  ingressIndex: Indice si esta editando un ingreso.
   *  exitIndex: Indice si esta editando una salida.
   */
  editObservationDate(index: number, way: boolean) {
    this.departureIndex = index;
    const value =  this.instance[index].observation;
    this.formGroup.get('observation').reset(value);
  }

  /**
   * Cancela la edicion de fecha y hora de ingreso o salida de una geocerca.
   */
  cancelEditingObservationIndex() {
    this.departureIndex = null;
    this.controlZoneWay = null;
    this.formGroup.get('observation').reset(null);
  }

  // /**
  //  * Actualiza la informacion de la zona de control.
  //  */
  updateObservation() {
    hideLoader(false);
      const departureId = this.instance[this.departureIndex].id;
    //   const key = this.controlZoneWay ? 'hora_entrada' : 'hora_salida';

    this.shiftDeparturesHttp.updateObservation(this.data.id, departureId, this.formGroup.get('observation').value)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.instance[this.departureIndex] = { ...this.instance[this.departureIndex], ...res };
          this.cancelEditingObservationIndex();
        },
        (err) => {
          this.formGroup.get('observation').markAsTouched();
          // this.formGroup.get('observation').setErrors({ error: err.error.hora_entrada ? err.error.hora_entrada : err.error.hora_salida });
          hideLoader(true);
        },
        () => hideLoader(true));
  }

}
