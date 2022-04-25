import {Injectable} from '@angular/core';
import {INotificationItem} from '@shared/models/notification.model';
import {HttpErrorResponse} from '@angular/common/http';
import {hideLoader} from '@shared/utils/general.utils';
import {NotificationDialogComponent} from '@core/components/notification/notification.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import * as cloneDeep from 'lodash/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  sendSuccessNotification(params: { [propName: string]: any } = {}, msg: string | Array<string> = null, contentTitle: string = 'UPDATE_SUCCESSFUL', validateMail: Array<string> = []): Observable<any> {
    hideLoader(true);

    const message: INotificationItem = {
      title: 'GOOD_JOB',
      contentTitle,
      contentType: 'success',
      ...params
    };

    if (typeof msg === 'string') {
      message.content = [msg];
    } else if (Array.isArray(msg)) {
      message.content = msg;
    }

    if (validateMail.length > 0) {
      if (!Array.isArray(message.content)) {
        message.content = [];
      }
      if (!Array.isArray(message.contentItert)) {
        message.contentItert = [];
      }
      message.content.push('MAIL_VALIDATE_NEEDED');
      message.content.push('MAIL_VALIDATE_SENDED');
      message.contentItert.push(['', validateMail]);
    }
    return this.showNotification(message);
  }

  /**
   * Retorna un objeto con la informa del mensaje a mostrar.
   * @param params: Parametros personalizados del usuario.
   * @param err: El objeto del error
   * @param showAll: Un indicador si debe mostrar la lista de campos y sus errores en el mensaje.
   */
  sendErrorNotification(params: { [propName: string]: string | number }, err: HttpErrorResponse, showAll = false): Observable<any> {
    hideLoader(true);
    let message: INotificationItem;

    if (navigator.onLine && err?.status !== 0) {
      message = cloneDeep(params) as INotificationItem;

      if (err?.status === 403) {

        if (err?.error?.permissions?.length > 0) {
          err.error.permissions.forEach((item, index) => {
            err.error.permissions[index] = item.replace('.', '__');
          });
          message.contentItert = [['PERMISSIONS_REQUIRED', err.error.permissions || []]];
        }
        message.contentTitle = err.error.detail;
        message.contentType = 'info';

      } else {

        message.contentTitle = 'BAD_REQUEST';
        message.contentType = 'error';

        if (err?.error) {

          let error = err.error;

          if (showAll) {
            Object.keys(error).forEach(key => {
              if (!['recaptcha', 'non_field_errors', 'detail'].includes(key)) {
                const errorValue = Array.isArray(error[key]) ? error[key] : [error[key]];
                if (!Array.isArray(message.contentItert)) {
                  message.contentItert = [];
                }
                message.contentItert.push([key, errorValue]);
              }
            });
          }

          if ('recaptcha' in error) {
            if (!Array.isArray(message.contentItert)) {
              message.contentItert = [];
            }
            message.contentItert.push(['reCAPTCHA', error.recaptcha]);
          } else if ('non_field_errors' in error) {
            error = error.non_field_errors;
          } else if ('detail' in error) {
            error = error.detail;
          }

          if (typeof error === 'string') {
            message.content = [error];
          } else if (Array.isArray(error)) {
            message.content = error;
          }
        } else if (err?.message) {

          message.content = [err.message];
        }
      }
      return this.showNotification(message);
    }
  }

  private showNotification(message: INotificationItem): Observable<any> {

    return this.dialog.open(NotificationDialogComponent, {
      panelClass: ['notification', message.customClass],
      disableClose: true,
      data: message
    }).afterClosed();
  }
}
