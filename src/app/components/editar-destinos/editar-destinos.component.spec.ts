import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarDestinosComponent } from './editar-destinos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('EditarDestinosComponent', () => {
  let component: EditarDestinosComponent;
  let fixture: ComponentFixture<EditarDestinosComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getDestinoById',
      'putDestino'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getDestinoById.and.returnValue(of({
      destino: {
        pais: 'España',
        ciudad: 'Madrid'
      }
    }));
    apiServiceSpy.putDestino.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [EditarDestinosComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 7 }),
            snapshot: { params: { id: 7 }, data: {} }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener el id del destino desde la ruta', () => {
    component.getIdDestino();
    expect(component.id_destino).toBe(7);
  });

  it('debe cargar los datos del destino en el formulario', () => {
    component.id_destino = 7;
    component.getDestino();
    expect(apiServiceSpy.getDestinoById).toHaveBeenCalledWith(7);
    expect(component.editarDestinoForm.value.pais).toBe('España');
    expect(component.editarDestinoForm.value.ciudad).toBe('Madrid');
  });

  it('debe enviar el formulario de edición', () => {
    component.id_destino = 7;
    component.editarDestinoForm.setValue({
      pais: 'Francia',
      ciudad: 'París'
    });
    component.onSubmit();
    expect(apiServiceSpy.putDestino).toHaveBeenCalledWith(7, { pais: 'Francia', ciudad: 'París' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/gestionDestinos']);
  });

  it('no debe enviar si el formulario es inválido', () => {
    component.editarDestinoForm.reset();
    spyOn(console, 'error');
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Formulario inválido');
    expect(apiServiceSpy.putDestino).not.toHaveBeenCalled();
  });

  it('debe navegar al dashboard al cancelar', () => {
    component.navigateToDashboard();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('redirige al home si no hay id en params', () => {
    const route = TestBed.inject(ActivatedRoute);
    (route.params as any) = of({});
    component.getIdDestino();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('redirige al home si getDestino da error', () => {
    apiServiceSpy.getDestinoById.and.returnValue(throwError(() => new Error('error')));
    // NO repetir spyOn(routerSpy, 'navigate');
    component.id_destino = 7;
    component.getDestino();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio']);
  });
});
