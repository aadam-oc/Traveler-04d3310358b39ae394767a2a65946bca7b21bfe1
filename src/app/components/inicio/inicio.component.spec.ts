import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InicioComponent } from './inicio.component';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getAlojamientosCompletos',
      'getImagenesAlojamientos',
      'getActividadesJoin'
    ]);

    // Mock por defecto para evitar errores de subscribe
    apiServiceSpy.getAlojamientosCompletos.and.returnValue(of({ alojamientos: [] }));
    apiServiceSpy.getImagenesAlojamientos.and.returnValue(of({ imagenes: [] }));
    apiServiceSpy.getActividadesJoin.and.returnValue(of({ actividades: [] }));

    await TestBed.configureTestingModule({
      imports: [InicioComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener y mostrar alojamientos destacados', () => {
    const mockAlojamientos = [
      { id_alojamiento: 1, nombre_alojamiento: 'Hotel Uno', id_destino: 1, precio_dia: 50, descripcion: 'Desc', id_usuario: 1, max_personas: 2, direccion: 'Calle 1', pais: 'España', ciudad: 'Madrid', correo: 'a@a.com', imagenes: [] },
      { id_alojamiento: 2, nombre_alojamiento: 'Hotel Dos', id_destino: 2, precio_dia: 60, descripcion: 'Desc', id_usuario: 2, max_personas: 3, direccion: 'Calle 2', pais: 'Francia', ciudad: 'París', correo: 'b@b.com', imagenes: [] },
      { id_alojamiento: 3, nombre_alojamiento: 'Hotel Tres', id_destino: 3, precio_dia: 70, descripcion: 'Desc', id_usuario: 3, max_personas: 4, direccion: 'Calle 3', pais: 'Italia', ciudad: 'Roma', correo: 'c@c.com', imagenes: [] }
    ];
    apiServiceSpy.getAlojamientosCompletos.and.returnValue(of({ alojamientos: mockAlojamientos }));
    apiServiceSpy.getImagenesAlojamientos.and.returnValue(of({ imagenes: ['img1.jpg'] }));

    component.ngOnInit();
    expect(apiServiceSpy.getAlojamientosCompletos).toHaveBeenCalled();
  });

  it('debe obtener y mostrar actividades destacadas', () => {
    const mockActividades = [
      { id_actividad: 1, nombre_tipo_actividad: 'Kayak', descripcion: 'Desc', pais: 'España', ciudad: 'Madrid', nombre_imagen_actividad: 'img1.jpg', precio: 20 },
      { id_actividad: 2, nombre_tipo_actividad: 'Escalada', descripcion: 'Desc', pais: 'Francia', ciudad: 'París', nombre_imagen_actividad: 'img2.jpg', precio: 30 },
      { id_actividad: 3, nombre_tipo_actividad: 'Rafting', descripcion: 'Desc', pais: 'Italia', ciudad: 'Roma', nombre_imagen_actividad: 'img3.jpg', precio: 40 }
    ];
    apiServiceSpy.getActividadesJoin.and.returnValue(of({ actividades: mockActividades }));

    component.getActividades();
    expect(apiServiceSpy.getActividadesJoin).toHaveBeenCalled();
    expect(component.actividades.length).toBe(3);
    expect(component.actividades[0].nombre_tipo_actividad).toBe('Kayak');
  });

  it('debe mostrar el botón scroll-top al hacer scroll', () => {
    component.mostrarBoton = false;
    window.scrollTo(0, 400);
    component.onScroll();
    expect(component.mostrarBoton).toBeTrue();
  });

  it('scrollToSection debe hacer scroll al elemento destacados', () => {
    const scrollSpy = spyOn(document, 'getElementById').and.returnValue({
      scrollIntoView: jasmine.createSpy('scrollIntoView')
    } as any);
    component.scrollToSection();
    expect(scrollSpy).toHaveBeenCalledWith('destacados');
  });

  it('scrollToTop debe hacer scroll al elemento hero-content', () => {
    const scrollSpy = spyOn(document, 'getElementById').and.returnValue({
      scrollIntoView: jasmine.createSpy('scrollIntoView')
    } as any);
    component.scrollToTop();
    expect(scrollSpy).toHaveBeenCalledWith('hero-content');
  });

  it('debe manejar error al obtener alojamientos', () => {
    apiServiceSpy.getAlojamientosCompletos.and.returnValue(throwError(() => new Error('error')));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('Error fetching alojamientos completos:', jasmine.any(Error));
  });
});
