import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionAlojamientosComponent } from './gestion-alojamientos.component';
import { ApiService } from '../../services/api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('GestionAlojamientosComponent', () => {
  let component: GestionAlojamientosComponent;
  let fixture: ComponentFixture<GestionAlojamientosComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getAlojamientosCompletos',
      'getAlojamientos',
      'getDestinos',
      'postAlojamiento',
      'subirImagen',
      'subirRutaImagenAlojamientos',
      'deleteAlojamiento'
    ]);

    apiServiceSpy.getAlojamientosCompletos.and.returnValue(of({ alojamientos: [
      { id_alojamiento: 1, nombre_alojamiento: 'Aloj 1', id_destino: 1, ciudad: 'Madrid', pais: 'España', precio_dia: 100, descripcion: 'Desc', id_usuario: 1, correo: 'a@a.com', max_personas: 2, direccion: 'Calle 1', hora_entrada: '12:00', hora_salida: '14:00' }
    ]}));
    apiServiceSpy.getAlojamientos.and.returnValue(of([
      { id_alojamiento: 1, nombre_alojamiento: 'Aloj 1', id_destino: 1, ciudad: 'Madrid', pais: 'España', precio_dia: 100, descripcion: 'Desc', id_usuario: 1, correo: 'a@a.com', max_personas: 2, direccion: 'Calle 1', hora_entrada: '12:00', hora_salida: '14:00' }
    ]));
    apiServiceSpy.getDestinos.and.returnValue(of({ destinos: [{ id_destino: 1, ciudad: 'Madrid', pais: 'España' }] }));
    apiServiceSpy.postAlojamiento.and.returnValue(of({ id_alojamiento: 2 }));
    apiServiceSpy.subirImagen.and.returnValue(of({ imageUrl: 'url' }));
    apiServiceSpy.subirRutaImagenAlojamientos.and.returnValue(of({}));
    apiServiceSpy.deleteAlojamiento.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [GestionAlojamientosComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionAlojamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar alojamientos completos al iniciar', () => {
    expect(component.alojamientosCompletos.length).toBeGreaterThan(0);
    expect(component.alojamientosCompletos[0].nombre_alojamiento).toBe('Aloj 1');
  });

  it('debe cargar destinos', () => {
    expect(component.destinos.length).toBeGreaterThan(0);
    expect(component.destinos[0].ciudad).toBe('Madrid');
  });

  it('debe enviar el formulario de creación de alojamiento', () => {
    component.alojamientoForm.setValue({
      id_alojamiento: null,
      nombre_alojamiento: 'Nuevo Alojamiento',
      id_destino: 1,
      precio_dia: 120,
      descripcion: 'Desc test',
      id_usuario: 1,
      max_personas: 4,
      direccion: 'Calle Test',
      hora_entrada: '13:00',
      hora_salida: '15:00'
    });
    component.alojamientoImagenUrl = 'url';
    component.onSubmit();
    expect(apiServiceSpy.postAlojamiento).toHaveBeenCalled();
    expect(apiServiceSpy.subirRutaImagenAlojamientos).toHaveBeenCalled();
  });

  it('debe eliminar un alojamiento', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.eliminarAlojamiento(1);
    expect(apiServiceSpy.deleteAlojamiento).toHaveBeenCalledWith(1);
  });
});
