import { TestBed } from '@angular/core/testing';

import { FakeApiVuelosService } from './fake-api-vuelos.service';

describe('FakeApiVuelosService', () => {
  let service: FakeApiVuelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeApiVuelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
