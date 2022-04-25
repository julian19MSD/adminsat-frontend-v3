import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';

import {CommonHeader} from '@shared/commons/header.common';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'adms-opened-sessions-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenedSessionsHeaderComponent extends CommonHeader implements AfterViewInit {
  openedSessions: boolean;

  constructor(
    headerMessengerService: HeaderMessengerService,
    private cdRef: ChangeDetectorRef
  ) {
    super(headerMessengerService);
  }

  ngAfterViewInit(): void {
    this.headerMessengerService.getMessageFromComponent()
      .pipe(
        filter((e) => !!e && !!e.value),
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(state => {
        this.openedSessions = state.value.totalListItemsCounter > 0;
        this.cdRef.detectChanges();
      });
  }

}
