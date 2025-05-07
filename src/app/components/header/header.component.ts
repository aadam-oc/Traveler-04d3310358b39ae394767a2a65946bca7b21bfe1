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
  pageTitle: string = 'Bienvenido';
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
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects;
      console.log('URL actual:', currentUrl); 
  
      this.pageTitle = this.route.root.firstChild?.snapshot.data['title'] || '';
      this.isHomePage = currentUrl === '/'; 
  
      this.animateTitle = false;
      setTimeout(() => {
        this.animateTitle = true;
      }, 10);
    });
  }
  

}



