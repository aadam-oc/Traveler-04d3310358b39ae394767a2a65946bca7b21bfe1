import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionVehiculosAlquilerComponent } from './gestion-vehiculos-alquiler.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';

describe('GestionVehiculosAlquilerComponent', () => {
  let component: GestionVehiculosAlquilerComponent;
  let fixture: ComponentFixture<GestionVehiculosAlquilerComponent>;
  let vehiculosServiceSpy: jasmine.SpyObj<FakeApiVehiculosService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    vehiculosServiceSpy = jasmine.createSpyObj('FakeApiVehiculosService', [
      'getVehiculosDetalles',
      'crearVehiculo',
      'actualizarVehiculo',
      'eliminarVehiculo'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    vehiculosServiceSpy.getVehiculosDetalles.and.returnValue(of([
      { id_vehiculo: 1, nombre_vehiculo: 'Coche', tipo_vehiculo: 'SUV', imagen: 'img.jpg' }
    ]));
    vehiculosServiceSpy.crearVehiculo.and.returnValue(of({}));
    vehiculosServiceSpy.actualizarVehiculo.and.returnValue(of({}));
    vehiculosServiceSpy.eliminarVehiculo.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [GestionVehiculosAlquilerComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: FakeApiVehiculosService, useValue: vehiculosServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionVehiculosAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar vehículos al iniciar', () => {
    expect(component.vehiculos.length).toBeGreaterThan(0);
    expect(component.vehiculos[0].nombre_vehiculo).toBe('Coche');
  });

  it('debe agregar un vehículo nuevo', () => {
    component.form.setValue({
      id_vehiculo: null,
      nombre_vehiculo: 'Moto',
      tipo_vehiculo: 'Scooter',
      imagen: null
    });
    component.agregarVehiculo();
    expect(vehiculosServiceSpy.crearVehiculo).toHaveBeenCalled();
  });

  it('debe actualizar un vehículo existente', () => {
    component.form.setValue({
      id_vehiculo: 1,
      nombre_vehiculo: 'Coche Actualizado',
      tipo_vehiculo: 'SUV',
      imagen: null
    });
    component.agregarVehiculo();
    expect(vehiculosServiceSpy.actualizarVehiculo).toHaveBeenCalledWith(1, jasmine.any(Object));
  });

  it('debe eliminar un vehículo', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'obtenerVehiculos');
    const vehiculo = { id_vehiculo: 1, nombre_vehiculo: 'Coche' };
    component.onDelete(vehiculo);
    expect(vehiculosServiceSpy.eliminarVehiculo).toHaveBeenCalledWith(1);
    expect(component.obtenerVehiculos).toHaveBeenCalled();
  });

  it('debe navegar al editar un vehículo', () => {
    component.onEdit(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/editarVehiculo/:id', { id: 1 }]);
  });

  it('debe resetear el formulario', () => {
    component.form.setValue({
      id_vehiculo: 2,
      nombre_vehiculo: 'Bici',
      tipo_vehiculo: 'Eléctrica',
      imagen: 'img2.jpg'
    });
    component.imagenPreview = 'preview';
    component.resetForm();
    expect(component.form.value.nombre_vehiculo).toBeNull();
    expect(component.imagenPreview).toBeNull();
  });

  it('debe permitir acceso solo si el rol es admin', () => {
    component.rol = 'admin';
    component.allowed = false;
    component.checkAllowed();
    expect(component.allowed).toBeTrue();
  });
});
