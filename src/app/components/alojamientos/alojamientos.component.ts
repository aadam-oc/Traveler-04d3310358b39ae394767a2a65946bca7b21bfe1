import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Alojamientos } from '../../models/alojamientos';
import { Destinos } from '../../models/destinos';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImagenesAlojamientos } from '../../models/imagenes-alojamientos';

@Component({
  selector: 'app-alojamientos',
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule, FormsModule],
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.css']
})
export class AlojamientosComponent {
  p: number = 1;

  imagenes: ImagenesAlojamientos[] = [];

  destinos: Destinos[] = [];

  alojamientos: Alojamientos[] = [];
  alojamientosFiltrados: Alojamientos[] = [];

  paises: string[] = [];
  ciudades: string[] = [];

  form!: FormGroup;

  modalAbierto: boolean = false;
  alojamientoSeleccionado: any = null;
  imagenActual: number = 0;

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) { }


  getImagenesAlojamientos(id_alojamiento: number): ImagenesAlojamientos[] {
    let imagenesAlojamientos: ImagenesAlojamientos[] = [];

    this.apiService.getImagenesAlojamientos(id_alojamiento).subscribe(data => {
      // Asignar las imágenes a la variable de clase

      imagenesAlojamientos = data.imagenes


      console.log('Imagenes de alojamientos:', imagenesAlojamientos);
    });

    return imagenesAlojamientos;
  }


  ngOnInit() {
    // Inicializar Formulario
    this.form = this.fb.group({
      pais: [''],
      ciudad: [''],
      priceRangeAlojamientos: [700]
    });
  
    // Suscribirse a los cambios del formulario si quieres filtrar automáticamente
    this.form.valueChanges.subscribe(() => {
      this.filtrarAlojamientos();
    });
  
    this.apiService.getAlojamientosCompletos().subscribe(
      (data: any) => {
        // Obtener los alojamientos
        this.alojamientos = data.alojamientos.map((alojamiento: any) => ({
          id_alojamiento: alojamiento.id_alojamiento,
          nombre_alojamiento: alojamiento.nombre_alojamiento,
          id_destino: alojamiento.id_destino,
          precio_dia: alojamiento.precio_dia,
          descripcion: alojamiento.descripcion,
          id_usuario: alojamiento.id_usuario,
          max_personas: alojamiento.max_personas,
          direccion: alojamiento.direccion,
          pais: alojamiento.pais,
          ciudad: alojamiento.ciudad,
          correo: alojamiento.correo,
          imagenes: [] // Inicializar como un array vacío
        }));
  
        this.alojamientosFiltrados = [...this.alojamientos];
  
        // Obtener los países únicos
        this.paises = [...new Set(this.alojamientos.map(a => a.pais))];  // Obtener países únicos
        console.log('Paises disponibles:', this.paises);  // Ver los países disponibles
  
        // Obtener imágenes para cada alojamiento
        this.alojamientos.forEach((alojamiento) => {
          this.apiService.getImagenesAlojamientos(alojamiento.id_alojamiento).subscribe(data => {
            alojamiento.imagenes = data.imagenes; // Asignar las imágenes al alojamiento
          });
        });
  
        console.log('Alojamientos completos:', this.alojamientos);
      },
      (error: any) => {
        console.error('Error fetching alojamientos completos:', error);
      }
    );
  }
  

  filtrarAlojamientos() {
    const { pais, ciudad, priceRangeAlojamientos } = this.form.value;
  
    console.log('Filtros actuales:', pais, ciudad, priceRangeAlojamientos);
  
    // Filtrar alojamientos según los filtros seleccionados
    this.alojamientosFiltrados = this.alojamientos.filter(a =>
      (!pais || a.pais === pais) &&
      (!ciudad || a.ciudad === ciudad) &&
      a.precio_dia <= priceRangeAlojamientos
    );
  
    console.log('Alojamientos filtrados:', this.alojamientosFiltrados);
  
    // Si se selecciona un país, actualizar las ciudades disponibles
    if (pais) {
      const ciudadesDelPais = this.alojamientos
        .filter(a => a.pais === pais)
        .map(a => a.ciudad);
      this.ciudades = [...new Set(ciudadesDelPais)]; // Eliminar duplicados
      console.log('Ciudades para el país seleccionado:', this.ciudades);
    } else {
      this.ciudades = []; // Si no hay país seleccionado, vaciar las ciudades
      console.log('No hay país seleccionado, ciudades vacías');
    }
  
    // Resetear ciudad si ya no aplica
    if (this.form.value.ciudad && !this.ciudades.includes(this.form.value.ciudad)) {
      this.form.patchValue({ ciudad: '' }, { emitEvent: false });
      console.log('Ciudad resetada, ya no está en las ciudades disponibles');
    }
  } 

  abrirModal(alojamiento: any) {
    this.alojamientoSeleccionado = alojamiento;
    this.imagenActual = 0; // Reiniciar el carrusel
    this.modalAbierto = true;
  }

 // Métodos para el modal

cerrarModal(event: MouseEvent) {
  // Solo cerrar si se hace clic en el overlay o en el botón de cerrar
  if (
    (event.target as HTMLElement).classList.contains('modal-overlay') ||
    (event.target as HTMLElement).classList.contains('cerrar-modal')
  ) {
    this.alojamientoSeleccionado = null;
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }
}
}
