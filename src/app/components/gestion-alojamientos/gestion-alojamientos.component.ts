import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Alojamientos } from '../../models/alojamientos';
import { Destinos } from '../../models/destinos';

@Component({
  selector: 'app-gestion-alojamientos',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule],
  templateUrl: './gestion-alojamientos.component.html',
  styleUrl: './gestion-alojamientos.component.css',
})
export class GestionAlojamientosComponent {
  alojamientos: Alojamientos[] = [];
  alojamientosCompletos: Alojamientos[] = [];
  alojamientoForm: FormGroup;
  destinos: Destinos[] = [];
  rol = localStorage.getItem('nombre_rol');
  allowed = false;

  alojamientoImagenSeleccionada: boolean = false;
  alojamientoImagenUrl: string = '';
  alojamientoImagenPreview: string | ArrayBuffer | null = null;
  id_alojamiento_subida: number = 0;

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.alojamientoForm = this.fb.group({
      id_alojamiento: [null],
      nombre_alojamiento: ['', Validators.required],
      id_destino: [null, Validators.required],
      precio_dia: [null, Validators.required],
      descripcion: ['', Validators.required],
      id_usuario: [null],
      max_personas: [null, Validators.required],
      direccion: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required]
    });
  }

  checkAllowed() {
    if (this.rol === 'admin' || this.rol === 'alojamientos' || this.rol === 'alojamientos_actividades') {
      this.allowed = true;
    }
  }

  getAlojamientos() {
    this.apiService.getAlojamientos().subscribe(
      (data: Alojamientos[]) => {
        this.alojamientos = data;
      },
      (error: any) => {
        console.error('Error fetching alojamientos:', error);
      }
    );
  }

  getAlojamientosCompletos() {
    this.apiService.getAlojamientosCompletos().subscribe(
      (data: any) => {
        this.alojamientosCompletos = data.alojamientos.map((alojamiento: any) => ({
          id_alojamiento: alojamiento.id_alojamiento,
          nombre_alojamiento: alojamiento.nombre_alojamiento,
          id_destino: alojamiento.id_destino,
          ciudad: alojamiento.ciudad,
          pais: alojamiento.pais,
          precio_dia: alojamiento.precio_dia,
          descripcion: alojamiento.descripcion,
          id_usuario: alojamiento.id_usuario,
          max_personas: alojamiento.max_personas,
          direccion: alojamiento.direccion,
          hora_entrada: alojamiento.hora_entrada,
          hora_salida: alojamiento.hora_salida
        }));
        //console.log('Alojamientos completos:', this.alojamientosCompletos);
      },
      (error: any) => {
        console.error('Error fetching alojamientos completos:', error);
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

  editarAlojamiento(id_alojamiento: number) {
  this.router.navigate([`/editarAlojamiento`, id_alojamiento]);
}

  eliminarAlojamiento(id_alojamiento: number) {
    if (confirm(`¿Estás seguro de que deseas eliminar el alojamiento con ID ${id_alojamiento}?`)) {
      this.apiService.deleteAlojamiento(id_alojamiento).subscribe(
        response => {
          console.log('Alojamiento eliminado:', response);
          this.getAlojamientos();
          this.getAlojamientosCompletos();
        },
        error => {
          console.error('Error deleting alojamiento:', error);
        }
      );
    }

  }

  onFileSelectedAlojamiento(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.alojamientoImagenSeleccionada = true;
      this.apiService.subirImagen(file).subscribe(response => {
        this.alojamientoImagenUrl = response.imageUrl;
        this.alojamientoImagenSeleccionada = false;
        this.alojamientoImagenPreview = response.imageUrl;
        console.log('Imagen subida alojamiento:', this.alojamientoImagenUrl);
      });
    }
  }

  postImagenAlojamiento(id_alojamiento: number) {
    if (this.alojamientoImagenUrl) {
      this.apiService.subirRutaImagenAlojamientos(this.alojamientoImagenUrl, id_alojamiento).subscribe(
        (response) => {
          console.log('Imagen subida:', response);
        },
        (error) => {
          console.error('Error al asociar la imagen al alojamiento:', error);
        }
      );
    } else {
      console.log('No se ha seleccionado ninguna imagen para el alojamiento.');
    }
   console.log('Imagen asociada al alojamiento:', this.alojamientoImagenUrl);
  }

  onSubmit() {
    if (this.alojamientoForm.valid) {
      localStorage.setItem('id_usuario', '1');
      const formData = {
        id_alojamiento: this.alojamientoForm.value.id_alojamiento,
        nombre_alojamiento: this.alojamientoForm.value.nombre_alojamiento,
        id_destino: this.alojamientoForm.value.id_destino,
        precio_dia: this.alojamientoForm.value.precio_dia,
        descripcion: this.alojamientoForm.value.descripcion,
        id_usuario: Number(localStorage.getItem('id_usuario')),
        max_personas: this.alojamientoForm.value.max_personas,
        direccion: this.alojamientoForm.value.direccion,
        hora_entrada: this.alojamientoForm.value.hora_entrada,
        hora_salida: this.alojamientoForm.value.hora_salida
      };
      console.log('Form data:', formData);

      this.apiService.postAlojamiento(formData).subscribe(
        response => {
          console.log('Alojamiento creado:', response);
          this.getAlojamientos();
          this.getAlojamientosCompletos();
          this.alojamientoForm.reset();
          // Asociar imagen si hay, usando el id de la respuesta
          
            this.postImagenAlojamiento(response.id_alojamiento);
          
        },
        error => {
          console.error('Error creating alojamiento:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  ngOnInit() {
    this.getAlojamientosCompletos();
    this.getAlojamientos();
    this.getDestinos();
    this.checkAllowed();

  }
}
