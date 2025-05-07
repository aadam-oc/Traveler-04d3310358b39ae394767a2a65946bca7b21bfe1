import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatExpansionModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css',
})
export class GestionUsuariosComponent {
  users: any[] = [];
  formCrearUsuarioSimple: FormGroup;
  formCrearUsuarioCompleto: FormGroup;

  constructor(private router: Router, private apiService: ApiService, private http: HttpClient, private fb: FormBuilder) {
    this.formCrearUsuarioSimple = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      id_rol: ['', Validators.required]
    });
    this.formCrearUsuarioCompleto = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      id_rol: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: ['']
    });
  }


  getUsuarios() {
    this.apiService.getUsuariosCompletos().subscribe(
      (response: { usuarios: Usuario[] }) => {
        this.users = response.usuarios;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  onEdit( id_usuario: number) {
    this.router.navigate(['/editarUsuario'], { queryParams: { id_usuario } });
  }

  onDelete(user: Usuario) {
    if (confirm(`¿Estás seguro de que deseas eliminar el usuario ${user.correo}?`)) {
      this.apiService.deleteUsuario(user.id_usuario).subscribe(
        response => {
          console.log('Usuario eliminado:', response);
          this.getUsuarios();
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
    
  }
  

  onSubmitSimple() {

    if (this.formCrearUsuarioSimple.valid) {
      const nuevoUsuario: Usuario = this.formCrearUsuarioSimple.value;
      this.apiService.postUsuario(nuevoUsuario).subscribe(
        response => {
          console.log('Usuario creado:', response);
          this.getUsuarios();
        },
        error => {
          console.error('Error al crear el usuario:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  onSubmitCompleto() {
    if (this.formCrearUsuarioCompleto.valid) {
      const nuevoUsuario: Usuario = this.formCrearUsuarioCompleto.value;
      this.apiService.postUsuarioCompleto(nuevoUsuario).subscribe(
        response => {
          console.log('Usuario creado:', response);
          this.getUsuarios();
        },
        error => {
          console.error('Error al crear el usuario:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  ngOnInit() {
    this.getUsuarios();
  }
}
