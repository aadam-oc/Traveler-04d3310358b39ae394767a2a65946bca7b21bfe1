import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelos } from '../models/vuelos';



@Injectable({
  providedIn: 'root'
})
export class FakeApiVuelosService {
  private apiUrl = 'http://172.17.40.7:3000'; // Ajusta según tu endpoint

  constructor(private http: HttpClient) {}

  // Obtener todos los vuelos
  getVuelos(): Observable<Vuelos[]> {
    return this.http.get<Vuelos[]>(`${this.apiUrl}/vuelos`);
  }

  // Obtener un vuelo por ID
  getVueloById(id: number): Observable<Vuelos> {
    return this.http.get<Vuelos>(`${this.apiUrl}/vuelos/${id}`);
  }

  // Crear un nuevo vuelo
  createVuelo(vuelo: Vuelos): Observable<any> {
    return this.http.post(`${this.apiUrl}/vuelos`, vuelo);
  }

  // Actualizar un vuelo existente
  updateVuelo(id: number, vuelo: Vuelos): Observable<any> {
    return this.http.put(`${this.apiUrl}/vuelos/${id}`, vuelo);
  }

  // Eliminar un vuelo
  deleteVuelo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vuelos/${id}`);
  }
}
