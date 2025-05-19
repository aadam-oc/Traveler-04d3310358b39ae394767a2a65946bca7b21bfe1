import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Actividad } from '../../models/actividad';

@Component({
   imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-formulario-reserva-actividad',
  templateUrl: './formulario-reserva-actividad.component.html',
  styleUrl: './formulario-reserva-actividad.component.css'
})
export class FormularioReservaActividadComponent {
  form: FormGroup;
  id_actividad: number = 0;
  horasDisponibles: string[] = [];
  actividadSeleccionada!: Actividad;
  modalAbierto: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fecha_actividad: ['', Validators.required],
      hora_actividad: ['', Validators.required],
    });

    for (let h = 10; h <= 20; h++) {
      const hora = h < 10 ? `0${h}:00:00` : `${h}:00:00`;
      this.horasDisponibles.push(hora);
    }
  }

getIdActividad() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_actividad = +params['id']; 
        console.log('ID Actividad obtenido:', this.id_actividad);
      } else {
        console.error('ID Actividad no encontrado, redirigiendo al home');
        this.router.navigate(['/inicio']); 
      }
    });
  }

   ngOnInit() {
    this.getIdActividad();
    if (!this.id_actividad || this.id_actividad === 0) {
    alert('No se ha seleccionado una actividad válida para reservar.');
    this.router.navigate(['/actividades']);
    return;
  }
  this.apiService.getActividadById(this.id_actividad).subscribe(
    (actividad: Actividad) => {
      this.actividadSeleccionada = actividad;
      console.log('Actividad seleccionada:', this.actividadSeleccionada);
    },
    (error) => {
      console.error('Error al obtener la actividad:', error);
      alert('Error al cargar la actividad. Por favor, inténtalo más tarde.');
    }
  );
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
        id_usuario: id_usuario,
        fecha_reserva_actividad: fecha_reserva_actividad,
        fecha_actividad: formData.fecha_actividad,
        hora_actividad: formData.hora_actividad,
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