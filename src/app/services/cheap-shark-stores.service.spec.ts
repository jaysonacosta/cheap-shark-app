import { TestBed } from '@angular/core/testing';

import { CheapSharkStoresService } from './cheap-shark-stores.service';

describe('CheapSharkStoresService', () => {
  let service: CheapSharkStoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheapSharkStoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
