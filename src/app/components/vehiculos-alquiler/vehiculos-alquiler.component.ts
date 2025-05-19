import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';
import { VehiculosAlquiler } from '../../models/vehiculos-alquiler';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-vehiculos-alquiler',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehiculos-alquiler.component.html',
  styleUrls: ['./vehiculos-alquiler.component.css'],
})
export class VehiculosAlquilerComponent implements OnInit {
  vehiculos: VehiculosAlquiler[] = [];
  tiposVehiculo = ['Sedán', 'SUV', 'Deportivo', 'Camioneta'];
  filtrosForm!: FormGroup;
  vehiculosFiltrados: VehiculosAlquiler[] = [];

  constructor(
    private fb: FormBuilder,
    private vehiculosService: FakeApiVehiculosService
  ) {}

  ngOnInit(): void {
    this.filtrosForm = this.fb.group({
      tipoVehiculo: [''],
      priceRange: [500],
    });

    this.filtrosForm.valueChanges.subscribe(() => {
      this.aplicarFiltros();
    });

    this.vehiculosService
      .getVehiculosDetalles()
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los vehículos:', error);
          return of([]);
        })
      )
      .subscribe((data: VehiculosAlquiler[]) => {
        this.vehiculos = data;
        this.vehiculosFiltrados = data;
      });
  }

  aplicarFiltros(): void {
    const { tipoVehiculo, priceRange } = this.filtrosForm.value;

    this.vehiculosFiltrados = this.vehiculos.filter((vehiculo) => {
      const coincideTipo = tipoVehiculo
        ? vehiculo.nombre_tipo_vehiculo === tipoVehiculo
        : true;
      const coincidePrecio = vehiculo.precio <= priceRange;
      return coincideTipo && coincidePrecio;
    });
  }

  verMas(vehiculo: any): void {
    console.log('Ver más detalles del vehículo:', vehiculo);
  }
}


