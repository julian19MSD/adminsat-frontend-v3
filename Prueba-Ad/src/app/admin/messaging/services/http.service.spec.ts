import { TestBed } from '@angular/core/testing';

import { MessagingHttpService } from './http.service';

describe('MessagingHttpService', () => {
  let service: MessagingHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagingHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
