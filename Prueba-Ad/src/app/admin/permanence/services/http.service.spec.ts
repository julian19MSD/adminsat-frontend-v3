import { TestBed } from '@angular/core/testing';

import { AssetEfficiencyHttpService } from './http.service';

describe('AssetEfficiencyHttpService', () => {
  let service: AssetEfficiencyHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetEfficiencyHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
