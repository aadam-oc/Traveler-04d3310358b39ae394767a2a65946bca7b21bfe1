import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('id_rol');

    console.log('Token encontrado:', token);
    console.log('Rol encontrado:', userRole);

    // Permitir acceso libre a /register
    if (next.routeConfig?.path === 'register') {
      return true;
    }

    if (token) {
      // Verificar si el usuario intenta acceder al dashboard
      if (next.routeConfig?.path === 'dashboard' && userRole !== '2' ) {
        console.warn('Acceso denegado.');
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    if (token) {
      // Verificar si el usuario intenta acceder al dashboard
      if (next.routeConfig?.path === 'dashboard' && userRole !== '2' ) {
        console.warn('Acceso denegado.');
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  checkAdminRole(): boolean {
    const userRole = localStorage.getItem('id_rol');

    console.log('Rol encontrado:', userRole);

    if (userRole === '2') {
      return true;
    } else {
      console.warn('Acceso denegado. Rol requerido: Admin');
      return false;
    }
  }
  
}
