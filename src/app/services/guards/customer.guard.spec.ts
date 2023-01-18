import { TestBed } from '@angular/core/testing';

import { CustomerProfileGuard } from './customer.guard';

describe('CustomerGuard', () => {
  let guard: CustomerProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
