import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';
import { IGeneralObject, IName } from '@shared/models/general.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { IHttpParameters } from '@shared/models/form.model';
import { API_URL } from '@shared/consts/api.consts';
import { WorkdayHttpService } from '../services/http.service';
import { FormFieldsWorkdayNovelty } from './workday-novelty.forms';
import { WorkdayNoveltySelectModel, WorkdayRoadActorModel } from '@shared/models/workday.model';
import { endOfToday } from 'date-fns';

@Component({
  selector: 'adms-workday-novelty',
  templateUrl: './novelty.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkdayNoveltyComponent extends CommonDestroy implements AfterViewInit {

  formGroup = new FormGroup(cloneDeep(FormFieldsWorkdayNovelty));
  tipoOptions: WorkdayNoveltySelectModel[] = [];
  actorOptions: WorkdayRoadActorModel[] = [];
  today = endOfToday();

  formStatus: IGeneralObject;

  loading = true;

  httpParams: IHttpParameters = {
    method: 'patch',
    url: ""
  };

  constructor(
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    private workNoveltyHttp: WorkdayHttpService,
    public dialogRef: MatDialogRef<WorkdayNoveltyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
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

  }



  /**
   * Vigila si cambia el tipo de novedad para cambiar el tip[o de peticion que se requiere hacer al servidor]
   */
  private watchType() {
    this.formGroup.get('tipo').valueChanges
      .pipe(
        filter((e: any) => !!e),
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$))
      .subscribe(selectedValue => {
        if (selectedValue === 14) {
          this.formGroup.get('actor_vial').enable();
          this.formGroup.get('event').disable();

          this.getRoadActors();
          this.httpParams.url = API_URL.routes.workday.novelty.cambiarActor;
          // this.httpFormMethod = this.workdayNoveltyHttp.changeActor;
        }
        else if (selectedValue === 5 || selectedValue === 11) {
          this.formGroup.get('actor_vial').disable();
          this.formGroup.get('event').enable();
          this.formGroup.get('event').setValue(selectedValue);
          this.httpParams.url = API_URL.routes.workday.novelty.finalizacionManual;
          // this.httpFormMethod = this.workdayNoveltyHttp.manualFinish;

        }
      });
  }


  getRoadActors() {
    this.loading = true;
    this.cdRef.detectChanges();
    this.workNoveltyHttp.actorsSelect(this.data.enturnamiento)
      .pipe(take(1))
      .subscribe(res => {
        this.actorOptions = res;
        this.loading = false;
        this.cdRef.detectChanges();
      },
        (err) => {
          this.dialogRef.close({ error: err })
        }
      )
  }

  /**
 * Obtiene la lista de novedades padre.
 */
  private getNoveltysTypeOptions(): void {
    this.workNoveltyHttp.noveltysSelect()
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        res => {
          this.tipoOptions = res;
          this.loading = false;
          this.cdRef.detectChanges();
        },
        (err) => {
          this.dialogRef.close({ error: err })
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
}


