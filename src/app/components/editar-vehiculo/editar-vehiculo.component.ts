import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrl: './editar-vehiculo.component.css',
  standalone: true,
  imports: []
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
      imagen: [null]
    });

    this.vehiculoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarVehiculo();
  }

  cargarVehiculo() {
    this.vehiculosService.getVehiculoPorId(this.vehiculoId).subscribe(
      (vehiculo) => {
        this.form.patchValue({
          id_vehiculo: vehiculo.id_vehiculo,
          nombre_vehiculo: vehiculo.nombre_vehiculo,
          tipo_vehiculo: vehiculo.nombre_tipo_vehiculo,
          imagen: null
        });
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

  guardarCambios() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('nombre_vehiculo', this.form.get('nombre_vehiculo')?.value);
      formData.append('tipo_vehiculo', this.form.get('tipo_vehiculo')?.value);
      if (this.form.get('imagen')?.value) {
        formData.append('imagen', this.form.get('imagen')?.value);
      }

      this.vehiculosService.actualizarVehiculo(this.vehiculoId, formData).subscribe(
        () => {
          alert('Vehículo actualizado correctamente');
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Error al actualizar el vehículo');
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}