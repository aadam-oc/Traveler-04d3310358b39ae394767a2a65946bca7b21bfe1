import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('GestionUsuariosComponent', () => {
  let component: GestionUsuariosComponent;
  let fixture: ComponentFixture<GestionUsuariosComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getUsuariosCompletos',
      'postUsuario',
      'postUsuarioCompleto',
      'deleteUsuario'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getUsuariosCompletos.and.returnValue(of({
      usuarios: [
        {
          id_usuario: 1,
          correo: 'test@correo.com',
          nombre_rol: 'admin',
          nombre: 'Juan',
          apellido1: 'Pérez',
          apellido2: 'García',
          telefono1: '123456789',
          telefono2: '987654321'
        }
      ]
    }));
    apiServiceSpy.postUsuario.and.returnValue(of({}));
    apiServiceSpy.postUsuarioCompleto.and.returnValue(of({}));
    apiServiceSpy.deleteUsuario.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [GestionUsuariosComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar usuarios al iniciar', () => {
    expect(component.users.length).toBeGreaterThan(0);
    expect(component.users[0].correo).toBe('test@correo.com');
  });

  it('debe enviar el formulario simple', () => {
    component.formCrearUsuarioSimple.setValue({
      correo: 'nuevo@correo.com',
      contrasena: '123456',
      id_rol: '1'
    });
    component.onSubmitSimple();
    expect(apiServiceSpy.postUsuario).toHaveBeenCalled();
  });

  it('debe enviar el formulario completo', () => {
    component.formCrearUsuarioCompleto.setValue({
      correo: 'nuevo@correo.com',
      contrasena: '123456',
      id_rol: '1',
      nombre: 'Nuevo',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      telefono1: '111111111',
      telefono2: '222222222'
    });
    component.onSubmitCompleto();
    expect(apiServiceSpy.postUsuarioCompleto).toHaveBeenCalled();
  });

  it('debe eliminar un usuario', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'getUsuarios');
    const usuario = {
      id_usuario: 1,
      correo: 'test@correo.com'
    };
    component.onDelete(usuario as any);
    expect(apiServiceSpy.deleteUsuario).toHaveBeenCalledWith(1);
    expect(component.getUsuarios).toHaveBeenCalled();
  });

  it('debe navegar al editar un usuario', () => {
    component.onEdit(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/editarUsuario'], { queryParams: { id_usuario: 1 } });
  });

  it('debe permitir acceso solo si el rol es admin', () => {
    component.rol = 'admin';
    component.allowed = false;
    component.checkAllowed();
    expect(component.allowed).toBeTrue();
  });
});
