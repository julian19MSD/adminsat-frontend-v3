import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';

import {FormManageService} from '@core/services/form-manage/form-manage.service';

@Component({
  selector: 'adms-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy, OnChanges {

  @Input() placeholder: string;
  @Input() mainKey = 'nombre';
  @Input() options: any[] = [];
  @Input() exclude: any[] = [];
  @Input() multiple = false;
  @Input() floatLabel: 'auto' | 'always' | 'never' = 'auto';
  @Input() required = false;
  @Input() ctrl: FormControl;
  @Input() panelClass = 'w-100';
  @Input() value = 'id';
  @Input() translate = false;


  filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  selectFilterCtrl: FormControl = new FormControl();
  getErrorMessage = FormManageService.getFormFieldErrorMessage;
  private onDestroy = new Subject<void>();

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (const propName in changes) {
      if (propName === 'options') {
        this.filterOptions();
      } else if (propName === 'exclude') {
        if (!this.exclude) {
          this.exclude = [];
        }
        this.filterOptions();
      }
    }
  }

  ngOnInit(): void {
    this.filteredOptions.next(this.options.slice());

    this.selectFilterCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterOptions();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private filterOptions(): void {
    if (!this.options) {
      return;
    }
    let search = this.selectFilterCtrl.value;
    if (!search) {
      if (this.exclude.length > 0) {
        this.filteredOptions.next(
          this.options.filter(item => item[this.value] === this.ctrl.value || !this.exclude.includes(item[this.value]))
        );
      } else {
        this.filteredOptions.next(this.options.slice());
      }
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredOptions.next(
      this.options.filter(item => item[this.mainKey].toLowerCase().indexOf(search) > -1 && !this.exclude.includes(item[this.value]))
    );
  }

}
