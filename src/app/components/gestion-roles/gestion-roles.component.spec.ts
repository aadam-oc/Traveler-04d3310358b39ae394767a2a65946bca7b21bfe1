import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionRolesComponent } from './gestion-roles.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('GestionRolesComponent', () => {
  let component: GestionRolesComponent;
  let fixture: ComponentFixture<GestionRolesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getRoles',
      'postRol',
      'deleteRol'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getRoles.and.returnValue(of({
      roles: [
        { id_rol: 1, nombre_rol: 'admin' }
      ]
    }));
    apiServiceSpy.postRol.and.returnValue(of({ message: 'Rol creado' }));
    apiServiceSpy.deleteRol.and.returnValue(of({ message: 'Rol eliminado' }));

    await TestBed.configureTestingModule({
      imports: [GestionRolesComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar roles al iniciar', () => {
    expect(component.roles.length).toBeGreaterThan(0);
    expect(component.roles[0].nombre_rol).toBe('admin');
  });

  it('debe enviar el formulario de creación de rol', () => {
    component.formCrearRol.setValue({ nombre_rol: 'nuevoRol' });
    component.onSubmit();
    expect(apiServiceSpy.postRol).toHaveBeenCalled();
  });

  it('debe eliminar un rol', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const rol = { id_rol: 1, nombre_rol: 'admin' };
    spyOn(component, 'getRoles');
    component.onDelete(rol);
    expect(apiServiceSpy.deleteRol).toHaveBeenCalledWith(1);
    expect(component.getRoles).toHaveBeenCalled();
  });

  it('debe navegar al editar un rol', () => {
    component.onEdit(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/editarRol', 1]);
  });

  it('debe permitir acceso solo si el rol es admin', () => {
    component.rol = 'admin';
    component.allowed = false;
    component.checkAllowed();
    expect(component.allowed).toBeTrue();
  });
});
