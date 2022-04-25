import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';

import {parse} from 'url';
import {JWT_CONFIG} from '@shared/consts/session.const';
import {AuthService} from '@core/services/auth/auth.service';
import {API_URL} from '@shared/consts/api.consts';
import {HttpCancelService} from '@core/services/http/http-cancel.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpCancelService: HttpCancelService,
    private translateService: TranslateService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.whiteListedDomain(request) && ![API_URL.auth.refreshToken, API_URL.auth.getToken].includes(request.url)) {
      request = this.addLanguage(request)

      if (this.isRefreshingToken) {
        return this.waitUntilRefresh(request, next);
      } else {
        return this.setAuhtentication(request, next)
      }
    }

    return next.handle(request);
  }

  private setAuhtentication(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const access = localStorage.getItem('access');

    if (access) {
      request = this.addJWT(access, request);
    }

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              return this.handle401Error(request, next);
            }
            return throwError(error);
          }
        )
      );
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshingToken) {
      return this.waitUntilRefresh(request, next);
    }

    this.isRefreshingToken = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshSession()
      .pipe(
        catchError((err) => {
          this.httpCancelService.cancelPendingRequests();
          this.isRefreshingToken = false;
          return throwError(err);
        }),

        switchMap((access: string) => {
          this.isRefreshingToken = false;
          this.refreshTokenSubject.next(access);
          return next.handle(this.addJWT(access, request));
        })
      );

  }

  private waitUntilRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.refreshTokenSubject.pipe(
      filter(access => {
        return access != null;
      }),
      take(1),
      switchMap((access) => {
        return next.handle(this.addJWT(access, request));
      })
    );
  }

  private whiteListedDomain(request: HttpRequest<any>): boolean {
    const requestUrl = parse(request.url, false, true);
    const originUrl = requestUrl.protocol + '//' + requestUrl.host;
    return !(requestUrl.host === null || JWT_CONFIG.whitelistedDomains.findIndex((domain: any) => {
      return typeof domain === 'string' ? domain === originUrl : domain instanceof RegExp ? domain.test(originUrl) : false;
    }) < 0);
  }

  private isBlacklistedRoute(request: HttpRequest<any>): boolean {
    const requestUrl = parse(request.url, false, true);

    return JWT_CONFIG.blacklistedRoutes.findIndex((route) => {
      return typeof route === 'string' ? route === requestUrl.host : route instanceof RegExp ? route.test(requestUrl.host) : false;
    }) > -1;
  }

  private addJWT(access: string, request: HttpRequest<any>): HttpRequest<any> {
    if (access && this.whiteListedDomain(request) && !this.isBlacklistedRoute(request)) {
      const headers = {};

      headers[JWT_CONFIG.header] = `${JWT_CONFIG.authScheme} ${access}`;
      return request.clone({setHeaders: headers});
    }

    return request;
  }

  private addLanguage(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {'Accept-Language': this.translateService.currentLang}
    });
  }
}
