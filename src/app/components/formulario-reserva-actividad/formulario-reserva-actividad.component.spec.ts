import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservaActividadComponent } from './formulario-reserva-actividad.component';

describe('FormularioReservaActividadComponent', () => {
  let component: FormularioReservaActividadComponent;
  let fixture: ComponentFixture<FormularioReservaActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReservaActividadComponent]
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
