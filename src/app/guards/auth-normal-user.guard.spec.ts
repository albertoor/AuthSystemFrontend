import { TestBed } from '@angular/core/testing';

import { AuthNormalUserGuard } from './auth-normal-user.guard';

describe('AuthNormalUserGuard', () => {
  let guard: AuthNormalUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthNormalUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
