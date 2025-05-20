import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

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

  reservas: boolean = false;

  modalActive: boolean = false;
  editarUsuarioForm!: FormGroup;
  id_usuario: number = Number(localStorage.getItem('id_usuario')) || 0;
  previewImage: string | null = null;
  selectedFile: File | null = null;

  reservasAlojamiento: any[] = [];
  reservasActividades: any[] = [];
  reservasVehiculos: any[] = [];
  reservasVuelos: any[] = [];

  perfilImagenSeleccionada: boolean = false;
  perfilImagenUrl: string = '';
  perfilImagenPreview: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getImagenUsuario();
    this.correo = localStorage.getItem('correo') || '';
    this.nombre = localStorage.getItem('nombre') || 'Usuario';
    this.rol = localStorage.getItem('id_rol') || '1';

    this.initEditarForm();
    this.getUsuario();

    this.apiService.getImagenUsuario(String(this.id_usuario)).subscribe(
      (data: any) => {
        this.foto = data.nombre_imagen_usuario || '';
        localStorage.setItem('foto', this.foto);
      },
      error => console.error('Error al obtener imagen de usuario', error)
    );

    const id_usuario = Number(localStorage.getItem('id_usuario'));

    this.apiService.getReservasAlojamientoUsuario(id_usuario).subscribe({
      next: data => {
        this.reservasAlojamiento = data;
      },
      error: err => {
        console.error('Error reservas alojamiento:', err);
      }
    });

    this.apiService.getReservasActividadesUsuario(id_usuario).subscribe({
      next: data => {
        this.reservasActividades = data;
      },
      error: err => {
        console.error('Error reservas actividades:', err);
      }
    });

    this.apiService.getReservasVuelosUsuario(id_usuario).subscribe({
      next: data => {
        this.reservasVuelos = data;
      },
      error: err => {
        console.error('Error reservas vuelos:', err);
      }
    });

    this.apiService.getReservasVehiculosUsuario(id_usuario).subscribe({
      next: data => {
        this.reservasVehiculos = data;
      },
      error: err => {
        console.error('Error reservas vehículos:', err);
      }
    });
  }

  initEditarForm() {
    this.editarUsuarioForm = this.fb.group({
      correo: [''],
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      telefono1: [''],
      telefono2: [''],
      contrasena: [''],
      confirmarContrasena: ['']
    }, { validators: this.passwordsMatchValidator });
  }

  // Validador personalizado para contraseñas
  passwordsMatchValidator(control: AbstractControl) {
    const password = control.get('contrasena')?.value;
    const confirmPassword = control.get('confirmarContrasena')?.value;
    // Solo valida si alguno de los dos tiene valor
    if ((password || confirmPassword) && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  getImagenUsuario() {
    this.apiService.getImagenUsuario(String(this.id_usuario)).subscribe(
      (data: any) => {
        console.log('Imagen de usuario:', data);
        this.foto = data.nombre_imagen_usuario || data.imagen?.nombre_imagen_usuario || '';
        this.perfilImagenUrl = this.foto;
      },
      error => console.error('Error al obtener imagen de usuario', error)
    );
    console.log('Imagen de usuario:', this.foto);
  }

  getUsuario() {
    this.apiService.getUsuariosCompletosById(this.id_usuario).subscribe(
      (response: any) => {
        const usuario = response.usuario;
        this.editarUsuarioForm.patchValue(usuario);

        // Guardar valores para mostrarlos en la tarjeta
        this.correo = usuario.correo;
        this.nombre = usuario.nombre;
        this.apellido1 = usuario.apellido1;
        this.telefono1 = usuario.telefono1;
      },
      error => console.error('Error al obtener usuario', error)
    );
  }

  onFileSelectedperfil(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.perfilImagenSeleccionada = true;
      this.apiService.subirImagen(file).subscribe(response => {
        this.foto = response.imageUrl;
        this.perfilImagenUrl = response.imageUrl;
        this.perfilImagenSeleccionada = false;
        this.perfilImagenPreview = response.imageUrl;
        console.log('Imagen subida perfil:', this.perfilImagenUrl);
      });
    }
  }

  postImagenUsuario(id_usuario: number) {
    this.apiService.subirRutaImagenUsuario(this.perfilImagenUrl, id_usuario).subscribe(
          (response) => {
            console.log('Imagen subida:', response);
          },
          (error) => {
            console.error('Error al asociar la imagen al usuario:', error);
          }
        );
        
        



      
  }

  openModal() {
    this.modalActive = true;
    document.body.style.overflow = 'hidden';

    this.editarUsuarioForm.patchValue({
      contrasena: '',
      confirmarContrasena: '',
    });
  }

  closeModal() {
    this.modalActive = false;
    document.body.style.overflow = '';
    this.previewImage = null;
    this.selectedFile = null;
    this.getUsuario(); // recarga valores reales
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

    this.postImagenUsuario(this.id_usuario);
    if (this.editarUsuarioForm.invalid) {
      if (this.editarUsuarioForm.hasError('passwordMismatch')) {
        alert('Las contraseñas no coinciden');
      } else {
        alert('Por favor completa los campos de contraseña');
      }
      return;
    }

    const formValues = this.editarUsuarioForm.value;

    const usuarioActualizado = {
      correo: formValues.correo?.trim() || this.correo,
      nombre: formValues.nombre?.trim() || this.nombre,
      apellido1: formValues.apellido1?.trim() || this.apellido1,
      apellido2: formValues.apellido2?.trim() || this.apellido2,
      telefono1: formValues.telefono1?.trim() || this.telefono1,
      telefono2: formValues.telefono2?.trim() || this.telefono2,
      contrasena: formValues.contrasena || undefined,
      id_rol: this.rol,
    };

    if (!usuarioActualizado.contrasena) {
      delete usuarioActualizado.contrasena;
    }

    this.apiService.getCaracterisitcaUsuarioById(this.id_usuario).subscribe(
      (response: any) => {
        console.log('Característica obtenida:', response);
        const caracteristica = response.caracteristica_usuario;
        if (caracteristica) {
          this.apiService.putCaracterisitcaUsuario(caracteristica.id_caracteristica, usuarioActualizado).subscribe(
            (response: any) => {
              console.log('Característica actualizada:', response);
            },
            (error) => {
              console.error('Error al actualizar característica:', error);
            }
          );
        } else {
          // Si no hay característica, crea una nueva
          const usuarioActualizadoConId = { ...usuarioActualizado, id_usuario: this.id_usuario };
          this.apiService.postCaracterisitcaUsuario(usuarioActualizadoConId).subscribe(
            (response: any) => {
              console.log('Característica creada:', response);
            },
            (error) => {
              console.error('Error al crear característica:', error);
            }
          );
        }
      },
      (error) => {
        // Si hay error (por ejemplo, no existe la característica), crea una nueva
        const usuarioActualizadoConId = { ...usuarioActualizado, id_usuario: this.id_usuario };
        this.apiService.postCaracterisitcaUsuario(usuarioActualizadoConId).subscribe(
          (response: any) => {
            console.log('Característica creada tras error:', response);
          },
          (error) => {
            console.error('Error al crear característica tras error:', error);
          }
        );
      }
    );
  }

  
}