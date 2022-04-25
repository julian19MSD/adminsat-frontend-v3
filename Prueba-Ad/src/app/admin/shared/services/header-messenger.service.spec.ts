import { TestBed } from '@angular/core/testing';

import { HeaderMessengerService } from './header-messenger.service';

describe('HeaderMessengerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderMessengerService = TestBed.get(HeaderMessengerService);
    expect(service).toBeTruthy();
  });
});
