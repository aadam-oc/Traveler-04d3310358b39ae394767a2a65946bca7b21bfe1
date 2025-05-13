import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Alojamientos } from '../../models/alojamientos';
import { Destinos } from '../../models/destinos'; // Asegúrate de tener este modelo

@Component({
  selector: 'app-editar-alojamiento',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editar-alojamiento.component.html',
  styleUrl: './editar-alojamiento.component.css'
})
export class EditarAlojamientoComponent {
  editaralojamientoForm: FormGroup;
  id_alojamiento: number = 0;
  destinos: Destinos[] = []; // Lista de destinos

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private apiService: ApiService) {
    this.editaralojamientoForm = this.fb.group({
      id_destino: ['', Validators.required],
      nombre_alojamiento: ['', Validators.required],
      precio_dia: ['', Validators.required],
      descripcion: ['', Validators.required],
      max_personas: ['', Validators.required],
      direccion: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required]
    });
  }

  navigateToAlojamientos() {
    this.router.navigate(['/alojamientos']);
  }

  // Obtener el ID del alojamiento desde los parámetros de la URL
  getIdAlojamiento() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_alojamiento = +params['id']; // Convierte a número
      } else {
        console.error('ID Alojamiento no encontrado, redirigiendo al home');
        this.router.navigate(['/home']); // Redirige al home si no hay ID
      }
    });
    return this.id_alojamiento;
  }

  // Obtener los destinos desde el backend
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

  // Cargar los datos del alojamiento en el formulario
  getAlojamiento() {
  this.apiService.getAlojamientoJoinById(this.id_alojamiento).subscribe(
    (response: any) => {
      const alojamiento = response.alojamientos[0]; // Accede al primer elemento del array
      this.editaralojamientoForm.patchValue({
        id_destino: alojamiento.id_destino,
        nombre_alojamiento: alojamiento.nombre_alojamiento,
        precio_dia: alojamiento.precio_dia,
        descripcion: alojamiento.descripcion,
        max_personas: alojamiento.max_personas,
        direccion: alojamiento.direccion,
        hora_entrada: alojamiento.hora_entrada,
        hora_salida: alojamiento.hora_salida
      });
    },
    error => {
      console.error('Error al obtener el alojamiento:', error);
      this.router.navigate(['/home']); // Redirige al home si hay un error
    }
  );
}

  // Enviar los datos actualizados al backend
  onSubmit() {
    if (this.editaralojamientoForm.valid) {
      const formData = this.editaralojamientoForm.value;
      console.log('Formulario enviado:', formData);
      this.apiService.putAlojamientoCompleto(this.id_alojamiento, formData).subscribe(
        response => {
          console.log('Alojamiento actualizado:', response);
          alert('Alojamiento actualizado con éxito');
          this.router.navigate(['/alojamientos']);
        },
        error => {
          console.error('Error al actualizar el alojamiento:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  ngOnInit() {
    this.getIdAlojamiento();
    this.getDestinos(); 
    this.getAlojamiento();
  }
}