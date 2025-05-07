import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiculosAlquiler } from '../models/vehiculos-alquiler';



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
    return this.http.get(`${this.apiUrl}/destinos`);
  }

  getDestinoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/destinos/${id}`);
  }

  crearDestino(destino: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/destinos`, destino);
  }

  actualizarDestino(id: number, destino: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/destinos/${id}`, destino);
  }

  eliminarDestino(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/destinos/${id}`);
  }

  // TIPOS DE VEHÍCULOS
  getTiposVehiculo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipoVehiculos`);
  }

  getTipoVehiculoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipoVehiculos/${id}`);
  }

  crearTipoVehiculo(tipoVehiculo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tipoVehiculos`, tipoVehiculo);
  }

  actualizarTipoVehiculo(id: number, tipoVehiculo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tipoVehiculos/${id}`, tipoVehiculo);
  }

  eliminarTipoVehiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tipoVehiculos/${id}`);
  }
}
