import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroComponent } from './hero.component';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'registerUser',
      'loginUser',
      'getUsuariosCompletosById'
    ]);

    await TestBed.configureTestingModule({
      imports: [HeroComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe registrar, loguear y guardar datos en localStorage correctamente', () => {
    const userData = { correo: 'test@mail.com', contrasena: '1234' };
    const loginResponse = { token: 'abc123', id_usuario: 5 };
    const usuario = {
      correo: 'test@mail.com',
      id_rol: 2,
      nombre_rol: 'user',
      nombre: 'Test',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      telefono1: '111',
      telefono2: '222',
      id_usuario: 5
    };

    apiServiceSpy.registerUser.and.returnValue(of({}));
    apiServiceSpy.loginUser.and.returnValue(of(loginResponse));
    apiServiceSpy.getUsuariosCompletosById.and.returnValue(of({ usuario }));

    spyOn(localStorage, 'setItem');
    component.onRegister(userData);

    expect(apiServiceSpy.registerUser).toHaveBeenCalledWith(userData);
    expect(apiServiceSpy.loginUser).toHaveBeenCalledWith(userData);
    expect(apiServiceSpy.getUsuariosCompletosById).toHaveBeenCalledWith(5);

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
  });

  it('debe mostrar error si registerUser falla', () => {
    spyOn(console, 'error');
    apiServiceSpy.registerUser.and.returnValue(throwError(() => new Error('error')));
    component.onRegister({ correo: 'fail@mail.com', contrasena: 'fail' });
    expect(console.error).toHaveBeenCalledWith('Error al registrar al usuario:', jasmine.any(Error));
  });

  it('debe mostrar error si loginUser falla', () => {
    spyOn(console, 'error');
    apiServiceSpy.registerUser.and.returnValue(of({}));
    apiServiceSpy.loginUser.and.returnValue(throwError(() => new Error('login error')));
    component.onRegister({ correo: 'fail@mail.com', contrasena: 'fail' });
    expect(console.error).toHaveBeenCalledWith('❌ Error en el login', jasmine.any(Error));
  });

  it('debe mostrar error si getUsuariosCompletosById falla', () => {
    spyOn(console, 'error');
    apiServiceSpy.registerUser.and.returnValue(of({}));
    apiServiceSpy.loginUser.and.returnValue(of({ token: 'abc', id_usuario: 1 }));
    apiServiceSpy.getUsuariosCompletosById.and.returnValue(throwError(() => new Error('user error')));
    component.onRegister({ correo: 'fail@mail.com', contrasena: 'fail' });
    expect(console.error).toHaveBeenCalledWith('❌ Error al obtener datos del usuario:', jasmine.any(Error));
  });
});