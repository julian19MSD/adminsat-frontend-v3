import {OnDestroy} from '@angular/core';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';

import {CommonDestroy} from '@shared/commons/destroy.common';

export abstract class CommonHeader extends CommonDestroy implements OnDestroy {

  protected constructor(
    public headerMessengerService: HeaderMessengerService
  ) {
    super();
  }

  /**
   * Notifica desde el header un evento del click
   * @param key: La clave del elemento clickeado
   * @param value: El valor a notificar
   */
  sendHeaderClick(key: string, value: any = null) {
    this.headerMessengerService.sendMessageToComponent({key, value});
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.headerMessengerService.clearMessages();
  }
}


