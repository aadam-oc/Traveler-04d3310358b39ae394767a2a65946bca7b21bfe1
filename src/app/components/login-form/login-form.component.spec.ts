//login-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginFormComponent } from './login-form.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['loginUser', 'getUsuariosCompletosById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe deshabilitar el submit si el formulario es inválido', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.isSubmitDisabled).toBeTrue();
  });

  it('debe mostrar error si el formulario es inválido al enviar', () => {
    spyOn(console, 'log');
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Formulario inválido:', component.loginForm.value);
  });

  it('debe hacer login y guardar datos en localStorage', () => {
    const loginResponse = { token: 'abc123', id_usuario: 1 };
    const usuario = {
      correo: 'test@mail.com',
      id_rol: 2,
      nombre_rol: 'user',
      nombre: 'Test',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      telefono1: '111',
      telefono2: '222',
      id_usuario: 1
    };
    apiServiceSpy.loginUser.and.returnValue(of(loginResponse));
    apiServiceSpy.getUsuariosCompletosById.and.returnValue(of({ usuario }));

    spyOn(localStorage, 'setItem');
    component.loginForm.setValue({ email: 'test@mail.com', password: '1234' });
    component.onSubmit();

    expect(apiServiceSpy.loginUser).toHaveBeenCalledWith({ correo: 'test@mail.com', contrasena: '1234' });
    expect(apiServiceSpy.getUsuariosCompletosById).toHaveBeenCalledWith(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'abc123');
    expect(localStorage.setItem).toHaveBeenCalledWith('correo', usuario.correo);
    expect(localStorage.setItem).toHaveBeenCalledWith('id_rol', usuario.id_rol.toString());
    expect(localStorage.setItem).toHaveBeenCalledWith('nombre_rol', usuario.nombre_rol);
    expect(localStorage.setItem).toHaveBeenCalledWith('nombre', usuario.nombre);
    expect(localStorage.setItem).toHaveBeenCalledWith('apellido1', usuario.apellido1);
    expect(localStorage.setItem).toHaveBeenCalledWith('apellido2', usuario.apellido2);
    expect(localStorage.setItem).toHaveBeenCalledWith('telefono1', usuario.telefono1);
    expect(localStorage.setItem).toHaveBeenCalledWith('telefono2', usuario.telefono2);
    expect(localStorage.setItem).toHaveBeenCalledWith('id_usuario', usuario.id_usuario.toString());
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('debe mostrar error si loginUser falla', () => {
    apiServiceSpy.loginUser.and.returnValue(throwError(() => new Error('login error')));
    spyOn(console, 'error');
    component.loginForm.setValue({ email: 'fail@mail.com', password: 'fail' });
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('❌ Error en el login', jasmine.any(Error));
    expect(component.errorMessage).toBe('Credenciales incorrectas. Inténtalo nuevamente.');
  });

  it('debe mostrar error si getUsuariosCompletosById falla', () => {
    apiServiceSpy.loginUser.and.returnValue(of({ token: 'abc', id_usuario: 1 }));
    apiServiceSpy.getUsuariosCompletosById.and.returnValue(throwError(() => new Error('user error')));
    spyOn(console, 'error');
    component.loginForm.setValue({ email: 'fail@mail.com', password: 'fail' });
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('❌ Error al obtener datos del usuario:', jasmine.any(Error));
  });
});
