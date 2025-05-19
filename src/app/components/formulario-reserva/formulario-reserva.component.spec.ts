import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormularioReservaComponent } from './formulario-reserva.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('FormularioReservaComponent', () => {
  let component: FormularioReservaComponent;
  let fixture: ComponentFixture<FormularioReservaComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'postReserva',
      'getAlojamientoById'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.postReserva.and.returnValue(of({}));
    apiServiceSpy.getAlojamientoById.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [FormularioReservaComponent, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe enviar el formulario de reserva correctamente', () => {
    spyOn(window, 'alert');
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'id_alojamiento') return '1';
      if (key === 'id_usuario') return '2';
      return null;
    });
    component.form.setValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@test.com',
      telefono: '123456789',
      fecha_entrada_alojamiento: '2024-06-01',
      fecha_salida_alojamiento: '2024-06-05',
      fechaReserva: '2024-05-20'
    });
    component.onSubmit();
    expect(apiServiceSpy.postReserva).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Reserva Completada');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('no debe enviar si el formulario es inválido', () => {
    spyOn(window, 'alert');
    component.form.reset();
    Object.values(component.form.controls).forEach(control => control.markAsTouched());
    component.onSubmit();
    expect(apiServiceSpy.postReserva).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos requeridos.');
  });

  it('muestra error si postReserva da error', () => {
    apiServiceSpy.postReserva.and.returnValue(throwError(() => new Error('error')));
    spyOn(window, 'alert');
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'id_alojamiento') return '1';
      if (key === 'id_usuario') return '2';
      return null;
    });
    component.form.setValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@test.com',
      telefono: '123456789',
      fecha_entrada_alojamiento: '2024-06-01',
      fecha_salida_alojamiento: '2024-06-05',
      fechaReserva: '2024-05-20'
    });
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Hubo un error al realizar la reserva. Inténtalo de nuevo.');
  });

  it('debe obtener alojamiento correctamente', () => {
    spyOn(localStorage, 'getItem').and.returnValue('1');
    component.getAlojamiento();
    expect(apiServiceSpy.getAlojamientoById).toHaveBeenCalledWith(1);
  });

  it('muestra error si getAlojamiento da error', () => {
    apiServiceSpy.getAlojamientoById.and.returnValue(throwError(() => new Error('error')));
    spyOn(console, 'error');
    spyOn(localStorage, 'getItem').and.returnValue('1');
    component.getAlojamiento();
    expect(console.error).toHaveBeenCalledWith('Error al obtener el alojamiento:', jasmine.any(Error));
  });
});
