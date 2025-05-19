import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlojamientosComponent } from './alojamientos.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('AlojamientosComponent', () => {
  let component: AlojamientosComponent;
  let fixture: ComponentFixture<AlojamientosComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const alojamientosMock = [
      {
        id_alojamiento: 1,
        nombre_alojamiento: 'Hotel Madrid',
        id_destino: 1,
        precio_dia: 100,
        descripcion: 'Desc Madrid',
        id_usuario: 1,
        max_personas: 2,
        direccion: 'Calle 1',
        pais: 'España',
        ciudad: 'Madrid',
        correo: 'hotel@madrid.com',
        imagenes: []
      },
      {
        id_alojamiento: 2,
        nombre_alojamiento: 'Hotel París',
        id_destino: 2,
        precio_dia: 200,
        descripcion: 'Desc París',
        id_usuario: 2,
        max_personas: 3,
        direccion: 'Calle 2',
        pais: 'Francia',
        ciudad: 'París',
        correo: 'hotel@paris.com',
        imagenes: []
      }
    ];

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getAlojamientosCompletos', 'getImagenesAlojamientos']);
    apiServiceSpy.getAlojamientosCompletos.and.returnValue(of({ alojamientos: alojamientosMock }));
    apiServiceSpy.getImagenesAlojamientos.and.returnValue(of({ imagenes: ['img1.jpg', 'img2.jpg'] }));

    await TestBed.configureTestingModule({
      imports: [AlojamientosComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlojamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar alojamientos y países', () => {
    expect(component.alojamientos.length).toBe(2);
    expect(component.paises).toContain('España');
    expect(component.paises).toContain('Francia');
  });

  it('debe filtrar alojamientos por país', () => {
    component.form.patchValue({ pais: 'España' });
    component.filtrarAlojamientos();
    expect(component.alojamientosFiltrados.every(a => a.pais === 'España')).toBeTrue();
  });

  it('debe devolver ciudades del país seleccionado', () => {
    component.form.patchValue({ pais: 'España' });
    component.filtrarAlojamientos();
    expect(component.ciudades).toContain('Madrid');
    expect(component.ciudades).not.toContain('París');
  });
});
