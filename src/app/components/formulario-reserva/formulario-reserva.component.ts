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

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        fechaEntrada: ['', Validators.required],
        fechaSalida: ['', Validators.required],
        fechaReserva: [new Date().toISOString().split('T')[0], Validators.required], // Fecha actual
      },
      { validators: this.fechaSalidaPosterior() }
    );
  }

  fechaSalidaPosterior() {
    return (formGroup: AbstractControl) => {
      const fechaEntrada = formGroup.get('fechaEntrada')?.value;
      const fechaSalida = formGroup.get('fechaSalida')?.value;

      if (fechaEntrada && fechaSalida && fechaSalida <= fechaEntrada) {
        formGroup.get('fechaSalida')?.setErrors({ fechaInvalida: true });
      } else {
        formGroup.get('fechaSalida')?.setErrors(null);
      }
    };
  }

 onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.apiService.postReserva(formData).subscribe(
        (response) => {
          console.log('Reserva guardada:', response);
          alert('Reserva Completada');
          this.router.navigate(['/inicio']); // Redirige a la página de inicio
        },
        (error) => {
          console.error('Error al guardar la reserva:', error);
          alert('Hubo un error al realizar la reserva. Inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}