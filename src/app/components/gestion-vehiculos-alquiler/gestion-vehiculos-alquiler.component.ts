import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { OnInit } from '@angular/core';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';
import { RouterLink } from '@angular/router';
import { query } from '@angular/animations';

// Removed invalid import: 'form' is not exported from//import { form } from '@angular/forms';



@Component({
  selector: 'app-gestion-vehiculos-alquiler',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule],
  templateUrl: './gestion-vehiculos-alquiler.component.html',
  styleUrls: ['./gestion-vehiculos-alquiler.component.css']
})
export class GestionVehiculosAlquilerComponent implements OnInit {
  imagenPreview: string | null = null; // Property to store the image preview
  vehiculos: any[] = [];
  nuevoVehiculo = {
    id_vehiculo: null,
    nombre_vehiculo: null, // Agregado para manejar el nombre del vehículo
    nombre_tipo_vehiculo: null, // Agregado para manejar el alias del tipo de vehículo
    id_destino: null,
    imagen: null // Agregado para manejar la imagen del vehículo
  };
  form!: FormGroup;

  constructor(private fb: FormBuilder, private vehiculosService: FakeApiVehiculosService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      id_vehiculo: [null],
      nombre_vehiculo: [null, Validators.required],
      tipo_vehiculo: [null, Validators.required],
      imagen: [null]
    });

    this.obtenerVehiculos(); // Cargar la lista de vehículos
  }

  onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imagenPreview = reader.result as string;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

  obtenerVehiculos() {
    this.vehiculosService.getVehiculosDetalles().subscribe(
      (data) => {
        this.vehiculos = data; // Asignar los datos obtenidos al array
      },
      (error) => {
        console.error('Error al obtener los vehículos:', error);
      }
    );
  }

  agregarVehiculo() {
    if (this.form.valid) {
      const vehiculo = this.form.value;

      if (vehiculo.id_vehiculo) {
        // Actualizar vehículo existente
        this.vehiculosService.actualizarVehiculo(vehiculo.id_vehiculo, vehiculo).subscribe(
          () => {
            alert('Vehículo actualizado correctamente');
            this.obtenerVehiculos(); // Actualizar la lista de vehículos
            this.resetForm(); // Resetear el formulario
          },
          (error) => {
            console.error('Error al actualizar el vehículo:', error);
          }
        );
      } else {
        // Agregar nuevo vehículo
        this.vehiculosService.crearVehiculo(vehiculo).subscribe(
          () => {
            alert('Vehículo agregado correctamente');
            this.obtenerVehiculos(); // Actualizar la lista de vehículos
            this.resetForm(); // Resetear el formulario
          },
          (error) => {
            console.error('Error al agregar el vehículo:', error);
          }
        );
      }
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  onDelete(vehiculo: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar el vehículo con ID ${vehiculo.id_vehiculo}?`)) {
      this.vehiculosService.eliminarVehiculo(vehiculo.id_vehiculo).subscribe(
        () => {
          alert('Vehículo eliminado correctamente');
          this.obtenerVehiculos(); // Actualizar la lista de vehículos
        },
        (error) => {
          console.error('Error al eliminar el vehículo:', error);
        }
      );
    }
  }

  onEdit(id_vehiculo: any) {
    this.router.navigate(['/editarVehiculo/:id', { id: id_vehiculo }]);
  }

  resetForm() {
    this.form.reset(); // Resetea todos los campos del formulario
    this.imagenPreview = null; // Limpia la vista previa de la imagen
    this.nuevoVehiculo = {
      id_vehiculo: null,
      nombre_vehiculo: null,
      nombre_tipo_vehiculo: null,
      id_destino: null,
      imagen: null
    };
  }
}

