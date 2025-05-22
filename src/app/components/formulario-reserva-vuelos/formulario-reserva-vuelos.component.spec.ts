import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservaVuelosComponent } from './formulario-reserva-vuelos.component';

describe('FormularioReservaVuelosComponent', () => {
  let component: FormularioReservaVuelosComponent;
  let fixture: ComponentFixture<FormularioReservaVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReservaVuelosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioReservaVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
