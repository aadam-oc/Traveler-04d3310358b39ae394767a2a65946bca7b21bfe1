import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactoComponent } from './contacto.component';
import { ApiService } from '../../services/api.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['postContacto']);
    apiServiceSpy.postContacto.and.returnValue(of({ success: true }));

    await TestBed.configureTestingModule({
      imports: [ContactoComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe enviar el formulario correctamente', () => {
    component.contactoForm.setValue({
      nombre: 'Juan',
      apellido1: 'Pérez',
      apellido2: 'García',
      correo: 'juan@example.com',
      telefono: '123456789',
      asunto: 'Quiero más info',
      mensaje: 'Mensaje de prueba'
    });

    component.onSubmit();

    expect(apiServiceSpy.postContacto).toHaveBeenCalledWith({
      nombre: 'Juan',
      apellido1: 'Pérez',
      apellido2: 'García',
      correo: 'juan@example.com',
      telefono: '123456789',
      asunto: 'Quiero más info',
      mensaje: 'Mensaje de prueba'
    });

    // El formulario se resetea, los valores quedan en null
    expect(component.contactoForm.value).toEqual({
      nombre: null,
      apellido1: null,
      apellido2: null,
      correo: null,
      telefono: null,
      asunto: null,
      mensaje: null
    });
  });
});
