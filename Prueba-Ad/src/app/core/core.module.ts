import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationDialogComponent} from '@core/components/notification/notification.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '@material/material.module';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import * as i18nMap from '@statics/i18n/map.json';
import {Observable} from 'rxjs';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RouterModule} from '@angular/router';

export class TranslateBrowserLoader implements TranslateLoader {
  constructor(
    private httpClient: HttpClient,
    private prefix: string = './assets/i18n/',
    private suffix: string = '.json',
  ) {
  }

  public getTranslation(lang: string): Observable<any> {
    const suffix = `.${i18nMap.default[lang]}${this.suffix}`;
    return new TranslateHttpLoader(this.httpClient, this.prefix, suffix).getTranslation(lang);
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateBrowserLoader(http);
}


@NgModule({
  declarations: [
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    NotificationDialogComponent,
    MaterialModule,
    TranslateModule
  ]
})
export class CoreModule {
}
