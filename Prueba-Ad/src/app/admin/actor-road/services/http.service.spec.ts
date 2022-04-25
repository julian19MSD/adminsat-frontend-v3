import { TestBed } from '@angular/core/testing';

import { ActorRoadHttpService } from './http.service';

describe('ActorRoadHttpService', () => {
  let service: ActorRoadHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorRoadHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
