import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormFieldsShiftAssignmentObservation, FormRequiredFieldsShiftObservation} from './shift-assignment-observation.forms';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {distinctUntilChanged, filter, take, takeUntil} from 'rxjs/operators';
import {IGeneralObject, IName} from '@shared/models/general.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ShiftAssignmentHttpService} from '@admin/shift-assignment/services/http.service';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IHttpParameters} from '@shared/models/form.model';
import {API_URL} from '@shared/consts/api.consts';

@Component({
  selector: 'adms-shift-assignment-observations',
  templateUrl: './observations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftAssignmentObservationsComponent extends CommonDestroy implements AfterViewInit {

  formGroup = new FormGroup(cloneDeep(FormFieldsShiftAssignmentObservation));

  formStatus: IGeneralObject;
  tipoOptions: IName[] = [];
  subTipoOptions: IName[] = [];
  zonasControlOptions = [];

  loading = true;
  addTime: boolean;
  now: Date;

  httpParams: IHttpParameters = {
    method: 'post',
    url: API_URL.routes.shiftAssignment.observation.general
  };

  constructor(
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    private shiftObservationHttp: ShiftAssignmentHttpService,
    public dialogRef: MatDialogRef<ShiftAssignmentObservationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.now = new Date()
  }


  ngAfterViewInit() {
    this.formManageService.getFormStatus(this.formGroup)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((errors) => {
        this.formStatus = errors;
        this.cdRef.detectChanges();
      });

    this.getNoveltysTypeOptions();
    this.watchType();
    this.addTimeChange(this.addTime);
  }

  /**
   * Ajusta el formulario cuando se cambia el estado de agregar tiempo
   */
  addTimeChange(state: boolean): void {
    this.addTime = state;
    FormRequiredFieldsShiftObservation.forEach(key => {
      if (!this.addTime) {
        this.formGroup.get(key).disable();
      } else {
        this.formGroup.get(key).enable();
      }
    });
  }

  onSubmit($event: any) {
    $event.preventDefault();
    this.httpParams.params = {id: this.data.id};

    this.formManageService
      .submitForm(this.formGroup, this.httpParams)
      .subscribe(() => this.dialogRef.close(true),
        (err) => {
          this.notificationService.sendErrorNotification({}, err)
        }
      )
  }

  /**
   * Vigila si cambia el tipo de novedad para traer nuevamente la informacion relacionada en el subtipo.
   */
  private watchType() {
    this.formGroup.get('tipo').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        this.getNoveltysSubTypeOptions(selectedValue);
      });
  }

  /**
   * Obtiene la lista de novedades padre.
   */
  private getNoveltysTypeOptions(): void {
    this.shiftObservationHttp.noveltysSelect({primer_nivel: true, cliente: this.data.cliente})
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        res => {
          this.tipoOptions = res;
          this.getControlZones()
        },
        (err) => {
          this.dialogRef.close({error: err})
        }
      );
  }

  /**
   * Obtiene la lista de zonas de control del enturmaniento.
   */
  private getControlZones(): void {
    this.shiftObservationHttp.controlZonesSelect(this.data.id, {observacion: true})
      .pipe(take(1))
      .subscribe(
        res => {
          this.zonasControlOptions = res;
          this.loading = false;
          this.cdRef.detectChanges();
        },
        (err) => this.dialogRef.close({error: err})
      );
  }

  /**
   * Obtiene la lista de novedades hijo.
   */
  private getNoveltysSubTypeOptions(parentId: number): void {
    this.loading = true;
    this.cdRef.detectChanges();

    this.shiftObservationHttp.noveltysSelect({novedad_padre: parentId, cliente: this.data.cliente})
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        (res) => {
          this.subTipoOptions = res;
          this.loading = false;
          this.cdRef.detectChanges();
        },
        (err) => this.dialogRef.close({error: err})
      );
  }
}
