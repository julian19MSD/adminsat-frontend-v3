import {Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

import {CommonDestroy} from '@shared/commons/destroy.common';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {IUserPermission} from '@shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class PermissionsService extends CommonDestroy implements OnDestroy {

  PERMISSIONS = PERMISSIONS;
  private permissionsLoaded: BehaviorSubject<IUserPermission | undefined> = new BehaviorSubject(undefined);
  private userPermissions: IUserPermission;

  constructor(
    private store: Store<RootAction>
  ) {
    super();
    this.store.select('theme', 'permisos')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        (userPermissions: IUserPermission) => {
          this.userPermissions = userPermissions;
          this.permissionsLoaded.next(userPermissions);
        }
      );
  }

  /**
   * Devuelve un observable para saber cuando se tengan los permisos de usuario disponibles.
   */
  getUserPermissions(): Observable<IUserPermission> {
    return this.permissionsLoaded.asObservable();
  }


  /**
   * Verifica si el usuario tiene un permisos especifico
   * @param permissionRequired: El permiso requerido.
   */
  hasPermission(permissionRequired: string) {
    return permissionRequired === null || (this.userPermissions && this.userPermissions[permissionRequired]);
  }

  /**
   * Verifica si el usuario tiene una lista de permisos
   * @param permissionsRequired: La lista de permisos requeridos.
   */
  hasPermissions(permissionsRequired: Array<string>): boolean {
    if (Array.isArray(permissionsRequired) && this.userPermissions) {
      for (const permissionRequired of permissionsRequired) {
        if (!this.userPermissions[permissionRequired]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Detecta si se tiene los permisos de al menos uno de los submenus, para mostrat el menu en la barra lateral.
   * @param permissionRequired: El permiso requerido.
   * @param submenu: La información del submenu.
   */
  atLeastSubMenuPermissions(permissionRequired: string, submenu: Array<any>): boolean {
    if (!this.userPermissions || Object.keys(this.userPermissions).length === 0) {
      return false;
    }

    if (permissionRequired) {
      return this.userPermissions[permissionRequired];
    } else if (submenu === null) {
      return true;
    }

    for (const item of submenu) {
      if (this.userPermissions[item.permission]) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.permissionsLoaded.next(undefined);
    this.permissionsLoaded.complete();
  }
}
