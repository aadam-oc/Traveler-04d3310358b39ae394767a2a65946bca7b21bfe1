import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { EditarRolesComponent } from './editar-roles.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('EditarRolesComponent', () => {
  let component: EditarRolesComponent;
  let fixture: ComponentFixture<EditarRolesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getRolById',
      'putRol'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    apiServiceSpy.getRolById.and.returnValue(of({
      role: { nombre_rol: 'admin' }
    }));
    apiServiceSpy.putRol.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [EditarRolesComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 3 }),
            snapshot: { params: { id: 3 }, data: {} }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener el id del rol desde la ruta', () => {
    component.getIdRol();
    expect(component.id_rol).toBe(3);
  });

  it('debe cargar los datos del rol en el formulario', () => {
    component.id_rol = 3;
    component.getRol();
    expect(apiServiceSpy.getRolById).toHaveBeenCalledWith(3);
    expect(component.editarRolForm.value.nombre_rol).toBe('admin');
  });

  it('debe enviar el formulario de edición', () => {
    component.id_rol = 3;
    component.editarRolForm.setValue({ nombre_rol: 'nuevoRol' });
    component.onSubmit();
    expect(apiServiceSpy.putRol).toHaveBeenCalledWith(3, { nombre_rol: 'nuevoRol' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('no debe enviar si el formulario es inválido', () => {
    component.editarRolForm.reset();
    spyOn(console, 'error');
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Formulario inválido');
    expect(apiServiceSpy.putRol).not.toHaveBeenCalled();
  });

  it('debe navegar a roles al cancelar', () => {
    component.navigateToRoles();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('redirige al home si no hay id en params', () => {
    const route = TestBed.inject(ActivatedRoute);
    (route.params as any) = of({});
    component.getIdRol();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('redirige al home si getRol da error', () => {
    apiServiceSpy.getRolById.and.returnValue(throwError(() => new Error('error')));
    component.id_rol = 3;
    component.getRol();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
