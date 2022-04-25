import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {filter, takeUntil} from 'rxjs/operators';

import {CommonDestroy} from '@shared/commons/destroy.common';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {IFormHeaderState} from '@shared/models/header.model';

@Component({
  selector: 'adms-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormHeaderComponent extends CommonDestroy implements AfterViewInit {

  config: IFormHeaderState;

  constructor(
    private headerMessengerService: HeaderMessengerService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.headerMessengerService.getMessageFromComponent()
      .pipe(
        filter((e) => !!e && !!e.value),
        takeUntil(this.ngDestroyed$),
      ).subscribe((res) => {
      this.config = res.value;
      this.cdRef.detectChanges();
    });
  }
}
