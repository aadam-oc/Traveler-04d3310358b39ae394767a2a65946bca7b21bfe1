import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionActividadesComponent } from './gestion-actividades.component';
import { ApiService } from '../../services/api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('GestionActividadesComponent', () => {
  let component: GestionActividadesComponent;
  let fixture: ComponentFixture<GestionActividadesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getActividadCompleta',
      'getDestinos',
      'getTiposActividades',
      'getActividades',
      'postActividad',
      'subirImagen',
      'subirRutaImagenActividades',
      'deleteActividad'
    ]);

    apiServiceSpy.getActividadCompleta.and.returnValue(of({ actividades: [
      { id_actividad: 1, descripcion: 'Act 1', id_usuario_actividad: 1, nombre_tipo_actividad: 'Tipo 1', pais: 'España', ciudad: 'Madrid', disponibilidad_actividad: true, precio: 10 }
    ]}));
    apiServiceSpy.getDestinos.and.returnValue(of({ destinos: [{ id_destino: 1, ciudad: 'Madrid', pais: 'España' }] }));
    apiServiceSpy.getTiposActividades.and.returnValue(of({ tipo_actividad: [{ id_tipo_actividad: 1, nombre_tipo_actividad: 'Tipo 1' }] }));
    apiServiceSpy.getActividades.and.returnValue(of([]));
    apiServiceSpy.postActividad.and.returnValue(of({ id_actividad: 2 }));
    apiServiceSpy.subirImagen.and.returnValue(of({ imageUrl: 'url' }));
    apiServiceSpy.subirRutaImagenActividades.and.returnValue(of({}));
    apiServiceSpy.deleteActividad.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [GestionActividadesComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar actividades completas al iniciar', () => {
    expect(component.actividadesCompletas.length).toBeGreaterThan(0);
    expect(component.actividadesCompletas[0].descripcion).toBe('Act 1');
  });

  it('debe cargar destinos y tipos de actividades', () => {
    expect(component.destinos.length).toBeGreaterThan(0);
    expect(component.tipoActividades.length).toBeGreaterThan(0);
  });

  it('debe enviar el formulario de creación de actividad', () => {
    component.formCrearActividad.setValue({
      id_actividad: null,
      id_tipo_actividad: 1,
      id_destino: 1,
      descripcion: 'Nueva actividad',
      disponibilidad_actividad: true,
      precio: 50
    });
    component.imagenUrl = 'url';
    component.onSubmit();
    expect(apiServiceSpy.postActividad).toHaveBeenCalled();
    expect(apiServiceSpy.subirRutaImagenActividades).toHaveBeenCalled();
  });
});
