import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarUsuarioComponent } from './editar-usuario.component';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('EditarUsuarioComponent', () => {
  let component: EditarUsuarioComponent;
  let fixture: ComponentFixture<EditarUsuarioComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getUsuariosCompletosById',
      'putUsuarioCompleto'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
      routerState: { root: { queryParams: of({ id_usuario: 1 }) } }
    });

    apiServiceSpy.getUsuariosCompletosById.and.returnValue(of({
      usuario: {
        correo: 'test@correo.com',
        contrasena: '123456',
        id_rol: 1,
        nombre: 'Juan',
        apellido1: 'Pérez',
        apellido2: 'García',
        telefono1: '123456789',
        telefono2: '987654321'
      }
    }));
    apiServiceSpy.putUsuarioCompleto.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [EditarUsuarioComponent, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los datos del usuario en el formulario', () => {
    component.id_usuario = 1;
    component.getUsuario();
    expect(apiServiceSpy.getUsuariosCompletosById).toHaveBeenCalledWith(1);
    expect(component.editarUsuarioForm.value.nombre).toBe('Juan');
    expect(component.editarUsuarioForm.value.correo).toBe('test@correo.com');
  });

  it('debe enviar el formulario de edición', () => {
    component.id_usuario = 1;
    component.editarUsuarioForm.setValue({
      correo: 'nuevo@correo.com',
      contrasena: '654321',
      id_rol: 2,
      nombre: 'Nuevo',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      telefono1: '111111111',
      telefono2: '222222222'
    });
    component.onSubmit();
    expect(apiServiceSpy.putUsuarioCompleto).toHaveBeenCalledWith(1, jasmine.objectContaining({
      correo: 'nuevo@correo.com',
      nombre: 'Nuevo'
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });


  it('redirige al dashboard tras editar correctamente', () => {
    component.id_usuario = 1;
    component.editarUsuarioForm.setValue({
      correo: 'nuevo@correo.com',
      contrasena: '654321',
      id_rol: 2,
      nombre: 'Nuevo',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      telefono1: '111111111',
      telefono2: '222222222'
    });
    component.onSubmit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('muestra error si getUsuario da error', () => {
    apiServiceSpy.getUsuariosCompletosById.and.returnValue(throwError(() => new Error('error')));
    spyOn(console, 'error');
    component.id_usuario = 1;
    component.getUsuario();
    expect(console.error).toHaveBeenCalled();
  });

  it('muestra error si putUsuarioCompleto da error', () => {
    apiServiceSpy.putUsuarioCompleto.and.returnValue(throwError(() => new Error('error')));
    spyOn(console, 'error');
    component.id_usuario = 1;
    component.editarUsuarioForm.setValue({
      correo: 'nuevo@correo.com',
      contrasena: '654321',
      id_rol: 2,
      nombre: 'Nuevo',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      telefono1: '111111111',
      telefono2: '222222222'
    });
    component.onSubmit();
    expect(console.error).toHaveBeenCalled();
  });
});