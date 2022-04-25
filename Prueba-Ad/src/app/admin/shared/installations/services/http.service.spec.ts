import { TestBed } from '@angular/core/testing';

import { SharedInstallationsHttpService } from './http.service';

describe('SharedInstallationsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedInstallationsHttpService = TestBed.get(SharedInstallationsHttpService);
    expect(service).toBeTruthy();
  });
});
