import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  nombre: string = 'Usuario';
  correo: string = '';
  apellido1: string = '';
  apellido2: string = '';
  telefono1: string = '';
  telefono2: string = '';
  foto: string = '';
  rol: string = '1';

  modalActive: boolean = false;
  editarUsuarioForm!: FormGroup;
  id_usuario: number = Number(localStorage.getItem('id_usuario')) || 0;
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
    this.foto = localStorage.getItem('foto') || '';
    this.rol = localStorage.getItem('id_rol') || '1';

    this.initEditarForm();
    this.getUsuario();

    this.apiService.getImagenUsuario(String(this.id_usuario)).subscribe(
      (data: any) => {
        this.foto = data.imagen?.nombre_imagen_usuario || '';
        localStorage.setItem('foto', this.foto);
      },
      error => console.error('Error al obtener imagen de usuario', error)
    );
  }

  initEditarForm() {
    this.editarUsuarioForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      id_rol: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: [''],
    });
  }

  getUsuario() {
    this.apiService.getUsuariosCompletosById(this.id_usuario).subscribe(
      (response: any) => {
        const usuario = response.usuario;
        this.editarUsuarioForm.patchValue(usuario);

        // Guardar valores para mostrarlos en la tarjeta
        this.apellido1 = usuario.apellido1;
        this.apellido2 = usuario.apellido2;
        this.telefono1 = usuario.telefono1;
        this.telefono2 = usuario.telefono2;
      },
      error => console.error('Error al obtener usuario', error)
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openModal() {
    this.modalActive = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalActive = false;
    document.body.style.overflow = '';
    this.previewImage = null;
    this.selectedFile = null;
    this.getUsuario(); // recarga valores reales
  }

reservasAlojamiento: any[] = [];
reservasActividades: any[] = [];
reservasVehiculos: any[] = [];
reservasVuelos: any[] = [];

gOnInit() {
  const id_usuario = Number(localStorage.getItem('id_usuario'));
  this.apiService.getReservasAlojamientoUsuario(id_usuario).subscribe(data => {
    this.reservasAlojamiento = data;
  });
  this.apiService.getReservasActividadesUsuario(id_usuario).subscribe(data => {
    this.reservasActividades = data;
  });
  this.apiService.getReservasVehiculosUsuario(id_usuario).subscribe(data => {
    this.reservasVehiculos = data;
  });
  this.apiService.getReservasVuelosUsuario(id_usuario).subscribe(data => {
    this.reservasVuelos = data;
  });
}

tieneReservas(): boolean {
  return (
    this.reservasAlojamiento.length > 0 ||
    this.reservasActividades.length > 0 ||
    this.reservasVehiculos.length > 0 ||
    this.reservasVuelos.length > 0
  );
}

  onSubmitEditar() {
    if (this.editarUsuarioForm.valid) {
      const formValues = this.editarUsuarioForm.value;
      const formData = new FormData();

      // Solo enviar la contraseña si no está vacía
      if (formValues.contrasena) {
        formData.append('contrasena', formValues.contrasena);
      }

      // Asegurar que id_rol es un número
      formData.append('id_rol', String(formValues.id_rol || this.rol));

      // Agregar los demás campos
      formData.append('correo', formValues.correo);
      formData.append('nombre', formValues.nombre);
      formData.append('apellido1', formValues.apellido1);
      formData.append('apellido2', formValues.apellido2 || '');
      formData.append('telefono1', formValues.telefono1);
      formData.append('telefono2', formValues.telefono2 || '');
      formData.append('id_usuario', String(this.id_usuario));

      // Agregar la imagen si existe
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile, this.selectedFile.name);
      }

      this.apiService.putUsuarioCompleto(this.id_usuario, formData).subscribe(
        (response: any) => {
          alert('Perfil actualizado correctamente');

          // Actualizar localStorage con los nuevos datos
          if (response.usuario) {
            localStorage.setItem('nombre', response.usuario.nombre);
            localStorage.setItem('correo', response.usuario.correo);
            localStorage.setItem('id_rol', response.usuario.id_rol);
            if (response.usuario.imagen) {
              localStorage.setItem('foto', response.usuario.imagen);
              this.foto = response.usuario.imagen;
            }
          }

          this.modalActive = false;
          this.getUsuario(); // Refrescar datos
        },
        (error) => {
          console.error('Error al actualizar perfil:', error);
          alert(`Error al actualizar el perfil: ${error.error?.message || error.message}`);
        }
      );
    } else {
      console.error('Formulario inválido');
      alert('Por favor complete todos los campos requeridos correctamente');
    }
  }
}
