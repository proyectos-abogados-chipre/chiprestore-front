import { TestBed } from '@angular/core/testing';

import { PrendasService } from './prendas.service';

describe('PrendasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrendasService = TestBed.get(PrendasService);
    expect(service).toBeTruthy();
  });
});
