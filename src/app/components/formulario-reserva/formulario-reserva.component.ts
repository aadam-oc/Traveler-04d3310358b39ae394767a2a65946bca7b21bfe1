import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioReservaComponent } from './formulario-reserva.component';
@Component({
  selector: 'app-formulario-reserva',
  imports: [],
  templateUrl: './formulario-reserva.component.html',
  styleUrl: './formulario-reserva.component.css'
})
export class FormularioReservaComponent {
form: FormGroup;
paises = ['España', 'Francia', 'Italia', 'Alemania'];

constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    pais: ['', Validators.required]
  });
}
}

