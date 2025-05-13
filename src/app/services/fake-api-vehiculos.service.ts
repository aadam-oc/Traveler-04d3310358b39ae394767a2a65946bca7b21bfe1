import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeApiVehiculosService {
  private apiUrl = 'http://172.17.40.7:3001';

  constructor(private http: HttpClient) { }

  // VEHÍCULOS
  getVehiculos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/vehiculos`);
  }

  getVehiculoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/vehiculos/${id}`);
  }

  getVehiculosPorTipo(tipoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/vehiculos/tipo/${tipoId}`);
  }

  getVehiculosDetalles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/vehiculos/detalles`);
  }

  getVehiculosDetallesById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/vehiculos/detalles/${id}`);
  }

  crearVehiculo(vehiculo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apicoches/vehiculos`, vehiculo);
  }

  actualizarVehiculo(id: number, vehiculo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/apicoches/vehiculos/${id}`, vehiculo);
  }

  eliminarVehiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/apicoches/vehiculos/${id}`);
  }

  // DESTINOS
  getDestinos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/destinos`);
  }

  getDestinoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/destinos/${id}`);
  }

  crearDestino(destino: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apicoches/destinos`, destino);
  }

  actualizarDestino(id: number, destino: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/apicoches/destinos/${id}`, destino);
  }

  eliminarDestino(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/apicoches/destinos/${id}`);
  }

  // TIPOS DE VEHÍCULOS
  getTiposVehiculo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/tipoVehiculos`);
  }

  getTipoVehiculoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/apicoches/tipoVehiculos/${id}`);
  }

  crearTipoVehiculo(tipoVehiculo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apicoches/tipoVehiculos`, tipoVehiculo);
  }

  actualizarTipoVehiculo(id: number, tipoVehiculo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/apicoches/tipoVehiculos/${id}`, tipoVehiculo);
  }

  eliminarTipoVehiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/apicoches/tipoVehiculos/${id}`);
  }
}