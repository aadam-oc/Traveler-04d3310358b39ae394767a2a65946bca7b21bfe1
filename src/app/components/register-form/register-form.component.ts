import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'], // ❌ styleUrl -> ✅ styleUrls
  standalone: true, // Habilita el uso de `imports`
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterFormComponent {
  @Output() registerEvent = new EventEmitter<any>(); // Emite datos al HeroComponent
  title = 'Form-Registro';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        correo: this.registerForm.value.email,
        contrasena: this.registerForm.value.password
      };
      console.log('Datos del formulario:', userData);
      this.registerEvent.emit(userData); // Enviar datos al padre (HeroComponent)
      //hace el login
      
      this.router.navigate(['/home']);
    } else {
      console.error('Formulario inválido');
    }
  }
}
