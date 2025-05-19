import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionDestinosComponent } from './gestion-destinos.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('GestionDestinosComponent', () => {
  let component: GestionDestinosComponent;
  let fixture: ComponentFixture<GestionDestinosComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getDestinos',
      'postDestino',
      'deleteDestino'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getDestinos.and.returnValue(of({
      destinos: [
        { id_destino: 1, pais: 'España', ciudad: 'Madrid' }
      ]
    }));
    apiServiceSpy.postDestino.and.returnValue(of({}));
    apiServiceSpy.deleteDestino.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [GestionDestinosComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar destinos al iniciar', () => {
    expect(component.destinos.length).toBeGreaterThan(0);
    expect(component.destinos[0].pais).toBe('España');
  });

  it('debe enviar el formulario de creación de destino', () => {
    component.form.setValue({
      id_destino: null,
      pais: 'Francia',
      ciudad: 'París'
    });
    component.onSubmit();
    expect(apiServiceSpy.postDestino).toHaveBeenCalled();
  });

  it('debe eliminar un destino', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const destino = { id_destino: 1, pais: 'España', ciudad: 'Madrid' };
    component.onDelete(destino);
    expect(apiServiceSpy.deleteDestino).toHaveBeenCalledWith(1);
  });

  it('debe navegar al editar un destino', () => {
    component.onEdit(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/editarDestinos', 1]);
  });

  it('debe permitir acceso solo si el rol es admin', () => {
    component.rol = 'admin';
    component.allowed = false;
    component.checkAllowed();
    expect(component.allowed).toBeTrue();
  });
});
