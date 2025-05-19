import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActividadesComponent } from './actividades.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('ActividadesComponent', () => {
  let component: ActividadesComponent;
  let fixture: ComponentFixture<ActividadesComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getActividadesJoin']);

    await TestBed.configureTestingModule({
      imports: [ActividadesComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe filtrar actividades por país', () => {
    component.form.patchValue({ pais: 'España' });
    component.filtrarActividades();
    expect(component.actividadesFiltradas.every(a => a.pais === 'España')).toBeTrue();
  });

  it('debe devolver solo actividades disponibles', () => {
    const disponibles = component.actividadesFiltradasDisponibles;
    expect(disponibles.every(a => a.disponibilidad_actividad)).toBeTrue();
  });
});
