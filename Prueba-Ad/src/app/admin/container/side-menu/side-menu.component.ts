import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {NAVMENU} from './consts/menu.const';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {Observable} from 'rxjs';
import {IUserPermission} from '@shared/models/user.model';
import {SafeUrl} from '@angular/platform-browser';
import { RootAction } from '@store/root.action';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'adms-sidenav-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent {
  @Input() logo: SafeUrl;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  menuNav = NAVMENU;
  phItems = Array(8).fill(null);
  userPermissionsLoaded$: Observable<IUserPermission>;
  esAdmin : number;



  constructor(
    public store: Store<RootAction>,
    private permissionsService: PermissionsService,
    private cdRef: ChangeDetectorRef
  ) {

    setTimeout(() => {
      this.userPermissionsLoaded$ = this.permissionsService.getUserPermissions();
      this.cdRef.detectChanges();
    }, 10)
  }


  /**
   * Verifica si debe mostrar un menu de primer nivel. Para ello valida si el usuario tiene al menos uno de los permisos recibidos.
   * @param perms: Los permisos a evaluar
   */
  showMenu(perms, subPerms): boolean {
    return this.permissionsService.atLeastSubMenuPermissions(perms, subPerms);
  }

  /**
   * Verifica si debe mostrar un menu interno. Valida si el usuario tiene el permiso requerido.
   * @param perms: El permiso requerido
   */
  showSubMenu(perms): boolean {
    return this.permissionsService.hasPermission(perms);
  }

  closeSideNav() {
    this.onClose.emit();
  }
}
