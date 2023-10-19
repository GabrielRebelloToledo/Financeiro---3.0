import { TestBed } from '@angular/core/testing';

import { InclusaoSeviceService } from './inclusao-sevice.service';

describe('InclusaoSeviceService', () => {
  let service: InclusaoSeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InclusaoSeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
