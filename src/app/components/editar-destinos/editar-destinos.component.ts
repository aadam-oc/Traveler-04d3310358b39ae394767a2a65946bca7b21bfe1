import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
  
  selector: 'app-editar-destinos',
  templateUrl: './editar-destinos.component.html',
  styleUrl: './editar-destinos.component.css'
})
export class EditarDestinosComponent implements OnInit {
  editarDestinoForm: FormGroup;
  id_destino: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.editarDestinoForm = this.fb.group({
      pais: ['', Validators.required],
      ciudad: ['', Validators.required]
    });
  }

  // Obtener el ID del destino desde la URL
  getIdDestino() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_destino = +params['id']; // Convierte a número
        console.log('ID Destino obtenido:', this.id_destino);
      } else {
        console.error('ID Destino no encontrado, redirigiendo al home');
        this.router.navigate(['/home']); // Redirige al home si no hay ID
      }
    });
  }

  // Cargar los datos del destino en el formulario
  getDestino() {
    this.apiService.getDestinoById(this.id_destino).subscribe(
      (response: any) => {
        const destino = response.destino; // Accede al objeto destino
        this.editarDestinoForm.patchValue({
          pais: destino.pais,
          ciudad: destino.ciudad
        });
        console.log('Datos del destino cargados:', destino);
      },
      error => {
        console.error('Error al obtener el destino:', error);
        this.router.navigate(['/home']); // Redirige al home si hay un error
      }
    );
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // Enviar los datos actualizados al backend
  onSubmit() {
    if (this.editarDestinoForm.valid) {
      const formData = this.editarDestinoForm.value;
      console.log('Formulario enviado:', formData);
      this.apiService.putDestino(this.id_destino, formData).subscribe(
        response => {
          console.log('Destino actualizado:', response);
          alert('Destino actualizado con éxito');
          this.router.navigate(['/gestionDestinos']);
        },
        error => {
          console.error('Error al actualizar el destino:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  ngOnInit() {
    this.getIdDestino();
    this.getDestino();
  }
}