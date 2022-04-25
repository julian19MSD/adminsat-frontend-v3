import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {formFields} from './forgotten-password..const';
import {NotificationService} from '@core/services/notification/notification.service';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {IGeneralObject} from '@shared/models/general.model';
import {IHttpParameters} from '@shared/models/form.model';
import {API_URL} from '@shared/consts/api.consts';
import {Router} from '@angular/router';

@Component({
  selector: 'adms-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgottenPasswordComponent {
  formGroup = new FormGroup(cloneDeep(formFields));
  formStatus$: Observable<IGeneralObject>;
  private httpParams: IHttpParameters = {
    url: API_URL.password.recover,
    method: 'post'
  };

  constructor(
    public translateService: TranslateService,
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.formStatus$ = this.formManageService.getFormStatus(this.formGroup);
  }

  /**
   * Envia el formulario para recuperar contraseña.
   */
  onSubmit(): void {
    this.formManageService.submitForm(this.formGroup, this.httpParams)
      .subscribe(
        (res: { detail: string }) => {
          this.notificationService.sendSuccessNotification({}, res.detail)
            .subscribe(() => {
              this.router.navigate(['/public/login'])
            });
        },
        (err) => {
          this.notificationService.sendErrorNotification({}, err);
        }
      );
  }
}
