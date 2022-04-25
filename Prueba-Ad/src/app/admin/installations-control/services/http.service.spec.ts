import { TestBed } from '@angular/core/testing';

import { InstallationsControlHttpService } from './http.service';

describe('InstallationsControlHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstallationsControlHttpService = TestBed.get(InstallationsControlHttpService);
    expect(service).toBeTruthy();
  });
});
