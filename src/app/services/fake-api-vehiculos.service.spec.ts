import { TestBed } from '@angular/core/testing';

import { FakeApiVehiculosService } from './fake-api-vehiculos.service';

describe('FakeApiVehiculosService', () => {
  let service: FakeApiVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeApiVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
