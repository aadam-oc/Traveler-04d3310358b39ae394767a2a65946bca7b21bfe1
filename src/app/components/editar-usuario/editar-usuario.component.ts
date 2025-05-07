import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-editar-usuario',
  imports: [  ReactiveFormsModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})

export class EditarUsuarioComponent {
  editarUsuarioForm: FormGroup;
  id_usuario: number = 0;

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) {
    this.editarUsuarioForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      id_rol: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: [''],
    });
  }

  getIdUsuario() {
    this.router.routerState.root.queryParams.subscribe(params => {
      this.id_usuario = params['id_usuario'];
      console.log('ID Usuario:', this.id_usuario);
    });
  }
  getUsuario() {
    this.apiService.getUsuariosCompletosById(this.id_usuario).subscribe(
      (response: { usuario: any }) => {
        this.editarUsuarioForm.patchValue({
          correo: response.usuario.correo,
          contrasena: response.usuario.contrasena,
          id_rol: response.usuario.id_rol,
          nombre: response.usuario.nombre,
          apellido1: response.usuario.apellido1,
          apellido2: response.usuario.apellido2,
          telefono1: response.usuario.telefono1,
          telefono2: response.usuario.telefono2,
        });
        console.log('Usuario:', response.usuario);
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  
  ngOnInit(): void {
    this.getIdUsuario();
    this.getUsuario();
  }
  onSubmit(): void {
    if (this.editarUsuarioForm.valid) {
      const usuario = this.editarUsuarioForm.value;
      usuario.id_usuario = this.id_usuario; // Agregar el ID del usuario a los datos del formulario
      console.log('Datos del formulario:', usuario);
      this.apiService.putUsuarioCompleto(this.id_usuario, usuario).subscribe(
        response => {
          console.log('Usuario actualizado:', response);
          alert('Usuario actualizado correctamente');
          this.router.navigate(['/gestionUsuarios']);
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
}