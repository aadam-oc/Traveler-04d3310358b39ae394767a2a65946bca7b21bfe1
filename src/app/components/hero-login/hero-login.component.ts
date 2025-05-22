import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-hero-login',
  standalone: true,
  imports: [LoginFormComponent, CommonModule, RouterLink], 
  templateUrl: './hero-login.component.html',
  styleUrls: ['./hero-login.component.css'] 
})
export class HeroLoginComponent {
  title = 'HeroLogin';
  isHomePage: boolean = false;
  isLoginOrRegister: boolean = false;
  

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
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
}
