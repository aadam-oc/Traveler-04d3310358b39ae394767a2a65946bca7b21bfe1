import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservaVehiculosComponent } from './formulario-reserva-vehiculos.component';

describe('FormularioReservaVehiculosComponent', () => {
  let component: FormularioReservaVehiculosComponent;
  let fixture: ComponentFixture<FormularioReservaVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReservaVehiculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioReservaVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
