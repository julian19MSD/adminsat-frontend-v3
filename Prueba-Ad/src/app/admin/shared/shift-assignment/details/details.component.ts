import {Component, Inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {take, takeUntil} from 'rxjs/operators';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IShiftAssignmentDetails} from '@shared/models/shift-assignment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SharedShiftAssignmentDetailsHttpService} from '@admin/shared/shift-assignment/services/http.service';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {hideLoader, strFormat} from '@shared/utils/general.utils';
import {ControlZoneDetailComponent} from '@admin/shared/control-zones/details/details.component';
import {API_URL} from '@shared/consts/api.consts';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {IGeneralObject} from '@shared/models/general.model';

@Component({
  selector: 'adms-shift-assignment-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class ShiftAssignmentDetailsComponent extends CommonDestroy implements OnInit {
  loading = true;
  loadMap: boolean;
  instance: IShiftAssignmentDetails = {} as IShiftAssignmentDetails;
  formGroup = new FormGroup({
    newDate: new FormControl(null, [Validators.required])
  })
  controlZoneIndex: number;
  controlZoneWay: boolean;
  historicalFilters: any;
  controlZoneFeaturesUrl: string;
  permissions = PERMISSIONS;
  fullWidth: boolean;
  hasControlZones: boolean;
  hasLocations: boolean;
  formStatus: IGeneralObject;

  constructor(public dialogRef: MatDialogRef<ShiftAssignmentDetailsComponent>,
              private dialog: MatDialog,
              private shiftDetailsHttp: SharedShiftAssignmentDetailsHttpService,
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

    this.shiftDetailsHttp.details(this.data.id, this.data.params.enCurso)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe((res) => {
          this.instance = res;
          this.controlZoneFeaturesUrl = strFormat(API_URL.routes.shiftAssignment.controlZone.features, {id: this.instance.id});
          this.historicalFilters = {
            desde: this.instance.fecha_hora_inicio_real_iso || this.instance.fecha_hora_inicio_iso,
            hasta: this.instance.fecha_hora_fin_iso || new Date(),
            activos: [this.instance.activo],
            enturnamiento: this.instance.id,
            cliente: this.instance.cliente
          };
          this.loading = false;
          this.hasLocations = [1, 2, 3].includes(this.instance?.estado);
          this.hasControlZones = this.instance?.zonascontrol?.length > 0;
        },
        () => {
          this.dialogRef.close();
        });
  }


  /**
   * Abre un dialogo con el detalle de la zona de control
   *  id: Id de la zona de control
   */
  openControlZoneDetails(id: number): void {
    this.dialog.open(ControlZoneDetailComponent, {data: {id}, panelClass: 'full-screen'});
  }

  /**
   * Ajusta la informacion para mostrar el campo de editar la fecha y hora de ingreso o salida de una geocerca.
   *  initial: Dato inicial
   *  ingressIndex: Indice si esta editando un ingreso.
   *  exitIndex: Indice si esta editando una salida.
   */
  editIngressExitDate(index: number, way: boolean) {
    this.controlZoneIndex = index;
    this.controlZoneWay = way;
    const value = way ? this.instance.zonascontrol[index].hora_entrada_iso : this.instance.zonascontrol[index].hora_salida_iso;
    this.formGroup.get('newDate').reset(value);
  }

  /**
   * Cancela la edicion de fecha y hora de ingreso o salida de una geocerca.
   */
  cancelEditingExitIndex() {
    this.controlZoneIndex = null;
    this.controlZoneWay = null;
    this.formGroup.get('newDate').reset(null);
  }

  /**
   * Actualiza la informacion de la zona de control.
   */
  updateIngressExitDate() {
    hideLoader(false);
    const controlZoneId = this.instance.zonascontrol[this.controlZoneIndex].id;
    const body = {};
    const key = this.controlZoneWay ? 'hora_entrada' : 'hora_salida';
    body[key] = this.formGroup.get('newDate').value;
    this.shiftDetailsHttp.updateControlZone(this.instance.id, controlZoneId, body)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.instance.zonascontrol[this.controlZoneIndex] = {...this.instance.zonascontrol[this.controlZoneIndex], ...res};
          this.cancelEditingExitIndex();
        },
        (err) => {
          this.formGroup.get('newDate').markAsTouched();
          this.formGroup.get('newDate').setErrors({error: err.error.hora_entrada ? err.error.hora_entrada : err.error.hora_salida});
          hideLoader(true);
        },
        () => hideLoader(true));
  }

  /**
   * Detecta si se activo la pestaña de ubicaciones y si no se ha inicializado el mapa.
   */
  onTabChange(event: number): void {
    this.fullWidth = !!((this.hasControlZones && event === 2) || (this.hasLocations && event === 1));
    if (!this.loadMap && event === 1) {
      this.loadMap = true;
    }
  }
}
