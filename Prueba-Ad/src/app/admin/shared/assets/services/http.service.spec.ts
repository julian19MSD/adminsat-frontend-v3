import {TestBed} from '@angular/core/testing';
import {SharedAssetHttpService} from './http.service';


describe('AssetDetailHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedAssetHttpService = TestBed.get(SharedAssetHttpService);
    expect(service).toBeTruthy();
  });
});
