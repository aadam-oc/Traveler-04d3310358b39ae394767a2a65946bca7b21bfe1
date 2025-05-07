import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Actividad } from '../../models/actividad';
@Component({
  selector: 'app-editar-actividades',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editar-actividades.component.html',
  styleUrl: './editar-actividades.component.css'
})
export class EditarActividadesComponent {
  editaractividadForm: FormGroup;
  id_actividad: number = 0;
  actividadesCompletas: Actividad[] = [];

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) {
    this.editaractividadForm = this.fb.group({
      id_tipo_actividad: ['', Validators.required],
      id_destino: ['', Validators.required],
      disponibilidad_actividad: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      nombre_tipo_actividad: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      id_imagen_actividad: ['', Validators.required],
      nombre_imagen_actividad: ['', Validators.required]
    });
  }
  getIdActividad() {
    this.router.routerState.root.queryParams.subscribe(params => {
      this.id_actividad = params['id_actividad'];
      console.log('ID Actividad:', this.id_actividad);
    });
    return this.id_actividad;
  }

  
  getActividades() {
    

    this.apiService.getActividadesJoinById(this.getIdActividad()).subscribe((response: any) => {
      this.editaractividadForm.patchValue({
        id_tipo_actividad: response.actividades[0].id_tipo_actividad,
        id_destino: response.actividades[0].id_destino,
        disponibilidad_actividad: response.actividades[0].disponibilidad_actividad,
        precio: response.actividades[0].precio,
        descripcion: response.actividades[0].descripcion,
        nombre_tipo_actividad: response.actividades[0].nombre_tipo_actividad,
        pais: response.actividades[0].pais,
        ciudad: response.actividades[0].ciudad,
        id_imagen_actividad: response.actividades[0].id_imagen_actividad,
        nombre_imagen_actividad: response.actividades[0].nombre_imagen_actividad
      });
      
    }
    );

  }


  ngOnInit() {
    this.getIdActividad();
    this.getActividades();
  }

  onSubmit() {
    if (this.editaractividadForm.valid) {
      const formData = this.editaractividadForm.value;
      console.log('Formulario enviado:', formData);
      this.apiService.putActividadCompleta(this.getIdActividad(), formData).subscribe((response: any) => {
        console.log('Actividad actualizada:', response);
        alert('Actividad actualizada con éxito');
        this.router.navigate(['/actividades']);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
