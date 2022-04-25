import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth/auth.service';
import {hideLoader} from '@shared/utils/general.utils';

@Component({
  selector: 'adms-logout',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    hideLoader(false);
    this.authService.logout()
      .subscribe(
        () => this.router.navigate(['/public/login'])
      );
  }

  ngOnDestroy(): void {
    hideLoader(true);
  }

}
