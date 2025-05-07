import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RegisterFormComponent } from '../register-form/register-form.component';
import { ApiService } from '../../services/api.service';
import { Item } from '../../models/item.model'; 

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  
  title = 'HeroRegister';

  constructor(private apiService: ApiService) {}

  

  // Método que recibe los datos del formulario
  onRegister(userData: any) {
    console.log("Datos recibidos del formulario en HeroComponent:", userData);

    // Llamada al servicio para registrar al usuario
    this.apiService.registerUser(userData).subscribe({
      next: (response) => {
        console.log("Registro exitoso:", response);
        // Aquí puedes redirigir o mostrar un mensaje al usuario
      },
      error: (err) => {
        console.error("Error al registrar al usuario:", err);
        // Aquí puedes mostrar un mensaje de error
      }
    });
  }
}