import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarAlojamientoComponent } from './editar-alojamiento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('EditarAlojamientoComponent', () => {
  let component: EditarAlojamientoComponent;
  let fixture: ComponentFixture<EditarAlojamientoComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getDestinos',
      'getAlojamientoJoinById',
      'putAlojamientoCompleto'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getDestinos.and.returnValue(of({
      destinos: [
        { id_destino: 1, ciudad: 'Madrid', pais: 'España' }
      ]
    }));

    apiServiceSpy.getAlojamientoJoinById.and.returnValue(of({
      alojamientos: [
        {
          id_destino: 1,
          nombre_alojamiento: 'Hotel Test',
          precio_dia: 100,
          descripcion: 'Desc test',
          max_personas: 2,
          direccion: 'Calle Test',
          hora_entrada: '12:00',
          hora_salida: '14:00',
          id_usuario: 5
        }
      ]
    }));

    apiServiceSpy.putAlojamientoCompleto.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [EditarAlojamientoComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 10 }),
            queryParams: of({}),
            data: of({}),
            snapshot: { params: { id: 10 }, data: {} },
            parent: null,
            firstChild: null
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar destinos al iniciar', () => {
    component.getDestinos();
    expect(apiServiceSpy.getDestinos).toHaveBeenCalled();
    expect(component.destinos.length).toBeGreaterThan(0);
    expect(component.destinos[0].ciudad).toBe('Madrid');
  });

  it('debe cargar datos del alojamiento en el formulario', () => {
    component.id_alojamiento = 10;
    component.getAlojamiento();
    expect(apiServiceSpy.getAlojamientoJoinById).toHaveBeenCalledWith(10);
    expect(component.editaralojamientoForm.value.nombre_alojamiento).toBe('Hotel Test');
    expect(component.editaralojamientoForm.value.precio_dia).toBe(100);
  });

  it('debe enviar el formulario de edición', () => {
    component.id_alojamiento = 10;
    component.id_usuario = 5;
    component.editaralojamientoForm.setValue({
      id_destino: 1,
      nombre_alojamiento: 'Hotel Test',
      precio_dia: 100,
      descripcion: 'Desc test',
      max_personas: 2,
      direccion: 'Calle Test',
      hora_entrada: '12:00',
      hora_salida: '14:00'
    });
    component.onSubmit();
    expect(apiServiceSpy.putAlojamientoCompleto).toHaveBeenCalledWith(10, jasmine.objectContaining({
      nombre_alojamiento: 'Hotel Test',
      id_usuario: 5
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('no debe enviar si el formulario es inválido', () => {
    component.editaralojamientoForm.reset();
    spyOn(console, 'log');
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Formulario inválido');
    expect(apiServiceSpy.putAlojamientoCompleto).not.toHaveBeenCalled();
  });

  it('debe navegar a alojamientos al cancelar', () => {
    component.navigateToAlojamientos();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alojamientos']);
  });

  
});
