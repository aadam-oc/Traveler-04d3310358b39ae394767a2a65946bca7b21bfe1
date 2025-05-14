import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FakeApiVuelosService } from '../../services/fake-api-vuelos.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Vuelos } from '../../models/vuelos';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css'],
  providers: [FakeApiVuelosService]
})


export class VuelosComponent implements OnInit {
  vuelos: Vuelos[] = []; // Usamos la interfaz Vuelos para tipar los datos

  constructor(private fakeApiVuelosService: FakeApiVuelosService) {}

  ngOnInit(): void {
    this.fakeApiVuelosService.getVuelos()
      .pipe(
        catchError(error => {
          console.error('Error al obtener los vuelos:', error);
          return of([]); // Devuelve un array vacío en caso de error
        })
      )
      .subscribe((data: Vuelos[]) => {
        this.vuelos = data; // Asigna los datos recibidos a la propiedad vuelos 
        console.log('Vuelos obtenidos:', this.vuelos);
      });
  }
}

