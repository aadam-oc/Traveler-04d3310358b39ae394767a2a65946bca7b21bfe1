import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormularioReservaActividadComponent } from './formulario-reserva-actividad.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('FormularioReservaActividadComponent', () => {
  let component: FormularioReservaActividadComponent;
  let fixture: ComponentFixture<FormularioReservaActividadComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'postReservaActividad',
      'getActividadById'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.postReservaActividad.and.returnValue(of({}));
    apiServiceSpy.getActividadById.and.returnValue(of({
      id_actividad: 1,
      nombre_tipo_actividad: 'Kayak', // <-- Propiedad correcta
      descripcion: 'Desc',
      precio: 20
    }));

    await TestBed.configureTestingModule({
      imports: [FormularioReservaActividadComponent, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
            snapshot: { params: { id: 1 }, data: {} }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioReservaActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener el id de la actividad desde la ruta', () => {
    component.getIdActividad();
    expect(component.id_actividad).toBe(1);
  });

  it('debe cargar los datos de la actividad seleccionada', () => {
    component.id_actividad = 1;
    component.ngOnInit();
    expect(apiServiceSpy.getActividadById).toHaveBeenCalledWith(1);
    expect(component.actividadSeleccionada.nombre_tipo_actividad).toBe('Kayak');
  });

  it('debe enviar el formulario de reserva de actividad correctamente', () => {
    spyOn(window, 'alert');
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'id_actividad') return '1';
      if (key === 'id_usuario') return '2';
      return null;
    });
    component.form.setValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@test.com',
      telefono: '123456789',
      fecha_actividad: '2024-06-01',
      hora_actividad: '10:00:00'
    });
    component.onSubmit();
    expect(apiServiceSpy.postReservaActividad).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Reserva de actividad completada');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('no debe enviar si el formulario es inválido', () => {
    spyOn(window, 'alert');
    component.form.reset();
    Object.values(component.form.controls).forEach(control => control.markAsTouched());
    component.onSubmit();
    expect(apiServiceSpy.postReservaActividad).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos requeridos.');
  });

  it('muestra error si postReservaActividad da error', () => {
    apiServiceSpy.postReservaActividad.and.returnValue(throwError(() => new Error('error')));
    spyOn(window, 'alert');
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'id_actividad') return '1';
      if (key === 'id_usuario') return '2';
      return null;
    });
    component.form.setValue({
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@test.com',
      telefono: '123456789',
      fecha_actividad: '2024-06-01',
      hora_actividad: '10:00:00'
    });
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Hubo un error al realizar la reserva. Inténtalo de nuevo.');
  });

  it('muestra error si getActividadById da error', () => {
    apiServiceSpy.getActividadById.and.returnValue(throwError(() => new Error('error')));
    spyOn(window, 'alert');
    component.id_actividad = 1;
    component.ngOnInit();
    expect(window.alert).toHaveBeenCalledWith('Error al cargar la actividad. Por favor, inténtalo más tarde.');
  });

  
});
