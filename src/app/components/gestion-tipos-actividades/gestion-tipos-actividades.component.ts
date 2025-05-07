import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { TipoActividad } from '../../models/tipo-actividad';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-gestion-tipos-actividades',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, NgxPaginationModule],
  templateUrl: './gestion-tipos-actividades.component.html',
  styleUrl: './gestion-tipos-actividades.component.css',
})
export class GestionTiposActividadesComponent {

  //Paginación
  p: number = 1;

  formCrearTiposActividades: FormGroup;
  tiposActividades: TipoActividad[] = [];
  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.formCrearTiposActividades = this.formBuilder.group({
      nombre_tipo_actividad: ['', Validators.required]
    });
  }

  getTipoActividades() {
    this.apiService.getTiposActividades().subscribe(
      (response: { tipo_actividad: TipoActividad[] }) => {
        this.tiposActividades = response.tipo_actividad;
      },
      error => {
        console.error('Error al obtener los tipos de actividades:', error);
      }
    );
  }

  editarTipoActividad(tipoActividad: TipoActividad) {
    alert('Todavia no se puede editar');
  }

  eliminarTipoActividad(id_tipo_actividad: number) {
    if (confirm(`¿Estás seguro de que deseas eliminar el tipo de actividad con ID ${id_tipo_actividad}?`)) {
      this.apiService.deleteTipoActividad(id_tipo_actividad).subscribe(
        response => {
          console.log('Tipo de actividad eliminado:', response);
          this.getTipoActividades();
        },
        error => {
          console.error('Error al eliminar el tipo de actividad:', error);
        }
      );
    }

  }

  onSubmit() {
    if (this.formCrearTiposActividades.valid) {
      const nombre_tipo_actividad = {
        nombre_tipo_actividad: this.formCrearTiposActividades.value.nombre_tipo_actividad
      }
      console.log('Nombre del tipo de actividad:', nombre_tipo_actividad);
      this.apiService.postTipoActividad(nombre_tipo_actividad).subscribe((response: TipoActividad) => {
        console.log('Tipo de actividad creado:', response);
        this.getTipoActividades();
        this.formCrearTiposActividades.reset();
      });
    }
  }

  ngOnInit() {
    this.getTipoActividades();
  }

}
