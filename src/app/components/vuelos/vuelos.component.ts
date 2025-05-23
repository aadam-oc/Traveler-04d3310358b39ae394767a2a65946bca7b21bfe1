import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FakeApiVuelosService } from '../../services/fake-api-vuelos.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Vuelos } from '../../models/vuelos';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css'],
  providers: [FakeApiVuelosService]
})
export class VuelosComponent implements OnInit {
  vuelos: Vuelos[] = [];
  vuelosFiltrados: Vuelos[] = [];
  origenes: string[] = [];
  destinos: string[] = [];
  filtrosForm: FormGroup;
  modalAbierto = false;
  vueloSeleccionado: Vuelos | null = null;

  // Paginación
  p: number = 1;

  constructor(
    private fakeApiVuelosService: FakeApiVuelosService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.filtrosForm = this.fb.group({
      origen: [''],
      destino: [''],
      fecha: [''],
      priceRange: [200]
    });
  }

  ngOnInit(): void {
    this.fakeApiVuelosService.getVuelos()
      .pipe(
        catchError(error => {
          console.error('Error al obtener los vuelos:', error);
          return of([]);
        })
      )
      .subscribe((data: Vuelos[]) => {
        this.vuelos = data;
        this.vuelosFiltrados = data;
        this.origenes = [...new Set(data.map(v => v.origen_ciudad))];
        this.destinos = [...new Set(data.map(v => v.destino_ciudad))];
      });

    this.filtrosForm.valueChanges.subscribe(() => {
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    const { origen, destino, fecha, priceRange } = this.filtrosForm.value;
    this.vuelosFiltrados = this.vuelos.filter(vuelo => {
      const coincideOrigen = !origen || vuelo.origen_ciudad === origen;
      const coincideDestino = !destino || vuelo.destino_ciudad === destino;
      const coincideFecha = !fecha || (vuelo.dia && (new Date(vuelo.dia).toISOString().slice(0, 10) === fecha));
      const coincidePrecio = !priceRange || vuelo.precio <= priceRange;
      return coincideOrigen && coincideDestino && coincideFecha && coincidePrecio;
    });
  }

  verMas(vuelo: Vuelos) {
    this.vueloSeleccionado = vuelo;
    this.modalAbierto = true;
  }

  cerrarModal(event: Event) {
    event.stopPropagation();
    this.modalAbierto = false;
    this.vueloSeleccionado = null;
  }

  irAFormularioReserva(idVuelos: number) {
    localStorage.setItem('id_vuelo', idVuelos.toString());
    this.router.navigate(['/reservar-vuelos', idVuelos]);

  }
}

