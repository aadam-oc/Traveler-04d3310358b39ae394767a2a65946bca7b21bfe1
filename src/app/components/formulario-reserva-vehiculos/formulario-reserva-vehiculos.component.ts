import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FakeApiVehiculosService } from '../../services/fake-api-vehiculos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiculosAlquiler } from '../../models/vehiculos-alquiler';
import { ApiService } from '../../services/api.service';

@Component({
   imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-formulario-reserva-vehiculos',
  templateUrl: './formulario-reserva-vehiculos.component.html',
  styleUrls: ['./formulario-reserva-vehiculos.component.css']
})
export class FormularioReservaVehiculosComponent {
  form: FormGroup;
  id_vehiculo: number = 0;
  horasDisponibles: string[] = [];
  vehiculoSeleccionado!: VehiculosAlquiler;
  modalAbierto: boolean = false;
  modalReservaExitoAbierto: boolean = false;
  private timeoutModalReserva: any;
  nombre_vehiculo: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private fakeApiVehiculos: FakeApiVehiculosService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fecha_inicio_reserva: ['', Validators.required],
      hora_inicio_reserva: ['', Validators.required],
      fecha_final_reserva: ['', Validators.required],
      hora_final_reserva: ['', Validators.required],
      

    });

    for (let h = 8; h <= 20; h++) {
      const hora = h < 10 ? `0${h}:00:00` : `${h}:00:00`;
      this.horasDisponibles.push(hora);
    }
  }

  getIdVehiculo() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_vehiculo = +params['id']; 
        console.log('ID Vehículo obtenido:', this.id_vehiculo);
      } else {
        console.error('ID Vehículo no encontrado, redirigiendo al home');
        this.router.navigate(['/inicio']); 
      }
    });
  }

  ngOnInit() {
    this.getIdVehiculo();
    if (!this.id_vehiculo || this.id_vehiculo === 0) {
      alert('No se ha seleccionado un vehículo válido para reservar.');
      this.router.navigate(['/vehiculos']);
      return;
    }
    
    this.fakeApiVehiculos.getVehiculoPorId(this.id_vehiculo).subscribe(
      (vehiculo: VehiculosAlquiler) => {
        this.vehiculoSeleccionado = vehiculo;
        this.nombre_vehiculo = vehiculo.nombre_vehiculo;
        console.log('Vehículo seleccionado:', this.vehiculoSeleccionado);
      },
      (error) => {
        console.error('Error al obtener el vehículo:', error);
        alert('Error al cargar el vehículo. Por favor, inténtalo más tarde.');
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const id_vehiculo = Number(localStorage.getItem('id_vehiculo'));
      const id_usuario = Number(localStorage.getItem('id_usuario'));
      const fecha_reserva = new Date().toISOString().split('T')[0];



      const reserva = {
        id_vehiculo: id_vehiculo,
        id_usuario: id_usuario,
        fecha_reserva_vehiculo: fecha_reserva,
        fecha_inicio_reserva: formData.fecha_inicio_reserva,
        hora_inicio_reserva: formData.hora_inicio_reserva,
        fecha_final_reserva: formData.fecha_final_reserva,
        hora_final_reserva: formData.hora_final_reserva,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        telefono: formData.telefono,
        email: formData.email,
        nombre_vehiculo: this.nombre_vehiculo,
        
      };

      this.apiService.postReservaVehiculo(reserva).subscribe(
        (response) => {
          this.abrirModalReservaExito();
        },
        (error) => {
          alert('Hubo un error al realizar la reserva. Inténtalo de nuevo.');
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