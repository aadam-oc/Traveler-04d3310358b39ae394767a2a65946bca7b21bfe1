import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';


declare global {
  interface Window {
    chatbase?: any;
  }
}
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Actividad } from '../../models/actividad';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  actividades: Actividad[] = [];
  actividad: any;
  mostrarBoton: boolean = false;
  slides: any[] = [
    { src: 'http://172.17.131.14:3000/uploads/1742224263781.jpg', title: 'Angular' },
    { src: 'http://172.17.131.14:3000/uploads/1742224263781.jpg', title: 'React' },
    { src: 'http://172.17.131.14:3000/uploads/1742224263781.jpg', title: 'Vue' }
  ];
  constructor(private renderer: Renderer2, private apiService: ApiService) { }
  


  getActividades() {
    this.apiService.getActividadesJoin().subscribe((response: any) => {
      console.log("Datos de la API:", response);
      this.actividades = response.actividades;

      this.actividades = this.actividades.slice(0, 3);
    });
  };


  ngOnInit() {
    this.getActividades();
    if (!window.chatbase || (window as any).chatbase("getState") !== "initialized") {
      (window as any).chatbase = (...args: any[]) => {
        if (!(window as any).chatbase.q) {
          (window as any).chatbase.q = [];
        }
        (window as any).chatbase.q.push(args);
      };
      (window as any).chatbase = new Proxy((window as any).chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        }
      });
    }

    const script = this.renderer.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "LvNA3gEjb8MdrjfaWJ3w9";
    script.setAttribute('domain', 'www.chatbase.co');
    this.renderer.appendChild(document.body, script);
  }

  scrollToSection(): void {
    const element = document.getElementById('destacados');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.mostrarBoton = scrollPosition > 300; 
  }

scrollToTop(): void {
  const element = document.getElementById('hero-content');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
}
