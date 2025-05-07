import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { Roles } from '../../models/roles';


@Component({
  selector: 'app-gestion-roles',
  imports: [ ReactiveFormsModule, CommonModule, FormsModule, MatExpansionModule],
  templateUrl: './gestion-roles.component.html',
  styleUrl: './gestion-roles.component.css',
})
export class GestionRolesComponent {

  roles: Roles[] = [];
  formCrearRol: FormGroup;


  constructor(private router: Router, private apiService: ApiService, private http: HttpClient, private fb: FormBuilder) {
    this.formCrearRol = this.fb.group({
      nombre_rol: ['', Validators.required]
    });
  }

  getRoles() {
    this.apiService.getRoles().subscribe(
      (response: { roles: Roles[] }) => {
        this.roles = response.roles;
      },
      error => {
        console.error('Error al obtener los roles:', error);
      }
    );
  }

  onEdit(rol: Roles) {
    alert('Todavia no se puede editar');
  }

  onDelete(rol: Roles) {
    if (confirm(`¿Estás seguro de que deseas eliminar el rol ${rol.nombre_rol}?`)) {
      this.apiService.deleteRol(rol.id_rol).subscribe(
        (response: { message: string }) => {
          console.log('Rol eliminado:', response.message);
          this.getRoles();
        },
        error => {
          console.error('Error al eliminar el rol:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.formCrearRol.valid) {
      const nuevoRol: Roles = {
        id_rol: 0,
        nombre_rol: this.formCrearRol.value.nombre_rol
      };

      this.apiService.postRol(nuevoRol).subscribe(
        (response: { message: string }) => {
          console.log('Rol creado:', response.message);
          this.getRoles();
          this.formCrearRol.reset();
        },
        error => {
          console.error('Error al crear el rol:', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  

  ngOnInit() {
    this.getRoles();
  }

}
