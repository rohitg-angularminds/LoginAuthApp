import { TestBed } from '@angular/core/testing';

import { SellerProfileGuard } from './seller.guard';

describe('ProfileGuard', () => {
  let guard: SellerProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellerProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
