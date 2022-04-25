import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export abstract class CommonDestroy implements OnDestroy {
  ngDestroyed$ = new Subject();

  protected constructor() {
  }

  ngOnDestroy(): void {

    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}




