import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeApiVehiculosService } from './fake-api-vehiculos.service';

describe('FakeApiVehiculosService', () => {
  let service: FakeApiVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // <-- Añade esto
    });
    service = TestBed.inject(FakeApiVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
