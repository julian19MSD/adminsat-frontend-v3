import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonHeader} from '@shared/commons/header.common';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';

@Component({
  selector: 'adms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksHeaderComponent extends CommonHeader {

  constructor(headerMessengerService: HeaderMessengerService) {
    super(headerMessengerService);
  }
}
