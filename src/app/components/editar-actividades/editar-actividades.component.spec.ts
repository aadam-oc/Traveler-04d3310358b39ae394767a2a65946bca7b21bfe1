import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarActividadesComponent } from './editar-actividades.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('EditarActividadesComponent', () => {
  let component: EditarActividadesComponent;
  let fixture: ComponentFixture<EditarActividadesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getActividadesJoinById',
      'putActividadCompleta'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getActividadesJoinById.and.returnValue(of({
      actividades: [
        {
          id_tipo_actividad: 1,
          id_destino: 2,
          disponibilidad_actividad: 'Disponible',
          precio: 100,
          descripcion: 'Desc',
          nombre_tipo_actividad: 'Aventura',
          pais: 'España',
          ciudad: 'Madrid',
          id_imagen_actividad: 10,
          nombre_imagen_actividad: 'img.jpg'
        }
      ]
    }));
    apiServiceSpy.putActividadCompleta.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [EditarActividadesComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id_actividad: 5 })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar la actividad al iniciar', () => {
    expect(component.editaractividadForm.value.nombre_tipo_actividad).toBe('Aventura');
    expect(component.editaractividadForm.value.pais).toBe('España');
    expect(component.editaractividadForm.value.ciudad).toBe('Madrid');
  });

  it('debe enviar el formulario de edición', () => {
    component.id_actividad = 5;
    component.editaractividadForm.setValue({
      id_tipo_actividad: 1,
      id_destino: 2,
      disponibilidad_actividad: 'Disponible',
      precio: 100,
      descripcion: 'Desc',
      nombre_tipo_actividad: 'Aventura',
      pais: 'España',
      ciudad: 'Madrid',
      id_imagen_actividad: 10,
      nombre_imagen_actividad: 'img.jpg'
    });
    component.onSubmit();
    expect(apiServiceSpy.putActividadCompleta).toHaveBeenCalledWith(5, jasmine.any(Object));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('no debe enviar si el formulario es inválido', () => {
    component.editaractividadForm.reset();
    spyOn(console, 'log');
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Formulario inválido');
    expect(apiServiceSpy.putActividadCompleta).not.toHaveBeenCalled();
  });
});
