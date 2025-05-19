import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormularioReservaActividadComponent } from './formulario-reserva-actividad.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FormularioReservaActividadComponent', () => {
  let component: FormularioReservaActividadComponent;
  let fixture: ComponentFixture<FormularioReservaActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReservaActividadComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { params: {}, data: {} }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioReservaActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
