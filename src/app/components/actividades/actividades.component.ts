import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Actividad } from '../../models/actividad';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-actividades',
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule, FormsModule],
  providers: [ApiService],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent implements OnInit {
  //Paginación
  p: number = 1;

  form!: FormGroup;
  actividades: Actividad[] = [];
  actividadesFiltradas: Actividad[] = [];
  paises: string[] = [];
  ciudades: string[] = [];

  // Propiedad para el modal
  actividadSeleccionada: Actividad | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      pais: [''],
      ciudad: [''],
      priceRange: [700]
    });

    this.apiService.getActividadesJoin().subscribe((response: any) => {
      console.log("Datos de la API:", response);
      this.actividades = response.actividades;

      // Cargamos Paises
      this.paises = [...new Set(this.actividades.map(a => a.pais))];

      //Filtro Inicial
      this.actividadesFiltradas = [...this.actividades];

      // Reaccionamos a los cambios del Formulario
      this.form.valueChanges.subscribe(() => {
        this.filtrarActividades();
      });
    });
  }

  filtrarActividades() {
    const { pais, ciudad, priceRange } = this.form.value;

    // Filtrar actividades según los campos del formulario
    this.actividadesFiltradas = this.actividades.filter(a =>
      (!pais || a.pais === pais) &&
      (!ciudad || a.ciudad === ciudad) &&
      a.precio <= priceRange
    );

    // Si se selecciona un país, actualizamos las ciudades disponibles
    if (pais) {
      const ciudadesDelPais = this.actividades
        .filter(a => a.pais === pais)
        .map(a => a.ciudad);
      this.ciudades = [...new Set(ciudadesDelPais)];
    } else {
      this.ciudades = [];
    }

    // Resetear ciudad si ya no aplica
    if (this.form.value.ciudad && !this.ciudades.includes(this.form.value.ciudad)) {
      this.form.patchValue({ ciudad: '' }, { emitEvent: false });
    }
  }

  // Métodos para el modal
  abrirModal(actividad: Actividad) {
    this.actividadSeleccionada = actividad;
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  cerrarModal(event: MouseEvent) {
    // Solo cerrar si se hace clic en el overlay o en el botón de cerrar
    if (
      (event.target as HTMLElement).classList.contains('modal-overlay') ||
      (event.target as HTMLElement).classList.contains('cerrar-modal')
    ) {
      this.actividadSeleccionada = null;
      // Restaurar scroll del body
      document.body.style.overflow = 'auto';
    }
  }
}