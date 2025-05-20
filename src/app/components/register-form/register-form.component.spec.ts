import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterFormComponent } from './register-form.component';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder } from '@angular/forms';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['registerUser']);
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el título correcto', () => {
    expect(component.title).toBe('Form-Registro');
  });

  it('debe tener el formulario inválido por defecto', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('debe marcar error si los emails no son válidos', () => {
    component.registerForm.setValue({
      email: 'noemail',
      password: '123456',
      confirmPassword: '123456'
    });
    expect(component.registerForm.get('email')?.valid).toBeFalse();
  });

  it('debe marcar error si las contraseñas no coinciden', () => {
    component.registerForm.setValue({
      email: 'test@mail.com',
      password: '123456',
      confirmPassword: '654321'
    });
    expect(component.registerForm.errors?.['mismatch']).toBeTrue();
  });

  it('debe emitir el evento y navegar si el formulario es válido', () => {
    spyOn(component.registerEvent, 'emit');
    component.registerForm.setValue({
      email: 'test@mail.com',
      password: '123456',
      confirmPassword: '123456'
    });
    component.onSubmit();
    expect(component.registerEvent.emit).toHaveBeenCalledWith({
      correo: 'test@mail.com',
      contrasena: '123456'
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('debe mostrar error si el formulario es inválido al enviar', () => {
    spyOn(console, 'error');
    component.registerForm.setValue({
      email: '',
      password: '',
      confirmPassword: ''
    });
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Formulario inválido');
  });
});
