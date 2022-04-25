import {Injectable, OnDestroy} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {from, merge, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, filter, map, retry, switchMap, take, tap} from 'rxjs/operators';
import {hideLoader, strFormat} from '@shared/utils/general.utils';
import {IHttpParameters} from '@shared/models/form.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {IGeneralObject} from '@shared/models/general.model';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';
import {CommonDestroy} from '@shared/commons/destroy.common';
import * as cloneDeep from 'lodash/cloneDeep';


declare var grecaptcha;

/**
 * Extract arguments of function
 */
export type ArgumentsType<F> = F extends (...args: infer A) => any ? A : never;

/**
 * Creates an object like O. Optionally provide minimum set of properties P which the objects must share to conform
 */
type ObjectLike<O extends object, P extends keyof O = keyof O> = Pick<O, P>;


@Injectable({
  providedIn: 'root'
})
export class FormManageService extends CommonDestroy implements OnDestroy {

  private formFieldErrorsMap: IGeneralObject = {};
  private snacBarRef$: MatSnackBarRef<SimpleSnackBar>;

  constructor(
    private httpClient: HttpClient,
    private translateService: TranslateService,
    private snackbar: MatSnackBar
  ) {
    super();
  }

  /**
   * Obtiene el texto de error para mostrar en un campo de formulario.
   * @param formControl: El control del formulario.
   * @param message: Un objeto con mesajes personaizados segun el error.
   */
  public static getFormFieldErrorMessage(formControl: AbstractControl | FormControl, message: IGeneralObject): string {
    if (formControl.hasError('required')) {
      return 'FIELD_REQUIRED';
    } else if (formControl.hasError('durationParse')) {
      return message.pattern ? message.pattern : 'INVALID_FIELD_VALUE';
    } else if (formControl.hasError('pattern')) {
      return message.pattern ? message.pattern : 'INVALID_PATTERN';
    } else if (formControl.hasError('matchOther')) {
      return message.matchOther ? message.matchOther : 'INVALID_FIELD_VALUE';
    } else if (formControl.hasError('matchInclude')) {
      return message.matchInclude ? message.matchInclude : 'MAIL_VALIDATION_ERROR';
    } else if (formControl.hasError('matDatepickerParse') || formControl.hasError('matDatepickerMin') || formControl.hasError('matDatepickerMax')) {
      return message.date ? message.date : 'INVALID_DATE';
      // tslint:disable-next-line:max-line-length
    } else if (formControl.hasError('owlDateTimeParse') || formControl.hasError('owlDateTimeMin') || formControl.hasError('owlDateTimeMax')) {
      return message.date ? message.date : 'INVALID_DATETIME';
    } else if (formControl.hasError('error')) {
      if (Array.isArray(formControl.errors.error)) {
        return formControl.errors.error[0];
      }
      return formControl.errors.error;
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.snacBarRef$) {
      this.snacBarRef$.dismiss();
    }
  }

  /**
   * Hace el envio de una peticion Http.
   * @param formGroup: EL formulario a enviar.
   * @param recaptchaAction: La accion de recaptcha requerida. Ver documentacion.
   * @param httpParams: Los parametros de la peticion.
   * @param formData: FormData para el envio de archivos.
   */
  submitForm(formGroup: FormGroup, httpParams: IHttpParameters, formData: FormData = null, recaptchaAction = 'home'): Observable<any> {
    httpParams = cloneDeep(httpParams);
    formGroup.markAllAsTouched();
    return of(null)
      .pipe(
        take(1),

        switchMap(() => {

          if (formGroup.valid) {
            hideLoader(false);
            if (recaptchaAction) {
              return this.addRecaptcha(formGroup, recaptchaAction, httpParams);
            } else {
              return this.httpRequest(formGroup, httpParams);
            }
          } else {
            this.toastFormError();
            return throwError('invalidForm');
          }
        }),

        catchError((err) => {
          hideLoader(true);
          if (err instanceof HttpErrorResponse) {
            this.setControlsErrors(formGroup, err.error);
          } else if (err === 'invalidForm') {
            return of(err);
          }
          return throwError(err);
        }),

        filter((val) => {
          return val !== 'invalidForm'
        }),

        switchMap((response) => {
          if (formData) {
            httpParams.method = 'patch';
            if (httpParams.formDataUrl) {
              httpParams.url = httpParams.formDataUrl;
            }
            if (response.id) {
              httpParams.params = {...httpParams.params, id: response.id}
            }
            if (recaptchaAction) {
              return this.addRecaptcha(formData, recaptchaAction, httpParams);
            } else {
              return this.httpRequest(formData, httpParams);
            }
          }
          return of(response);
        }),

        tap(() => hideLoader(true))
      );
  }

  /**
   * Retorna un observable con objeto que contiene los errores para mostra en los campos de formulario.
   * @param formGroup: El objeto del formulario.
   * @param formFieldErrorsMap: Un objeto con el mapa de mensajes personalizados para motrar en cada campo.
   */
  getFormStatus(formGroup: FormGroup, formFieldErrorsMap: IGeneralObject = {}): Observable<IGeneralObject> {
    this.formFieldErrorsMap = formFieldErrorsMap;
    return merge(formGroup.statusChanges, this.extractTouchedChanges(formGroup))
      .pipe(
        map(() => {
            const errors = {};
            this.getFormError(formGroup, errors);
            if (this.snacBarRef$ && formGroup.valid) {
              this.snacBarRef$.dismiss();
            }
            return errors;
          }
        )
      );
  }

