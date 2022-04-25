import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs/operators';
import { IUserPermission } from '@shared/models/user.model';
import { API_URL } from '@shared/consts/api.consts';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';

@Injectable({
  providedIn: 'root',
})
export class HasPermissionsGuard implements CanActivate {
  constructor(
    private permissionsService: PermissionsService,
    private httpClient: HttpClient,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    public store: Store<RootAction>,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkPermission(route);
  }

  private checkPermission(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {

    if (route.data && route.data.permissions) {
      return this.permissionsService.getUserPermissions().pipe(
        take(1),

        switchMap((permissions: IUserPermission | undefined) => {

          if (!permissions) {

            const requiredPermissions = route.data.permissions.map((item) => {
              return item.replace('__', '.');
            });

            return this.httpClient
              .post<any>(API_URL.theme.permissions, {
                permissions: requiredPermissions,
              })
              .pipe(map((res) => res.detail));

          } else if (
            !this.permissionsService.hasPermissions(route.data.permissions)
          ) {

            return of(false);
          }

          return of(true);
        }),

        map((hasPermissions: boolean) => {
          if (!hasPermissions) {
            this.router.navigate(['/dashboard']);

            this.translateService
              .get(['DOES_NOT_HAVE_PERMISSIONS', 'CLOSE'])
              .pipe(take(1))
              .subscribe((translations) => {
                this.snackBar.open(
                  translations.DOES_NOT_HAVE_PERMISSIONS,
                  translations.CLOSE,
                  {
                    duration: 3000,
                    panelClass: 'snack-danger',
                  }
                );
              });
          }
          else if (route.data.verifyClient === true) {
            this.store
              .select('theme', 'perfil')
              .pipe(take(1))
              .subscribe((perfil) => {
                
                if ([2, 3].includes(perfil)) {
                  
                  this.router.navigate(['notifications/tracking/form']);
                }
              }
              );


          }

          return hasPermissions;
        })
      );
    }
    return true;
  }
}
