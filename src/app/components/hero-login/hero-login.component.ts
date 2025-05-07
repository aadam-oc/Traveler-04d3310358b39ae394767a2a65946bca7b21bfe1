import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-hero-login',
  standalone: true, // Necesario en Angular 15+ para componentes independientes
  imports: [LoginFormComponent], // Asegura que pueda usar LoginFormComponent
  templateUrl: './hero-login.component.html',
  styleUrls: ['./hero-login.component.css'] // Cambiado 'styleUrl' a 'styleUrls'
})
export class HeroLoginComponent {
  title = 'HeroLogin';
}
