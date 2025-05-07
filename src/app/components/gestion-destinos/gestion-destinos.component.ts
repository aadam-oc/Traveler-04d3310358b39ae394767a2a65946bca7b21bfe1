import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { Destinos } from '../../models/destinos';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-gestion-destinos',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, NgxPaginationModule],
  templateUrl: './gestion-destinos.component.html',
  styleUrl: './gestion-destinos.component.css',
})
export class GestionDestinosComponent {
  //Paginación
  p: number = 1;

  destinos: Destinos[] = [];
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      id_destino: [''],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required]
    });
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

  onSubmit() {
    if (this.form.valid) {
      const destino: Destinos = this.form.value;
      this.apiService.postDestino(destino).subscribe((data) => {
        this.getDestinos();
        this.form.reset();
      });
    }
  }

  onEdit(destino: Destinos) {
    this.form.patchValue(destino);
  }

  onDelete(destino: Destinos) {
    if (confirm('¿Estás seguro de que deseas eliminar este destino?')) {
      this.apiService.deleteDestino(destino.id_destino).subscribe(() => {
        this.getDestinos();
      });
    }
  }

  ngOnInit() {
    this.getDestinos();
  }


}
