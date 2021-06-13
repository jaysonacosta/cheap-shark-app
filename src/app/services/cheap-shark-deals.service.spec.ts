import { TestBed } from '@angular/core/testing';

import { CheapSharkDealsService } from './cheap-shark-deals.service';

describe('CheapSharkDealsService', () => {
  let service: CheapSharkDealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheapSharkDealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
