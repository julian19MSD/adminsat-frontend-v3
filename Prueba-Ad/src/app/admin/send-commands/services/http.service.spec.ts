import { TestBed } from '@angular/core/testing';

import { SendCommandsHttpService } from './http.service';

describe('SendCommandsHttpService', () => {
  let service: SendCommandsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendCommandsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
