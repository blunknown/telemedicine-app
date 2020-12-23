import { TestBed } from '@angular/core/testing';

import { TeletryService } from './teletry.service';

describe('TeletryService', () => {
  let service: TeletryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeletryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
