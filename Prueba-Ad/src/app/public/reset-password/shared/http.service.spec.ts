import { TestBed } from '@angular/core/testing';

import { ResetPasswordHttpService } from './http.service';

describe('MailValidationHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetPasswordHttpService = TestBed.get(ResetPasswordHttpService);
    expect(service).toBeTruthy();
  });
});
