import { TestBed } from '@angular/core/testing';

import { SharedRoadActorHttpService } from './http.service';

describe('RoadActorDetailsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedRoadActorHttpService = TestBed.get(SharedRoadActorHttpService);
    expect(service).toBeTruthy();
  });
});
