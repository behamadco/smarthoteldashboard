import { TestBed } from '@angular/core/testing';

import { FoodhallService } from './foodhall.service';

describe('FoodhallService', () => {
  let service: FoodhallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodhallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
