import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionTiposActividadesComponent } from './gestion-tipos-actividades.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('GestionTiposActividadesComponent', () => {
  let component: GestionTiposActividadesComponent;
  let fixture: ComponentFixture<GestionTiposActividadesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getTiposActividades',
      'postTipoActividad',
      'deleteTipoActividad'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getTiposActividades.and.returnValue(of({
      tipo_actividad: [
        { id_tipo_actividad: 1, nombre_tipo_actividad: 'Aventura' }
      ]
    }));
    apiServiceSpy.postTipoActividad.and.returnValue(of({ id_tipo_actividad: 2, nombre_tipo_actividad: 'Cultural' }));
    apiServiceSpy.deleteTipoActividad.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [GestionTiposActividadesComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionTiposActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar tipos de actividades al iniciar', () => {
    expect(component.tiposActividades.length).toBeGreaterThan(0);
    expect(component.tiposActividades[0].nombre_tipo_actividad).toBe('Aventura');
  });

  it('debe enviar el formulario de creación de tipo de actividad', () => {
    component.formCrearTiposActividades.setValue({ nombre_tipo_actividad: 'Cultural' });
    component.onSubmit();
    expect(apiServiceSpy.postTipoActividad).toHaveBeenCalled();
  });

  it('debe eliminar un tipo de actividad', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'getTipoActividades');
    component.eliminarTipoActividad(1);
    expect(apiServiceSpy.deleteTipoActividad).toHaveBeenCalledWith(1);
    expect(component.getTipoActividades).toHaveBeenCalled();
  });

  it('debe navegar al editar un tipo de actividad', () => {
    component.editarTipoActividad(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/editarTiposActividades', 1]);
  });

  it('debe permitir acceso solo si el rol es admin', () => {
    component.rol = 'admin';
    component.allowed = false;
    component.checkAllowed();
    expect(component.allowed).toBeTrue();
  });
});
