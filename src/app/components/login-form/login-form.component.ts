import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'; // Importa el ApiService
import { Router } from '@angular/router'; // Importa el Router para la navegación

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Formulario inválido:', this.loginForm.value);
      return;
    }

    const loginData = {
      correo: this.loginForm.value.email,
      contrasena: this.loginForm.value.password
    };

    console.log('📤 Enviando datos:', JSON.stringify(loginData));

    this.apiService.loginUser(loginData).subscribe({
      next: (response) => {
      console.log('✅ Login exitoso', response);
      localStorage.setItem('authToken', response.token);
      this.apiService.getUsuariosCompletosById(response.id_usuario).subscribe({
        next: (userData) => {
        console.log('Datos del usuario:', userData);
        const usuario = userData.usuario || {};
        localStorage.setItem('correo', usuario.correo || '');
        localStorage.setItem('id_rol', usuario.id_rol?.toString() || '');
        localStorage.setItem('nombre_rol', usuario.nombre_rol || '');
        localStorage.setItem('nombre', usuario.nombre || '');
        localStorage.setItem('apellido1', usuario.apellido1 || '');
        localStorage.setItem('apellido2', usuario.apellido2 || '');
        localStorage.setItem('telefono1', usuario.telefono1 || '');
        localStorage.setItem('telefono2', usuario.telefono2 || '');
        localStorage.setItem('id_usuario', usuario.id_usuario?.toString() || '');
        console.log('Token guardado en localStorage:', localStorage.getItem('authToken'));
        console.log('ID Usuario guardado en localStorage:', localStorage.getItem('id_usuario'));
        console.log('Correo guardado en localStorage:', localStorage.getItem('correo'));
        console.log('ID Rol guardado en localStorage:', localStorage.getItem('id_rol'));
        console.log('Nombre Rol guardado en localStorage:', localStorage.getItem('nombre_rol'));
        console.log('Nombre guardado en localStorage:', localStorage.getItem('nombre'));
        console.log('Apellido1 guardado en localStorage:', localStorage.getItem('apellido1'));
        console.log('Apellido2 guardado en localStorage:', localStorage.getItem('apellido2'));
        console.log('Telefono1 guardado en localStorage:', localStorage.getItem('telefono1'));
        console.log('Telefono2 guardado en localStorage:', localStorage.getItem('telefono2'));

        this.router.navigate(['/']); 
        },
        error: (err) => {
        console.error('❌ Error al obtener datos del usuario:', err);
        }
      });
      },
      error: (err: any) => {
      console.error('❌ Error en el login', err);
      this.errorMessage = 'Credenciales incorrectas. Inténtalo nuevamente.';
      }
    });


  }

  get isSubmitDisabled(): boolean {
    return this.loginForm.invalid;
  }
}
