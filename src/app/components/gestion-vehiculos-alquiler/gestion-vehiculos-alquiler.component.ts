import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { GestionVehiculosAlquilerComponent } from './components/gestion-vehiculos-alquiler/gestion-vehiculos-alquiler.component';



@Component({
  selector: 'app-gestion-vehiculos-alquiler',
  templateUrl: './gestion-vehiculos-alquiler.component.html',
  styleUrls: ['./gestion-vehiculos-alquiler.component.css']
})
export class GestionVehiculosAlquilerComponent implements OnInit {
  vehiculos: any[] = [];
  nuevoVehiculo = {
    id_vehiculo: null,
    tipo_vehiculo: null,
    id_destino: null
  };

  private apiUrl = 'http://172.17.40.7:3001/apicoches';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerVehiculos();
  }

  obtenerVehiculos() {
    this.http.get<any[]>(`${this.apiUrl}/vehiculos/detalles`).subscribe(
      (data) => {
        this.vehiculos = data;
      },
      (error) => {
        console.error('Error al obtener los vehículos:', error);
      }
    );
  }

  agregarVehiculo() {
    this.http.post(`${this.apiUrl}/vehiculos`, this.nuevoVehiculo).subscribe(
      () => {
        alert('Vehículo agregado correctamente');
        this.obtenerVehiculos(); // Actualizar la lista de vehículos
        this.nuevoVehiculo = { id_vehiculo: null, tipo_vehiculo: null, id_destino: null }; // Resetear el formulario
      },
      (error) => {
        console.error('Error al agregar el vehículo:', error);
      }
    );
  }
}