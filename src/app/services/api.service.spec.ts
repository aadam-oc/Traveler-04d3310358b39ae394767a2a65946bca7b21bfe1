import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe hacer POST al registrar usuario', () => {
    const mockUser = { correo: 'test@mail.com', contrasena: '1234' };
    service.registerUser(mockUser).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(req => req.method === 'POST' && req.url.includes('/traveler/register'));
    expect(req.request.body).toEqual(mockUser);
    req.flush({ ok: true });
  });

  it('debe hacer POST al login', () => {
    const mockLogin = { correo: 'test@mail.com', contrasena: '1234' };
    service.loginUser(mockLogin).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(req => req.method === 'POST' && req.url.includes('/traveler/login'));
    expect(req.request.body).toEqual(mockLogin);
    req.flush({ token: 'abc', id_usuario: 1 });
  });

  it('debe obtener actividades', () => {
    service.getActividades().subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url.includes('/traveler/actividades'));
    req.flush([{ id_actividad: 1 }]);
  });

  it('debe obtener alojamientos completos', () => {
    service.getAlojamientosCompletos().subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url.includes('/traveler/alojamientos_completo'));
    req.flush([{ id_alojamiento: 1 }]);
  });

  it('debe obtener reservas de alojamiento por usuario', () => {
    service.getReservasAlojamientoUsuario(1).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url.includes('/traveler/reservas_alojamientos/usuario/1'));
    req.flush([{ nombre_alojamiento: 'Hotel' }]);
  });

  it('debe obtener reservas de actividades por usuario', () => {
    service.getReservasActividadesUsuario(1).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url.includes('/traveler/reservas_actividades/usuario/1'));
    req.flush([{ nombre_actividad: 'Kayak' }]);
  });

  it('debe obtener reservas de vehículos por usuario', () => {
    service.getReservasVehiculosUsuario(1).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url.includes('/traveler/reservas_vehiculos/usuario/1'));
    req.flush([{ nombre_vehiculo: 'Coche' }]);
  });

  it('debe obtener reservas de vuelos por usuario', () => {
    service.getReservasVuelosUsuario(1).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url.includes('/traveler/reservas_vuelos/usuario/1'));
    req.flush([{ nombre_vuelo: 'Vuelo 1' }]);
  });
});