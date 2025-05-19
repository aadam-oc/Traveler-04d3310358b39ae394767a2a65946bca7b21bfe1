import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarVehiculoComponent } from './editar-vehiculo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';
import { of, throwError } from 'rxjs';

describe('EditarVehiculoComponent', () => {
  let component: EditarVehiculoComponent;
  let fixture: ComponentFixture<EditarVehiculoComponent>;
  let vehiculosServiceSpy: jasmine.SpyObj<FakeApiVehiculosService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    vehiculosServiceSpy = jasmine.createSpyObj('FakeApiVehiculosService', [
      'getVehiculosDetallesById',
      'actualizarVehiculo'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    vehiculosServiceSpy.getVehiculosDetallesById.and.returnValue(of({
      id_vehiculo: 1,
      nombre_vehiculo: 'Coche',
      nombre_tipo_vehiculo: 'SUV',
      id_destino: 2,
      imagen: 'img.jpg'
    }));
    vehiculosServiceSpy.actualizarVehiculo.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [EditarVehiculoComponent, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: FakeApiVehiculosService, useValue: vehiculosServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 },
              data: {},
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return '1';
                  return null;
                }
              }
            },
            params: of({ id: 1 }),
            data: of({}),
            queryParams: of({}),
            parent: null,
            firstChild: null
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los datos del vehículo en el formulario', () => {
    component.vehiculoId = 1;
    component.cargarVehiculo();
    expect(vehiculosServiceSpy.getVehiculosDetallesById).toHaveBeenCalledWith(1);
    expect(component.form.value.nombre_vehiculo).toBe('Coche');
    expect(component.form.value.tipo_vehiculo).toBe('SUV');
    expect(component.form.value.id_destino).toBe(2);
  });

  it('debe enviar el formulario de edición', () => {
    component.vehiculoId = 1;
    component.form.setValue({
      id_vehiculo: 1,
      nombre_vehiculo: 'Coche Editado',
      tipo_vehiculo: 'Sedán',
      id_destino: 3,
      imagen: null
    });
    component.guardarCambios();
    expect(vehiculosServiceSpy.actualizarVehiculo).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('no debe enviar si el formulario es inválido', () => {
    component.form.reset();
    spyOn(window, 'alert');
    component.guardarCambios();
    expect(vehiculosServiceSpy.actualizarVehiculo).not.toHaveBeenCalled();
  });

  it('muestra error si getVehiculosDetallesById da error', () => {
    vehiculosServiceSpy.getVehiculosDetallesById.and.returnValue(throwError(() => new Error('error')));
    spyOn(window, 'alert');
    component.vehiculoId = 1;
    component.cargarVehiculo();
    expect(window.alert).toHaveBeenCalledWith('No se pudo cargar el vehículo');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('muestra error si actualizarVehiculo da error', () => {
    vehiculosServiceSpy.actualizarVehiculo.and.returnValue(throwError(() => new Error('error')));
    spyOn(window, 'alert');
    component.vehiculoId = 1;
    component.form.setValue({
      id_vehiculo: 1,
      nombre_vehiculo: 'Coche Editado',
      tipo_vehiculo: 'Sedán',
      id_destino: 3,
      imagen: null
    });
    component.guardarCambios();
    expect(window.alert).toHaveBeenCalledWith('Error al actualizar el vehículo');
  });

  it('debe navegar al cancelar', () => {
    component.cancelar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
