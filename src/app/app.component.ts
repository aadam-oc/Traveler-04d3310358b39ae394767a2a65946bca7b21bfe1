// AppComponent sense components no utilitzats
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    MatDialogModule,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Traveler';
  responseText: string = '';

  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    // Verificar la ruta inicial
    this.checkRoute(this.router.url);

    // Suscribirse a los eventos de navegación futuros
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkRoute(event.urlAfterRedirects);
    });
  }

  // Método para verificar la ruta y actualizar la visibilidad
  private checkRoute(url: string): void {
    // Lista específica de rutas donde queremos ocultar el header
    const hideHeaderRoutes = ['/login', '/register'];

    // Verificar si la URL actual coincide exactamente con alguna de las rutas especificadas
    this.showHeader = !hideHeaderRoutes.some(route => url === route);

    // También puedes hacer lo mismo para el footer si lo necesitas
    this.showFooter = !hideHeaderRoutes.some(route => url === route);

    console.log('Current URL:', url, 'Show Header:', this.showHeader);
  }


  ngOnInit(): void {
    // Initialization logic here
  }
}