  /**
   * Obtiene los errores del formulario y agrega establece el texto a mostrar al usuario.
   * @param formGroup: Un formulario
   * @param errors: Un objeto para cargar los errores.
   */
  private getFormError(formGroup: FormGroup | FormArray, errors) {
    Object.keys(formGroup.controls).forEach((key) => {
      const abstractControl = formGroup.controls[key];
      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        if (!(key in errors)) {
          if (abstractControl instanceof FormGroup) {
            errors[key] = {};
          } else {
            errors[key] = [];
          }
        }
        this.getFormError(abstractControl, errors[key]);
      } else if (formGroup.get(key).invalid) {
        errors[key] = FormManageService.getFormFieldErrorMessage(formGroup.get(key), this.formFieldErrorsMap[key] || {});
      }
    });
  }

  /**
   * Agrega errores desde un objeto externo,  pricipalmente respuesta de un API, a los respectivos controles del formulario.
   * @param formGroup: El formulario
   * @param errors: Un objeto con los errores.
   */
  private setControlsErrors(formGroup: FormGroup | FormArray, errors): void {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.controls[key];
      if (errors[key]) {
        if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
          this.setControlsErrors(abstractControl, errors[key]);
        } else {
          abstractControl.setErrors({error: errors[key]});
        }
      }
    });
  }

  /**
   * Genera un Observable para detectar cuando un campo de formulario es marcado como touched y untouched
   * @param control: El control del formulario.
   */
  private extractTouchedChanges(control: ObjectLike<AbstractControl, 'markAsTouched' | 'markAsUntouched'>): Observable<boolean> {
    const prevMarkAsTouched = control.markAsTouched;
    const prevMarkAsUntouched = control.markAsUntouched;

    const touchedChanges$ = new Subject<boolean>();

    function nextMarkAsTouched(...args: ArgumentsType<AbstractControl['markAsTouched']>) {
      touchedChanges$.next(true);
      prevMarkAsTouched.bind(control)(...args);
    }

    function nextMarkAsUntouched(...args: ArgumentsType<AbstractControl['markAsUntouched']>) {
      touchedChanges$.next(false);
      prevMarkAsUntouched.bind(control)(...args);
    }

    control.markAsTouched = nextMarkAsTouched;
    control.markAsUntouched = nextMarkAsUntouched;

    return touchedChanges$;
  }

  /**
   * Agrega el valor de recaptcha al formulario
   * @param formGroup: El formulario a enviar
   * @param action: La accion de recaptcha requerida. Ver documentacion.
   * @param httpParams: Los parametros para la peticion Http.
   */
  private addRecaptcha(formGroup: FormGroup | FormData, action: string, httpParams: IHttpParameters): Observable<any> {
    return from(grecaptcha.execute('6LdSwowUAAAAANgs2QakeuPJua7kByuq_RO47nMT', {action}))
      .pipe(
        retry(1),
        switchMap((token: string) => {
            if (formGroup instanceof FormGroup) {
              if (formGroup.contains('recaptcha')) {
                formGroup.get('recaptcha').patchValue(token);
              } else {
                formGroup.addControl('recaptcha', new FormControl(token));
              }
            } else {
              formGroup.set('recaptcha', token);
            }
            return this.httpRequest(formGroup, httpParams);
          }
        )
      );
  }

  /**
   * Envia una peticion services a traves del servicio recibido.
   * @param httpParams: Los parametros de la peticion Http
   * @param formGroup: El formulario a enviar.
   */
  private httpRequest(formGroup: FormGroup | FormData, httpParams: IHttpParameters): Observable<any> {
    if (httpParams.params) {
      httpParams.url = strFormat(httpParams.url, httpParams.params);
    }
    const value = formGroup instanceof FormGroup ? formGroup.value : formGroup;

    switch (httpParams.method) {
      case 'post':
        return this.httpClient.post(httpParams.url, value, {
          params: httpParams.qParams,
          headers: httpParams.headers
        });
      case 'patch':
        return this.httpClient.patch(httpParams.url, value, {
          params: httpParams.qParams,
          headers: httpParams.headers
        });
      case 'put':
        return this.httpClient.put(httpParams.url, value, {
          params: httpParams.qParams,
          headers: httpParams.headers
        });
    }
  }

  /**
   * Muestra un snackbar indicando que el formulario tiene errores.
   */
  public toastFormError(): void {
    this.translateService.get(['CHECK_FORM_ERRORS', 'CLOSE'])
      .pipe(take(1))
      .subscribe(
        (translations) => {
          this.snacBarRef$ = this.snackbar.open(translations.CHECK_FORM_ERRORS, translations.CLOSE, {
            duration: 5000,
            panelClass: 'snack-danger'
          });
        });
  }
}

