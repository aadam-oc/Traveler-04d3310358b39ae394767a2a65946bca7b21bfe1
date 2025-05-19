import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeApiVuelosService } from './fake-api-vuelos.service';

describe('FakeApiVuelosService', () => {
  let service: FakeApiVuelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FakeApiVuelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
