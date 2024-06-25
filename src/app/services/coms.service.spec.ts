import { TestBed } from '@angular/core/testing';

import { ComsService } from './coms.service';

describe('ComsService', () => {
  let service: ComsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
