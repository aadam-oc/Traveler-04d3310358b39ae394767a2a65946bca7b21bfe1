import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionContactoComponent } from './gestion-contacto.component';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('GestionContactoComponent', () => {
  let component: GestionContactoComponent;
  let fixture: ComponentFixture<GestionContactoComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getContactos',
      'resuelto'
    ]);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    apiServiceSpy.getContactos.and.returnValue(of({
      contacto: [
        {
          id_contacto: 1,
          nombre: 'Juan',
          apellido1: 'Pérez',
          apellido2: 'García',
          correo: 'juan@example.com',
          telefono: '123456789',
          asunto: 'Consulta',
          mensaje: 'Hola',
          resuelto: false,
          fecha_contacto: '2024-05-19'
        }
      ]
    }));

    apiServiceSpy.resuelto.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [GestionContactoComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar contactos al iniciar', () => {
    expect(component.contactos.length).toBeGreaterThan(0);
    expect(component.contactos[0].nombre).toBe('Juan');
  });

  it('debe abrir el chat al llamar chat()', () => {
    const contacto = component.contactos[0];
    component.chat(contacto);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('debe marcar contacto como resuelto', () => {
    spyOn(component, 'getAllContactos');
    component.resuelto(1);
    expect(apiServiceSpy.resuelto).toHaveBeenCalledWith(1);
    expect(component.getAllContactos).toHaveBeenCalled();
  });

  it('debe permitir acceso solo si el rol es admin', () => {
    component.rol = 'admin';
    component.allowed = false;
    component.checkAllowed();
    expect(component.allowed).toBeTrue();
  });
});
