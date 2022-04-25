import { TestBed } from '@angular/core/testing';

import { FormManageService } from './form-manage.service';

describe('formManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormManageService = TestBed.get(FormManageService);
    expect(service).toBeTruthy();
  });
});
