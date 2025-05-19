import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarTiposActividadesComponent } from './editar-tipos-actividades.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('EditarTiposActividadesComponent', () => {
  let component: EditarTiposActividadesComponent;
  let fixture: ComponentFixture<EditarTiposActividadesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getTipoActividadById',
      'putTipoActividad'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getTipoActividadById.and.returnValue(of({
      tipo_actividad: { nombre_tipo_actividad: 'Aventura' }
    }));
    apiServiceSpy.putTipoActividad.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [EditarTiposActividadesComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 5 }),
            snapshot: { params: { id: 5 }, data: {} }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarTiposActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener el id del tipo de actividad desde la ruta', () => {
    component.getIdTipoActividad();
    expect(component.id_tipo_actividad).toBe(5);
  });

  it('debe cargar los datos del tipo de actividad en el formulario', () => {
    component.id_tipo_actividad = 5;
    component.getTipoActividad();
    expect(apiServiceSpy.getTipoActividadById).toHaveBeenCalledWith(5);
    expect(component.editarTipoActividadForm.value.nombre_tipo_actividad).toBe('Aventura');
  });

  it('debe enviar el formulario de edición', () => {
    component.id_tipo_actividad = 5;
    component.editarTipoActividadForm.setValue({ nombre_tipo_actividad: 'Cultural' });
    component.onSubmit();
    expect(apiServiceSpy.putTipoActividad).toHaveBeenCalledWith(5, { nombre_tipo_actividad: 'Cultural' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('no debe enviar si el formulario es inválido', () => {
    component.editarTipoActividadForm.reset();
    spyOn(console, 'error');
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Formulario inválido');
    expect(apiServiceSpy.putTipoActividad).not.toHaveBeenCalled();
  });

  it('debe navegar a la gestión al cancelar', () => {
    component.navigateToTiposActividades();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/gestionTiposActividades']);
  });

  it('redirige al home si no hay id en params', () => {
    const route = TestBed.inject(ActivatedRoute);
    (route.params as any) = of({});
    component.getIdTipoActividad();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('redirige al home si getTipoActividad da error', () => {
    apiServiceSpy.getTipoActividadById.and.returnValue(throwError(() => new Error('error')));
    component.id_tipo_actividad = 5;
    component.getTipoActividad();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
