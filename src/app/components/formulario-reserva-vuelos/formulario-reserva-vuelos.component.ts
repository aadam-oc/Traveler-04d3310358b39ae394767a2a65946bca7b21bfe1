import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FakeApiVuelosService } from '../../services/fake-api-vuelos.service';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vuelos } from '../../models/vuelos';

@Component({
  selector: 'app-formulario-reserva-vuelos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-reserva-vuelos.component.html',
  styleUrls: ['./formulario-reserva-vuelos.component.css']
})
export class FormularioReservaVuelosComponent {
  form: FormGroup;
  id_vuelo: number = 0;
  horasDisponibles: string[] = [];
  vueloSeleccionado!: Vuelos;
  modalAbierto: boolean = false;
  modalReservaExitoAbierto: boolean = false;
  private timeoutModalReserva: any;
  origen: string = '';
  destino: string = '';
  dia: string = '';
  hora: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private fakeapiVuelos: FakeApiVuelosService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });

    for (let h = 10; h <= 20; h++) {
      const hora = h < 10 ? `0${h}:00:00` : `${h}:00:00`;
      this.horasDisponibles.push(hora);
    }
  }

  getIdVuelo() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_vuelo = +params['id'];
        console.log('ID Vuelo obtenido:', this.id_vuelo);
      } else {
        console.error('ID Vuelo no encontrado, redirigiendo al home');
        this.router.navigate(['/inicio']);
      }
    });
  }

  ngOnInit() {
    this.getIdVuelo();
    if (!this.id_vuelo || this.id_vuelo === 0) {
      alert('No se ha seleccionado un vuelo válido para reservar.');
      this.router.navigate(['/vuelos']);
      return;
    }
    this.fakeapiVuelos.getVueloById(this.id_vuelo).subscribe(
      (vuelo: any) => {
        this.vueloSeleccionado = vuelo;
        this.origen = vuelo.origen_ciudad;
        this.destino = vuelo.destino_ciudad;
        this.dia = vuelo.dia;
        this.hora = vuelo.hora;
        console.log('Vuelo seleccionado:', this.vueloSeleccionado);
      },
      (error) => {
        console.error('Error al obtener el vuelo:', error);
        alert('Error al cargar el vuelo. Por favor, inténtalo más tarde.');
      }
    );
  }

  abrirModal(vuelo: Vuelos) {
    this.vueloSeleccionado = vuelo;
    this.modalAbierto = true;
  }

  irAFormularioReservaVuelo(id_vuelo: number) {
    localStorage.setItem('id_vuelo', id_vuelo.toString());
    this.router.navigate(['/reserva-vuelos']);
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const id_usuario = Number(localStorage.getItem('id_usuario'));

      const reserva = {
        id_vuelo: this.id_vuelo,
        id_usuario: id_usuario,
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        ciudad_salida_vuelo: this.origen,
        ciudad_llegada_vuelo: this.destino,
        fecha_salida_vuelo: this.dia,
        hora_salida_vuelo: this.hora
      };

      this.apiService.postReservaVuelo(reserva).subscribe(
        (response) => {
          this.abrirModalReservaExito();
        },
        (error) => {
          alert('Hubo un error al realizar la reserva de vuelo. Inténtalo de nuevo.');
        }
      );
        } else {
      alert('Por favor, completa todos los campos requeridos.');
        }
      }

  abrirModalReservaExito() {
    this.modalReservaExitoAbierto = true;
    this.timeoutModalReserva = setTimeout(() => {
      this.cerrarModalReservaExito();
      this.router.navigate(['/inicio']);
    }, 5000); 
  }

  cerrarModalReservaExito(event?: MouseEvent) {
    this.modalReservaExitoAbierto = false;
    if (this.timeoutModalReserva) {
      clearTimeout(this.timeoutModalReserva);
      this.timeoutModalReserva = null;
    }
    if (event) {
      this.router.navigate(['/inicio']);
    }
  }
}