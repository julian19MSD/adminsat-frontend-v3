import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {catchError, map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@shared/consts/api.consts';
import {IUserSession} from '@shared/models/session.model';
import {JWT_CONFIG} from '@shared/consts/session.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private formManageService: FormManageService,
    private translateService: TranslateService,
    private router: Router,
    private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: any,
  ) {
  }

  /**
   * Envia la credenciales de usuario a la API y si la respuesta es positiva establece los datos de seions.
   * @param formGroup: El formulario con las credenciales.
   */
  login(formGroup: FormGroup): Observable<IUserSession> {
    const httpParams = {
      url: API_URL.auth.getToken,
      method: 'post'
    };
    return this.formManageService.submitForm(formGroup, httpParams, null, 'login')
      .pipe(
        map((session) => {
          this.setSession(session);
          return session
        })
      );
  }

  /**
   * Solicita un refresco de token.
   */
  refreshSession(): Observable<string> {

    const token = localStorage.getItem('refresh')

    return this.httpClient.post<{ refresh: string, access: string }>(API_URL.auth.refreshToken, {refresh: token})
      .pipe(
        catchError((err) => {
          this.clearSession();
          this.router.navigate(['/public/login']);
          return throwError(err);
        }),
        map((session: IUserSession) => {
          this.setSession(session, false);
          return session.access;
        })
      )
  }

  /**
   * Cierra sesion, y valida si es existe un token almacenado en el navegador intentar desactivarlo en la API.
   */
  logout(): Observable<null> {
    const accessToken = localStorage.getItem('access');
    this.clearSession();

    if (accessToken) {
      const headers = {};
      headers[JWT_CONFIG.header] = JWT_CONFIG.authScheme + ' ' + accessToken;
      return this.httpClient.delete<any>(API_URL.auth.logout, {headers})
        .pipe(
          catchError(() => {
            return of(null);
          })
        );
    }
    return of(null);
  }

  clearSession() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('sound_status');
    localStorage.removeItem('homepage');
    localStorage.removeItem('sidebar_collapse');
    // TODO eliminar cuando se finalice FE2
    this.document.cookie = 'jwt_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
  }

  /**
   * Verifica si existe un token para la sesion actual
   */
  isAuthenticated(): boolean {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const cookie = getTokenCookie();

    // TODO eliminar cuando se finalice FE2
    if (access !== cookie) {
      this.document.cookie = access ? 'jwt_token=' + access + ';path=/;' : 'jwt_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
    }
    if (!refresh && !access) {
      this.clearSession();
      return false;
    }
    return true
  }

  /**
   * Establece los parametros de la sesion en la base de datos.
   * @param authResult: La informacion de la sesion.
   * @param all: Determina si debe setear toda la info de sesion
   */
  private setSession(authResult: IUserSession, all: boolean = true): void {

    localStorage.setItem('access', authResult.access);
    localStorage.setItem('refresh', authResult.refresh);
    // TODO eliminar cuando se finalice FE2
    this.document.cookie = 'jwt_token=' + authResult.access + ';path=/;';

    if (all) {
      localStorage.setItem('sidebar_collapse', 'false');
      localStorage.setItem('sound_status', '0');
      localStorage.setItem('homepage', authResult.homepage);
    }

  }
}


/**
 * Obtiene el token de la cookie.
 */
export function getTokenCookie(): string {
  return getCookie('jwt_token');
}

/**
 * Obtiene el valor de una cookie
 * @param cname: El nobre de la cookie.
 */
export function getCookie(cname: string) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}
