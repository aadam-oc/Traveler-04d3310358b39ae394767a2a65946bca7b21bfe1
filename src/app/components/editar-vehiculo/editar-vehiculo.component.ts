import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrl: './editar-vehiculo.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EditarVehiculoComponent implements OnInit {
  form!: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;
  vehiculoId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehiculosService: FakeApiVehiculosService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id_vehiculo: [{ value: '', disabled: true }],
      nombre_vehiculo: ['', Validators.required],
      tipo_vehiculo: ['', Validators.required],
      id_destino: ['', Validators.required], // <-- Añade esta línea
      imagen: [null]
    });

    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);

    this.vehiculoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarVehiculo();
  }

  cargarVehiculo() {
    this.vehiculosService.getVehiculosDetallesById(this.vehiculoId).subscribe(
      (vehiculo) => {
        this.form.patchValue({
          id_vehiculo: vehiculo.id_vehiculo,
          nombre_vehiculo: vehiculo.nombre_vehiculo,
          tipo_vehiculo: vehiculo.nombre_tipo_vehiculo,
          id_destino: vehiculo.id_destino, // <-- Añade esta línea
          imagen: null
        });
        console.log('Datos del vehículo cargados:', vehiculo);
        this.imagenPreview = vehiculo.imagen;
      },
      (error) => {
        alert('No se pudo cargar el vehículo');
        this.router.navigate(['/']);
      }
    );
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({ imagen: file });
      this.form.get('imagen')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  
  static imports = [ReactiveFormsModule];

  guardarCambios() {
    if (this.form.valid) {
      const formData: FormData = new FormData();
      formData.append('nombre_vehiculo', this.form.get('nombre_vehiculo')?.value);
      formData.append('tipo_vehiculo', this.form.get('tipo_vehiculo')?.value);
      formData.append('id_destino', this.form.get('id_destino')?.value);
      if (this.form.get('imagen')?.value) {
        formData.append('imagen', this.form.get('imagen')?.value);
      }

      this.vehiculosService.actualizarVehiculo(this.vehiculoId, formData).subscribe(
        () => {
          alert('Vehículo actualizado correctamente');
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Error al actualizar el vehículo', error);
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
  onSubmit(): void {
    this.guardarCambios();
    console.log('Form submitted:', this.form.value);
  }

}