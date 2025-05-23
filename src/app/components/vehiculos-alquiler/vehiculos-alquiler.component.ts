import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';
import { VehiculosAlquiler } from '../../models/vehiculos-alquiler';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-vehiculos-alquiler',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './vehiculos-alquiler.component.html',
  styleUrls: ['./vehiculos-alquiler.component.css'],
})
export class VehiculosAlquilerComponent implements OnInit {
  vehiculos: VehiculosAlquiler[] = [];
  tiposVehiculo: string[] = []; // Cambia aquí: inicia vacío
  filtrosForm!: FormGroup;
  vehiculosFiltrados: VehiculosAlquiler[] = [];
  modalAbierto = false;
  vehiculoSeleccionado: any = null;

  // Paginación
  p: number = 1;

  constructor(
    private fb: FormBuilder,
    private vehiculosService: FakeApiVehiculosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filtrosForm = this.fb.group({
      tipoVehiculo: [''],
      priceRange: [200],
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
        console.log('Vehículos:', this.vehiculos);
        // Extrae los tipos únicos de los datos recibidos
        this.tiposVehiculo = [...new Set(data.map((v) => v.nombre_tipo_vehiculo))];
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

  verMas(vehiculo: any) {
    this.vehiculoSeleccionado = vehiculo;
    this.modalAbierto = true;
  }

  cerrarModal(event: Event) {
    event.stopPropagation();
    this.modalAbierto = false;
    this.vehiculoSeleccionado = null;
  }

  irAFormularioReserva(idVehiculo: number) {
    localStorage.setItem('id_vehiculo', idVehiculo.toString());
    this.router.navigate(['/reservar-vehiculo', idVehiculo]);
  }
}


