import { TestBed } from '@angular/core/testing';

import { AssetHttpService } from './http.service';

describe('AssetHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetHttpService = TestBed.get(AssetHttpService);
    expect(service).toBeTruthy();
  });
});
