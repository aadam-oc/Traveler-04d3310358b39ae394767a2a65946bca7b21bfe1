import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component'; // Ruta al componente principal
import { appRoutes } from './app/app.routes'; // Ruta a tus rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Agrega HttpClient para hacer peticiones HTTP
    provideRouter(appRoutes) // Configura las rutas para la aplicación
  ]
}).catch(err => console.error(err));
