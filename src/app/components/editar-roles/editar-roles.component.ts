import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrl: './editar-roles.component.css'
})
export class EditarRolesComponent implements OnInit {
  editarRolForm: FormGroup;
  id_rol: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.editarRolForm = this.fb.group({
      nombre_rol: ['', Validators.required]
    });
  }
navigateToRoles(){
  this.router.navigate(['/dashboard']);
}
  // Obtener el ID del rol desde la URL
  getIdRol() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_rol = +params['id']; // Convierte a número
        console.log('ID Rol obtenido:', this.id_rol);
      } else {
        console.error('ID Rol no encontrado, redirigiendo al home');
        this.router.navigate(['/home']); // Redirige al home si no hay ID
      }
    });
  }

  // Cargar los datos del rol en el formulario
  getRol() {
  this.apiService.getRolById(this.id_rol).subscribe(
    (response: any) => {
      const rol = response.role; // Accede al objeto rol directamente
      this.editarRolForm.patchValue({
        nombre_rol: rol.nombre_rol
      });
      console.log('Datos del rol cargados:', rol);
    },
    error => {
      console.error('Error al obtener el rol:', error);
      this.router.navigate(['/home']); // Redirige al home si hay un error
    }
  );
}

  // Enviar los datos actualizados al backend
  onSubmit() {
    if (this.editarRolForm.valid) {
      const formData = this.editarRolForm.value;
      console.log('Formulario enviado:', formData);
      this.apiService.putRol(this.id_rol, formData).subscribe(
        response => {
          console.log('Rol actualizado:', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error al actualizar el rol:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  ngOnInit() {
    this.getIdRol();
    this.getRol();
  }
}