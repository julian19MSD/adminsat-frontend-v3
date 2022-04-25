import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@material/material.module';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SelectComponent} from '@shared/./components/select/select.component';
import {ActionConfirmComponent} from '@shared/./components/action-confirm/action-confirm.component';
import {EscapeHtmlPipe} from '@shared/pipes/keep-html.pipe';
import {KeysPipe} from '@shared/pipes/keys.pipe';
import {GenericContentPlaceholderComponent} from './components/generic-content-paceholder/generic-content-placeholder.component';
import {DropZoneComponent} from '@shared/components/drop-zone/drop-zone.component';
import {DateTimeRangeComponent} from '@shared/components/date-time-range/date-time-range.component';
import {DateTimeAdapter, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule} from '@busacca/ng-pick-datetime';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {takeUntil} from 'rxjs/operators';
import { SimpleAssociationPreviewComponent } from './components/simple-association-preview/simple-association-preview.component';
import { SimplePreviewComponent } from './components/simple-preview/simple-preview.component';
import { DurationFieldInput } from './components/duration-field/duration-field-input.component';
import {ChartModule} from 'angular-highcharts'

@NgModule({
  declarations: [
    ActionConfirmComponent,
    SelectComponent,
    DurationFieldInput,
    GenericContentPlaceholderComponent,
    DropZoneComponent,
    DateTimeRangeComponent,
    EscapeHtmlPipe,
    KeysPipe,
    SimpleAssociationPreviewComponent,
    SimplePreviewComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    ChartModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    ActionConfirmComponent,
    SelectComponent,
    GenericContentPlaceholderComponent,
    DropZoneComponent,
    DateTimeRangeComponent,
    EscapeHtmlPipe,
    KeysPipe,
    TranslateModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SimpleAssociationPreviewComponent,
    SimplePreviewComponent,
    DurationFieldInput
  ]
})      
export class SharedModule extends CommonDestroy {
  constructor(
    public translate: TranslateService,
    public store: Store<RootAction>,
    private dateTimeAdapter: DateTimeAdapter<any>,
    private owlDateTimeIntl: OwlDateTimeIntl
  ) {
    super();

    this.translate.onLangChange
      .subscribe((res) => {
        this.updateLanguage(res.lang)
      })
    this.updateLanguage(this.translate.currentLang);
  }


  updateLanguage(lang: string) {
    this.translate.get(['CANCEL', 'SET', 'FROM', 'TO', 'AM', 'PM'])
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(msg => {
        this.owlDateTimeIntl.cancelBtnLabel = msg.CANCEL;
        this.owlDateTimeIntl.setBtnLabel = msg.SET;
        this.owlDateTimeIntl.rangeFromLabel = msg.FROM;
        this.owlDateTimeIntl.rangeToLabel = msg.TO;
        this.owlDateTimeIntl.hour12AMLabel = msg.AM;
        this.owlDateTimeIntl.hour12PMLabel = msg.PM;
        this.dateTimeAdapter.setLocale(lang);
      });
  }
}
