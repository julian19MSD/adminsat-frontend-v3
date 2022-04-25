import { Inject, Injectable, SecurityContext } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  SetColorScheme,
  SetPublicTheme,
  SetSinevaCollapseState,
  ThemeActionTypes,
  ToggleSinevaCollapseState
} from '@store/actions/theme.action';
import { ThemeState } from '@store/reducers/theme.reducer';
import { API_URL, STATIC_URL } from '@shared/consts/api.consts';
import { getDefaultLang } from '@shared/utils/general.utils';
import { RootAction } from '@store/root.action';


@Injectable()
export class ThemeEffects {

  @Effect()
  loadPublicTheme$: Observable<Action> = this.actions$.pipe(
    ofType(ThemeActionTypes.LoadPublicTheme),
    switchMap(() => {
      return this.getTheme(true);
    })
  );

  @Effect()
  loadProfile$: Observable<Action> = this.actions$.pipe(
    ofType(ThemeActionTypes.LoadProfile),
    switchMap(() => {
      return this.getTheme(false);
    })
  );

  @Effect()
  restoreSinevaCollapseState$: Observable<Action> = this.actions$.pipe(
    ofType(ThemeActionTypes.RestoreSinevaCollapseState),
    map(() => {
      const sidebarCollapse = JSON.parse(localStorage.getItem('sidebar_collapse')) || false;
      return new SetSinevaCollapseState(sidebarCollapse);
    })
  );

  @Effect()
  toggleSinevaCollapseState$: Observable<Action> = this.actions$
    .pipe(
      ofType(ThemeActionTypes.ToggleSinevaCollapseState),
      map((value: ToggleSinevaCollapseState) => {
        localStorage.setItem('sidebar_collapse', JSON.stringify(value.payload));
        return new SetSinevaCollapseState(value.payload)
      })
    );

  @Effect({ dispatch: false })
  setColorScheme$: Observable<Action> = this.actions$
    .pipe(
      ofType(ThemeActionTypes.SetColorScheme),
      tap((value: SetColorScheme) => {
        localStorage.setItem('theme', value.payload);
      })
    );

  constructor(
    private actions$: Actions,
    private titleService: Title,
    private store: Store<RootAction>,
    private translateService: TranslateService,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: any) {
  }

  /**
   * Establece el tema para la aplicacion.
   * @param publicUrl: Indica si es informacion de urls publicas o privadas.
   */
  private getTheme(publicUrl: boolean): Observable<any> {
    const url = publicUrl ? API_URL.theme.theme : API_URL.theme.profile;
    return this.httpClient.get<ThemeState>(url)
      .pipe(
        catchError(() => of(new SetPublicTheme({} as ThemeState))),
        map((theme: any) => {
          if (theme.permisos) {
            const persmission = {};
            theme.permisos.forEach((item) => persmission[item.replace('.', '__')] = true);
            theme.permisos = persmission;
          }
          return new SetPublicTheme(theme);
        }),
        tap((result: SetPublicTheme) => {
          const theme = result.payload;
          if (theme.idioma) {
            const defaultLang = getDefaultLang(theme.idioma);
            this.translateService.setDefaultLang(defaultLang);
            this.translateService.use(theme.idioma);
          }
          this.setCustomTheme(theme.temaCss);
          this.titleService.setTitle(theme.tituloSitio || 'Adminsat');
          if (theme.favicon) {
            this.document.getElementById('favicon').href = theme.favicon;
          }
          else{
            this.document.getElementById('favicon').href =   `${STATIC_URL}/favicons/favicon.ico`;
          }
        })
      );
  }

  /**
   * Agrega o quita el tema del cliente
   * @param cssUrl: Un objeto con la informacion del tema
   */
  private setCustomTheme(cssUrl: string): void {
    if (cssUrl) {
      const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(cssUrl));
      this.document.getElementById('customTheme').setAttribute('href', url);
      this.document.body.classList.add('custom');
    } else {
      this.document.getElementById('customTheme').removeAttribute('href');
      this.document.body.classList.remove('custom');
    }
  }
}
