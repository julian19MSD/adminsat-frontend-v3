import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
  endOfISOWeek,
  endOfMonth,
  endOfToday,
  endOfYesterday,
  startOfISOWeek,
  startOfMonth,
  startOfToday,
  startOfYesterday,
  subMonths,
  subWeeks
} from 'date-fns';
import {takeUntil} from 'rxjs/operators';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IGeneralObject} from '@shared/models/general.model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'adms-date-time-range',
  templateUrl: './date-time-range.component.html',
})
export class DateTimeRangeComponent extends CommonDestroy implements OnChanges {

  @Input() formGroup: FormGroup;
  formStatus: IGeneralObject;
  today = endOfToday();
  private subscription: Subscription;

  constructor(
    private formManageService: FormManageService,
    private cdRef: ChangeDetectorRef
  ) {
    super();

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (const propName in changes) {
      if ('formGroup' === propName) {
        if (this.formGroup) {
          this.formManageService.getFormStatus(this.formGroup)
            .pipe(takeUntil(this.ngDestroyed$))
            .subscribe((errors) => {
              this.formStatus = errors;
              this.cdRef.detectChanges();
            });
        } else if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }
    }
  }


  /**
   * Establece el rango para el dia actual.
   */
  setToday() {
    this.formGroup.get('desde').setValue(startOfToday());
    this.formGroup.get('hasta').setValue(endOfToday());
  }

  /**
   * Establece el rango para el dia anterior.
   */
  setYesterday() {
    this.formGroup.get('desde').setValue(startOfYesterday());
    this.formGroup.get('hasta').setValue(endOfYesterday());
  }

  /**
   * Establece el rango para la semana actual.
   */
  setCurrentWeek() {
    this.formGroup.get('desde').setValue(startOfISOWeek(new Date()));
    this.formGroup.get('hasta').setValue(endOfToday());
  }

  /**
   * Establece el rango para el la semana anterior.
   */
  setLastWeek() {
    this.formGroup.get('desde').setValue(startOfISOWeek(subWeeks(new Date(), 1)));
    this.formGroup.get('hasta').setValue(endOfISOWeek(subWeeks(new Date(), 1)));
  }

  /**
   * Establece el rango para la semana actual.
   */
  setCurrentMonth() {
    this.formGroup.get('desde').setValue(startOfMonth(new Date()));
    this.formGroup.get('hasta').setValue(endOfToday());
  }

  /**
   * Establece el rango para el la semana anterior.
   */
  setLastMonth() {
    this.formGroup.get('desde').setValue(startOfMonth(subMonths(new Date(), 1)));
    this.formGroup.get('hasta').setValue(endOfMonth(subMonths(new Date(), 1)));
  }
}
