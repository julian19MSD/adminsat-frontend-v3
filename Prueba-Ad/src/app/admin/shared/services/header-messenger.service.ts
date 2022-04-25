import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {IHeaderMessage} from '@shared/models/header.model';

@Injectable()
export class HeaderMessengerService {
  headerSubject = new BehaviorSubject<IHeaderMessage>({} as IHeaderMessage);
  componentSubject = new BehaviorSubject<IHeaderMessage>({} as IHeaderMessage);

  sendMessageToHeader(value: IHeaderMessage) {
    this.headerSubject.next(value);
  }

  getMessageFromComponent(): Observable<IHeaderMessage> {
    return this.headerSubject.asObservable();
  }

  sendMessageToComponent(value: IHeaderMessage) {
    this.componentSubject.next(value);
  }

  getMessageFromHeader(): Observable<IHeaderMessage> {
    return this.componentSubject.asObservable();
  }

  clearMessages(): void {
    this.headerSubject.next({} as IHeaderMessage);
    this.componentSubject.next({} as IHeaderMessage);
  }
}
