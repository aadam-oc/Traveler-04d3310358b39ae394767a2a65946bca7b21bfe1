import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vuelos } from '../../models/vuelos';

@Component({
  selector: 'app-formulario-reserva-vuelos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-reserva-vuelos.component.html',
  styleUrls: ['./formulario-reserva-vuelos.component.css']
})
export class FormularioReservaVuelosComponent {
  form: FormGroup;
  id_actividad: number = 0;
  horasDisponibles: string[] = [];
  actividadSeleccionada!: Vuelos;
  modalAbierto: boolean = false;
  modalReservaExitoAbierto: boolean = false;
  private timeoutModalReserva: any;

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
    (actividad: Vuelos) => {
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
          this.abrirModalReservaExito();
        },
        (error) => {
          alert('Hubo un error al realizar la reserva. Inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  abrirModalReservaExito() {
  this.modalReservaExitoAbierto = true;
  this.timeoutModalReserva = setTimeout(() => {
    this.cerrarModalReservaExito();
    this.router.navigate(['/inicio']);
  }, 15000); // 15 segundos
}

cerrarModalReservaExito(event?: MouseEvent) {
  this.modalReservaExitoAbierto = false;
  if (this.timeoutModalReserva) {
    clearTimeout(this.timeoutModalReserva);
    this.timeoutModalReserva = null;
  }
  if (event) {
    this.router.navigate(['/inicio']);
  }
}
}