import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

import {hideLoader} from '@shared/utils/general.utils';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (!navigator.onLine || err.status === 0) {
            this.translateService.get(['NO_CONNECTION', 'CLOSE'])
              .pipe(take(1))
              .subscribe(
                (msgs) => {
                  this.snackBar.open(msgs.NO_CONNECTION, msgs.CLOSE, {
                    duration: 5000,
                    panelClass: 'snack-info'
                  });
                  hideLoader(true);
                });
          } else {
            switch (err.status) {
              case 500:
                this.translateService.get(['SERVER_ERROR', 'CLOSE'])
                  .pipe(take(1))
                  .subscribe(
                    (messages) => {
                      this.snackBar.open(messages.SERVER_ERROR, messages.CLOSE, {
                        duration: 5000,
                      });
                      hideLoader(true);
                    });
                break;

              case 502:
                this.downAPINotification();
                break;

              case 503:
                this.downAPINotification();
                break;

              case 504:
                this.downAPINotification();
                break;

            }
          }
          return throwError(err);
        })
      );
  }

  /**
   * Notifica error cuando la API no esta disponible
   */
  private downAPINotification(): void {
    this.translateService.get(['API_DOWN', 'CLOSE'])
      .pipe(take(1))
      .subscribe(
        (messages) => {
          this.snackBar.open(messages.API_DOWN, messages.CLOSE, {
            duration: 7000,
          });
          hideLoader(true);
        });
  }
}
