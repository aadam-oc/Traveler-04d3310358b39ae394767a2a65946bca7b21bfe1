import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
   imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-formulario-reserva-actividad',
  templateUrl: './formulario-reserva-actividad.component.html',
  styleUrl: './formulario-reserva-actividad.component.css'
})
export class FormularioReservaActividadComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fecha_actividad: ['', Validators.required],
    });
  }

abrirModal(actividad: any) {
  this.actividadSeleccionada = actividad;
  this.modalAbierto = true;
}

irAFormularioReservaActividad(id_actividad: number) {
  localStorage.setItem('id_actividad', id_actividad.toString());
  this.router.navigate(['/reserva-actividad']);
}

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const id_actividad = Number(localStorage.getItem('id_actividad'));
      const id_usuario = Number(localStorage.getItem('id_usuario'));
      const fecha_reserva_actividad = new Date().toISOString().split('T')[0];

      const reserva = {
        id_actividad: id_actividad,
        fecha_reserva_actividad: fecha_reserva_actividad,
        id_usuario: id_usuario,
        fecha_actividad: formData.fecha_actividad,
        hora_actividad: '12:00:00', // o la hora que quieras por defecto
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono
      };

      this.apiService.postReservaActividad(reserva).subscribe(
        (response) => {
          alert('Reserva de actividad completada');
          this.router.navigate(['/inicio']);
        },
        (error) => {
          alert('Hubo un error al realizar la reserva. Inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}