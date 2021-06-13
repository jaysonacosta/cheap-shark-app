import { TestBed } from '@angular/core/testing';

import { CheapSharkService } from './cheap-shark.service';

describe('CheapSharkService', () => {
  let service: CheapSharkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheapSharkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
