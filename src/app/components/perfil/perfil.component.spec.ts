import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerfilComponent } from './perfil.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getUsuariosCompletosById',
      'getImagenUsuario',
      'getReservasAlojamientoUsuario',
      'getReservasActividadesUsuario',
      'getReservasVehiculosUsuario',
      'getReservasVuelosUsuario',
      'putUsuarioCompleto'
    ]);
    apiServiceSpy.getUsuariosCompletosById.and.returnValue(of({ usuario: {} }));
    apiServiceSpy.getImagenUsuario.and.returnValue(of({ imagen: { nombre_imagen_usuario: '' } }));
    apiServiceSpy.getReservasAlojamientoUsuario.and.returnValue(of([]));
    apiServiceSpy.getReservasActividadesUsuario.and.returnValue(of([]));
    apiServiceSpy.getReservasVehiculosUsuario.and.returnValue(of([]));
    apiServiceSpy.getReservasVuelosUsuario.and.returnValue(of([]));
    apiServiceSpy.putUsuarioCompleto.and.returnValue(of({ usuario: {} }));

    await TestBed.configureTestingModule({
      imports: [PerfilComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { root: { firstChild: { snapshot: { data: {} } } } } },
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(typeof component.tieneReservas).toBe('function');
  });
});
