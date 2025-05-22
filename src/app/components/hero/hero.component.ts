import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { ApiService } from '../../services/api.service';
import { Item } from '../../models/item.model';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  title = 'HeroRegister';
  isHomePage: boolean = false;
  isLoginOrRegister: boolean = false;
 

  constructor(private apiService: ApiService, private router: Router) { }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects;
      console.log('URL actual:', currentUrl);

      this.isHomePage = currentUrl === '/';
      // Verifica si estamos en login o register
      this.isLoginOrRegister = currentUrl.includes('/login') || currentUrl.includes('/register');
    });
  }

  // Método que recibe los datos del formulario
  onRegister(userData: any) {
    console.log("Datos recibidos del formulario en HeroComponent:", userData);

    // Llamada al servicio para registrar al usuario
    this.apiService.registerUser(userData).subscribe({
      next: (response) => {
        console.log("Registro exitoso:", response);
        // Aquí puedes redirigir o mostrar un mensaje al usuario
        this.apiService.loginUser(userData).subscribe({
          next: (response) => {
            console.log('✅ Login exitoso', response);
            localStorage.setItem('authToken', response.token);
            this.apiService.getUsuariosCompletosById(response.id_usuario).subscribe({
              next: (userData) => {
                console.log('Datos del usuario:', userData);
                const usuario = userData.usuario || {};
                localStorage.setItem('correo', usuario.correo || '');
                localStorage.setItem('id_rol', usuario.id_rol?.toString() || '');
                localStorage.setItem('nombre_rol', usuario.nombre_rol || '');
                localStorage.setItem('nombre', usuario.nombre || '');
                localStorage.setItem('apellido1', usuario.apellido1 || '');
                localStorage.setItem('apellido2', usuario.apellido2 || '');
                localStorage.setItem('telefono1', usuario.telefono1 || '');
                localStorage.setItem('telefono2', usuario.telefono2 || '');
                localStorage.setItem('id_usuario', usuario.id_usuario?.toString() || '');
                console.log('Token guardado en localStorage:', localStorage.getItem('authToken'));
                console.log('ID Usuario guardado en localStorage:', localStorage.getItem('id_usuario'));
                console.log('Correo guardado en localStorage:', localStorage.getItem('correo'));
                console.log('ID Rol guardado en localStorage:', localStorage.getItem('id_rol'));
                console.log('Nombre Rol guardado en localStorage:', localStorage.getItem('nombre_rol'));
                console.log('Nombre guardado en localStorage:', localStorage.getItem('nombre'));
                console.log('Apellido1 guardado en localStorage:', localStorage.getItem('apellido1'));
                console.log('Apellido2 guardado en localStorage:', localStorage.getItem('apellido2'));
                console.log('Telefono1 guardado en localStorage:', localStorage.getItem('telefono1'));
                console.log('Telefono2 guardado en localStorage:', localStorage.getItem('telefono2'));

                
              },
              error: (err) => {
                console.error('❌ Error al obtener datos del usuario:', err);
              }
            });
          },
          error: (err: any) => {
            console.error('❌ Error en el login', err);
          }
        });
      },
      error: (err) => {
        console.error("Error al registrar al usuario:", err);
        // Aquí puedes mostrar un mensaje de error
      }
    });
  }
}