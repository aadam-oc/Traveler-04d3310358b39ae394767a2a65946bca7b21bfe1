import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  nombre: string = 'Usuario'; // si tienes un nombre real, ajusta esto
  correo: string = '';
  foto: string = '';
  rol: string = '1';

  // Variables para el modal
  modalActive: boolean = false;
  profileForm!: FormGroup;
  previewImage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.correo = localStorage.getItem('correo') || '';
    this.nombre = localStorage.getItem('nombre') || 'Usuario';
    this.foto = localStorage.getItem('foto') || ''; // si guardas foto también
    this.rol = localStorage.getItem('id_rol') || '1'; // Ajusta el valor por defecto según tu lógica

    // Inicializar el formulario
    this.initForm();

    this.apiService.getImagenUsuario(localStorage.getItem('id_usuario')).subscribe(
      (data: any) => {
        console.log('Imagen de usuario:', data);
        this.foto = data.imagen.nombre_imagen_usuario || ''; // Ajusta según la estructura de tu respuesta
        localStorage.setItem('foto', this.foto); // Guarda la foto en localStorage si es necesario
      }
    );

    console.log('📦 Datos cargados desde localStorage:');
    console.log('Correo:', this.correo);
    console.log('Nombre:', this.nombre);
    console.log('Foto:', this.foto);
  }


  // Inicializar el formulario con los valores actuales
  initForm() {
    this.profileForm = this.fb.group({
      nombre: [this.nombre, [Validators.required]],
      correo: [this.correo, [Validators.required, Validators.email]],
      foto: [this.foto]
    });
  }

  // Abrir el modal
  openModal() {
    this.modalActive = true;
    document.body.style.overflow = 'hidden'; // Prevenir scroll en el fondo
  }

  // Cerrar el modal
  closeModal() {
    this.modalActive = false;
    document.body.style.overflow = ''; // Restaurar scroll
    this.previewImage = null;
    this.selectedFile = null;
    this.initForm(); // Reiniciar el formulario con los valores originales
  }

  // Manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Guardar los cambios del perfil
  saveProfile() {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('nombre', this.profileForm.value.nombre);
      formData.append('correo', this.profileForm.value.correo);

      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }
  }
}
}