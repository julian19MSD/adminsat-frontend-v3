import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {AuthService} from '@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate {

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url.startsWith('/public/mail-validation')) {
      return true;
    } else if (this.authService.isAuthenticated()) {
      return this.router.navigate(['/']);
    } else {
      return true
    }
  }
}


