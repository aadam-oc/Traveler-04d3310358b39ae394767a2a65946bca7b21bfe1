import { Component, OnInit } from '@angular/core';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';
import { VehiculosAlquiler } from '../../models/vehiculos-alquiler';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-vehiculos-alquiler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehiculos-alquiler.component.html',
  styleUrls: ['./vehiculos-alquiler.component.css'],
})
export class VehiculosAlquilerComponent implements OnInit {
  vehiculos: VehiculosAlquiler[] = [];

  constructor(private vehiculosService: FakeApiVehiculosService) {}

  ngOnInit(): void {
    this.vehiculosService.getVehiculos()
      .pipe(
        catchError(error => {
          console.error('Error al obtener los vehículos:', error);
          return of([]);
        })
      )
      .subscribe((data: VehiculosAlquiler[]) => {
        this.vehiculos = data;
      });
  }
}
