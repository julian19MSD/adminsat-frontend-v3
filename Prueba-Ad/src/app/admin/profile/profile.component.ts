import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

import {formFieldsProfile} from './profile.forms';
import {API_URL, STATIC_URL} from '@shared/consts/api.consts';
import {IProfileChoices} from '@shared/models/profile.model';
import {IEvents} from '@shared/models/events.model';
import {ProfileHttpService} from '@admin/profile/services/http.service';
import {IFormHeaderState} from '@shared/models/header.model';
import {CommonForm} from '@shared/commons/form.common';
import {hideLoader} from '@shared/utils/general.utils';
import {NotificationService} from '@core/services/notification/notification.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'adms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends CommonForm implements OnInit {
  formHeaderData: IFormHeaderState = {
    title: 'PROFILE',
    defaultActionText: 'UPDATE',
    formId: 'profileForm',
  };
  formGroup = new FormGroup(cloneDeep(formFieldsProfile));
  validateMail: string[] = [];
  fotoUrl: string;
  assetsPath = STATIC_URL;
  choices: IProfileChoices = {} as IProfileChoices;
  events: IEvents[] = [];
  httpParams = {
    update: {
      method: 'patch',
      url: API_URL.profile.change,
    },
    validateMail: {
      method: 'post',
      url: API_URL.users.resendValidateMail,
    },
  };

  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public route: ActivatedRoute,
    public router: Router,
    private profileHttpService: ProfileHttpService
  ) {
    super(
      headerMessengerService,
      notificationService,
      translateService,
      httpClient,
      formManageService,
      cdRef,
      route,
      router
    );
  }

  get notificacionesForms(): FormArray {
    return this.formGroup.get('notificaciones') as FormArray;
  }

  get alarmasForms(): FormArray {
    return this.formGroup.get('alarmas') as FormArray;
  }

  ngOnInit() {
    this.get_references();
  }

  addNotificacion(): void {
    this.notificacionesForms.push(new FormControl(null, [Validators.required]));
  }

  deleteNotificacion(i): void {
    this.notificacionesForms.removeAt(i);
  }

  addAlarma(): void {
    this.alarmasForms.push(new FormControl(null, [Validators.required]));
  }

  deleteAlarma(i): void {
    this.alarmasForms.removeAt(i);
  }

  getMailError(value: string) {
    return this.validateMail.includes(value)
      ? 'MAIL_VALIDATION_ERROR_FIELD'
      : '';
  }

  onSuccessSubmit(instance, subscribe: boolean = true) {
    super.onSuccessSubmit(instance)
      .subscribe(() => {
        location.reload();
      })
    return null
  }

  onValidateMailSubmit(mail: string) {
    hideLoader(false);
    const mailForm = new FormGroup({correo: new FormControl(mail)});
    this.formManageService
      .submitForm(mailForm, this.httpParams.validateMail)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.notificationService.sendSuccessNotification({}, null, null, [mail]);
      }, err => {
        this.notificationService.sendErrorNotification({}, err);
      });
  }

  private get_references() {
    this.profileHttpService.referencesSelect().subscribe(
      (events) => {
        this.events = events;
        this.get_choices();
      },
      () => {
        this.loader = false;
      }
    );
  }

  private get_choices() {
    this.profileHttpService.choices().subscribe(
      (choices) => {
        this.choices = choices;
        this.get_detail();
      },
      () => {
        this.loader = false;
      }
    );
  }

  private get_detail() {
    this.profileHttpService.details().subscribe(
      (res) => {
        this.validateMail = res.validate_mail || [];
        this.formGroup.patchValue(res);
        this.formGroup.controls.notificaciones = new FormArray([]);
        this.formGroup.controls.alarmas = new FormArray([]);
        this.fotoUrl = res.foto;

        if (Array.isArray(res.notificaciones)) {
          res.notificaciones.forEach((item) => {
            this.notificacionesForms.push(
              new FormControl(item, [Validators.required])
            );
          });
        }

        if (Array.isArray(res.alarmas)) {
          res.alarmas.forEach((item) => {
            this.alarmasForms.push(
              new FormControl(item, [Validators.required])
            );
          });
        }
        this.loader = false;
      },
      () => {
        this.loader = false;
      }
    );
  }
}
