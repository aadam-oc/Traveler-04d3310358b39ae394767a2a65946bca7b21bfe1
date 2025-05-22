import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html',
  styleUrl: './formulario-reserva.component.css'
})
export class FormularioReservaComponent {
  form: FormGroup;
  modalReservaExitoAbierto: boolean = false;
  private timeoutModalReserva: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        fecha_entrada_alojamiento: ['', Validators.required],
        fecha_salida_alojamiento: ['', Validators.required],
        fechaReserva: [new Date().toISOString().split('T')[0], Validators.required], 
      },
      { validators: this.fechaSalidaPosterior() }
    );
  }

  fechaSalidaPosterior() {
    return (formGroup: AbstractControl) => {
      const fechaEntrada = formGroup.get('fecha_entrada_alojamiento')?.value;
      const fechaSalida = formGroup.get('fecha_salida_alojamiento')?.value;

      if (fechaEntrada && fechaSalida && fechaSalida <= fechaEntrada) {
        formGroup.get('fecha_salida_alojamiento')?.setErrors({ fechaInvalida: true });
      } else {
        formGroup.get('fecha_salida_alojamiento')?.setErrors(null);
      }
    };
  }

  getAlojamiento() {
    const id_alojamiento = Number(localStorage.getItem('id_alojamiento'));
    this.apiService.getAlojamientoById(id_alojamiento).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error al obtener el alojamiento:', error);
      }
    );
  }

  getFechaEntradaConHora(): string | null {
    const fecha = this.form.get('fecha_entrada_alojamiento')?.value;
    if (!fecha) return null;
    return `${fecha}T12:00:00`;
  }

  getFechaSalidaConHora(): string | null {
    const fecha = this.form.get('fecha_salida_alojamiento')?.value;
    if (!fecha) return null;
    return `${fecha}T15:00:00`;
  }

 onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const fechaReserva = formData.fechaReserva || new Date().toISOString().split('T')[0];
      const id_alojamiento = Number(localStorage.getItem('id_alojamiento'));
      const id_usuario = Number(localStorage.getItem('id_usuario'));

      const reserva = {
        id_alojamiento: id_alojamiento,
        id_usuario: id_usuario,
        fecha_reserva_alojamiento: formData.fechaReserva,
        fecha_entrada_alojamiento: formData.fecha_entrada_alojamiento,
        fecha_salida_alojamiento: formData.fecha_salida_alojamiento,
        hora_entrada_alojamiento: '12:00:00', 
        hora_salida_alojamiento: '15:00:00',  
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono
      };
      this.apiService.postReserva(reserva).subscribe(
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