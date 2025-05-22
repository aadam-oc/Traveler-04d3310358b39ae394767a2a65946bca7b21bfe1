import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isHomePage: boolean = false;
  isLoginOrRegister: boolean = false;
  pageTitle: string = '';
  animateTitle: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    // Verificar la ruta inicial
    this.checkCurrentRoute(this.router.url);
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkCurrentRoute(event.urlAfterRedirects);
    });
  }

  private checkCurrentRoute(url: string): void {
    console.log('Checking route:', url);
    
    // Verificar si estamos en la página de inicio
    // Comprobamos tanto '/' como '/inicio' para cubrir ambas posibilidades
    this.isHomePage = url === '/' || url === '/inicio';
    console.log('Is home page:', this.isHomePage);
    
    // Verificar si estamos en login o register
    this.isLoginOrRegister = url.includes('/login') || url.includes('/register');
    console.log('Is login or register:', this.isLoginOrRegister);
    
    // Obtener el título de la página desde los datos de la ruta
    this.pageTitle = this.route.root.firstChild?.snapshot.data['title'] || '';
    
    // Forzar la detección de cambios y la aplicación de estilos
    if (!this.isLoginOrRegister) {
      // Si venimos de login/register, forzar un reflow
      setTimeout(() => {
        const heroSection = document.querySelector('.hero-section') as HTMLElement;
        if (heroSection) {
          console.log('Forcing reflow on hero section');
          
          // Forzar un reflow
          void heroSection.offsetHeight;
          
          // Asegurarnos de que la clase se aplica correctamente
          if (this.isHomePage) {
            heroSection.classList.add('home-hero');
            console.log('Added home-hero class');
          } else {
            heroSection.classList.remove('home-hero');
            console.log('Removed home-hero class');
          }
        }
      }, 0);
    }
    
    // Reiniciar la animación del título
    this.animateTitle = false;
    setTimeout(() => {
      this.animateTitle = true;
    }, 10);
  }
}