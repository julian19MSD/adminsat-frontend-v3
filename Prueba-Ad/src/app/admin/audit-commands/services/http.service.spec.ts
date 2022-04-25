import { TestBed } from '@angular/core/testing';

import { CommandsHttpService } from './http.service';

describe('CommandsHttpService', () => {
  let service: CommandsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
