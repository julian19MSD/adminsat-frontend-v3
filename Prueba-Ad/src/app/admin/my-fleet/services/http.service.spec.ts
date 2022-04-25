import { TestBed } from '@angular/core/testing';

import { MyFleetHttpService } from './http.service';

describe('TasksHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyFleetHttpService = TestBed.get(MyFleetHttpService);
    expect(service).toBeTruthy();
  });
});
