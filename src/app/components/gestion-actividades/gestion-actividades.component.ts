import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actividad } from '../../models/actividad';
import { MatExpansionModule } from '@angular/material/expansion';
import { TipoActividad } from '../../models/tipo-actividad';
import { Destinos } from '../../models/destinos';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-gestion-actividades',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, NgxPaginationModule],
  templateUrl: './gestion-actividades.component.html',
  styleUrl: './gestion-actividades.component.css',
})
export class GestionActividadesComponent {

  //Paginación
  p: number = 1;
  rol = localStorage.getItem('nombre_rol');
  id_usuario: number = Number(localStorage.getItem('id_usuario'));
  allowed = false;
  tipoActividades: TipoActividad[] = [];
  actividades: Actividad[] = [];
  actividadesCompletas: Actividad[] = [];
  destinos: Destinos[] = [];
  formCrearActividad: FormGroup;
  selectedActividad: Actividad | null = null;
  isEditing: boolean = false;
  imagenSeleccionada: boolean = false;
  imagenUrl: string = '';
  imagenPreview: string | ArrayBuffer | null = null;
  id_actividad_subida: number = 0;
  actividadesUsuario: Actividad[] = [];

  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) {
    this.formCrearActividad = this.formBuilder.group({
      id_actividad: [null],
      id_tipo_actividad: [null, Validators.required],
      id_destino: [null, Validators.required],
      descripcion: [null, Validators.required],
      disponibilidad_actividad: [null],
      precio: [null, Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.imagenSeleccionada = true;

      this.apiService.subirImagen(file).subscribe(response => {
        this.imagenUrl = response.imageUrl;
        this.imagenSeleccionada = false;
        console.log('Imagen subida:', this.imagenUrl);
      });
    }
  }

  postImagen(id_actividad: number) {
    if (this.imagenUrl) {
      this.apiService.subirRutaImagenActividades(this.imagenUrl, id_actividad).subscribe(
        (response) => {
          console.log('Imagen subida:', response);
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    } else {
      console.log('No se ha seleccionado ninguna imagen.');
    }
  }

  checkAllowed() {
    if (this.rol === 'admin' || this.rol === 'actividades' || this.rol === 'alojamientos_actividades') {
      this.allowed = true;
    }
  }

  getTipoActividades() {
    this.apiService.getTiposActividades().subscribe(
      (response: { tipo_actividad: TipoActividad[] }) => {
        this.tipoActividades = response.tipo_actividad;
      },
      error => {
        console.error('Error al obtener los tipos de actividades:', error);
      }
    );
  }

  getDestinos() {
    this.apiService.getDestinos().subscribe(
      (response: { destinos: Destinos[] }) => {
        this.destinos = response.destinos;
      },
      error => {
        console.error('Error al obtener los destinos:', error);
      }
    );
  }

  getAllActividades() {
    this.apiService.getActividadCompleta().subscribe((response: any) => {
      this.actividadesCompletas = response.actividades;
      // Filtrar solo las actividades del usuario si no es admin
      if (this.rol === 'alojamientos_actividades' || this.rol === 'actividades') {
        this.actividadesUsuario = this.actividadesCompletas.filter(
          act => act.id_usuario_actividad == this.id_usuario
        );
      }
    });
  }

  editarActividad(id_actividad: number) {
    this.router.navigate(['/editarActividad'], { queryParams: { id_actividad } });
  }

  eliminarActividad(actividad: Actividad) {
    if (confirm(`¿Estás seguro de que deseas eliminar la actividad ${actividad.descripcion}?`)) {
      this.apiService.deleteActividad(actividad.id_actividad).subscribe(
        (response) => {
          console.log('Actividad eliminada:', response);
          this.getAllActividades();
          this.getDestinos();
          this.getTipoActividades();
          this.apiService.getActividades().subscribe(
            (response: Actividad[]) => {
              this.actividades = response;
            }
          );
        },
        error => {
          console.error('Error al eliminar la actividad:', error);
        }
      );
    }

  }
  onSubmit() {
    if (this.formCrearActividad.valid) {
      const nuevaActividad = {
        id_actividad: this.formCrearActividad.value.id_actividad,
        id_usuario_actividad: this.id_usuario,
        id_tipo_actividad: this.formCrearActividad.value.id_tipo_actividad,
        id_destino: this.formCrearActividad.value.id_destino,
        descripcion: this.formCrearActividad.value.descripcion,
        disponibilidad_actividad: Boolean(this.formCrearActividad.value.disponibilidad_actividad),
        precio: this.formCrearActividad.value.precio,
      };
      console.log('Nueva actividad:', nuevaActividad);
      this.apiService.postActividad(nuevaActividad).subscribe(
        (response: Actividad) => {
          console.log('Actividad creada:', response);

          this.formCrearActividad.reset();
          this.getAllActividades();
          // Llama aquí a postImagen con el id correcto
          this.postImagen(response.id_actividad);
        },
        error => {
          console.error('Error al crear la actividad:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }


  ngOnInit() {
    this.checkAllowed();
    this.getAllActividades();
    this.getDestinos();
    this.getTipoActividades();
    this.apiService.getActividades().subscribe(
      (response: Actividad[]) => {
        this.actividades = response;
      }
    );
  }
}
