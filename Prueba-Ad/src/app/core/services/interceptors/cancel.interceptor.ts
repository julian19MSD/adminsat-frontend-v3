import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivationStart, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {HttpCancelService} from '@core/services/http/http-cancel.service';

@Injectable()
export class CancelHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private httpCancelService: HttpCancelService) {

    router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        this.httpCancelService.cancelPendingRequests();
      }
    });
  }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    if (!request.url.startsWith('./')) {
      return next.handle(request)
        .pipe(
          takeUntil(this.httpCancelService.onCancelPendingRequests())
        )
    }
    return next.handle(request)
  }
}
