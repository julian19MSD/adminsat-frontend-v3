import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';

import {NotificationService} from '@core/services/notification/notification.service';
import {hideLoader, strFormat} from '@shared/utils/general.utils';
import {API_URL} from '@shared/consts/api.consts';

@Component({
  selector: 'adms-mail-validation',
  templateUrl: './mail-validation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailValidationComponent implements AfterViewInit {

  detail: string;
  invalid: boolean = null;

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    private httpClient: HttpClient
  ) {
    hideLoader(false);
  }

  ngAfterViewInit(): void {
    const uuid = this.route.snapshot.queryParams.uidb64;
    const token = this.route.snapshot.queryParams.token;
    this.location.replaceState(this.location.path().split('?')[0], '');
    if (!token || !uuid) {
      this.router.navigate(['/public/login']);
    } else {
      const url = strFormat(API_URL.email.validate, {uuid, token});
      this.httpClient.get<any>(url, {headers: {'Accept-Language': this.translateService.currentLang}})
        .subscribe(
          (res) => {
            this.detail = res.detail;
            hideLoader(false);
            this.invalid = false;
            this.cdRef.detectChanges();
          },
          (err) => {
            this.detail = err.error.non_field_errors;
            hideLoader(true);
            this.invalid = true;
            this.cdRef.detectChanges();
          }
        );
    }
  }
}
