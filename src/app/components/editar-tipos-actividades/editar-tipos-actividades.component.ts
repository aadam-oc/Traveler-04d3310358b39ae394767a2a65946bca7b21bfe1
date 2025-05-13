import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TipoActividad } from '../../models/tipo-actividad';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule], selector: 'app-editar-tipos-actividades',
  templateUrl: './editar-tipos-actividades.component.html',
  styleUrl: './editar-tipos-actividades.component.css'
})
export class EditarTiposActividadesComponent {
  editarTipoActividadForm: FormGroup;
  id_tipo_actividad: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.editarTipoActividadForm = this.fb.group({
      nombre_tipo_actividad: ['', Validators.required]
    });
  }

  navigateToTiposActividades() {
    this.router.navigate(['/gestionTiposActividades']);
  }

  // Obtener el ID del tipo de actividad desde la URL
  getIdTipoActividad() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_tipo_actividad = +params['id']; // Convierte a número
        console.log('ID Tipo Actividad obtenido:', this.id_tipo_actividad);
      } else {
        console.error('ID Tipo Actividad no encontrado, redirigiendo al home');
        this.router.navigate(['/home']); // Redirige al home si no hay ID
      }
    });
  }

  // Cargar los datos del tipo de actividad en el formulario
  getTipoActividad() {
    this.apiService.getTipoActividadById(this.id_tipo_actividad).subscribe(
      (response: any) => {
        const tipoActividad = response.tipo_actividad; // Accede al objeto tipo_actividad
        this.editarTipoActividadForm.patchValue({
          nombre_tipo_actividad: tipoActividad.nombre_tipo_actividad
        });
        console.log('Datos del tipo de actividad cargados:', tipoActividad);
      },
      error => {
        console.error('Error al obtener el tipo de actividad:', error);
        this.router.navigate(['/home']); // Redirige al home si hay un error
      }
    );
  }

  // Enviar los datos actualizados al backend
  onSubmit() {
    if (this.editarTipoActividadForm.valid) {
      const formData = this.editarTipoActividadForm.value;
      console.log('Formulario enviado:', formData);
      this.apiService.putTipoActividad(this.id_tipo_actividad, formData).subscribe(
        response => {
          console.log('Tipo de actividad actualizado:', response);
          alert('Tipo de actividad actualizado con éxito');
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error al actualizar el tipo de actividad:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  ngOnInit() {
    this.getIdTipoActividad();
    this.getTipoActividad();
  }
}