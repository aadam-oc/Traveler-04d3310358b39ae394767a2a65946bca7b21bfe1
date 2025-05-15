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
import { Alojamientos } from '../../models/alojamientos';
import { ImagenesAlojamientos } from '../../models/imagenes-alojamientos';
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

  alojamientos: Alojamientos[] = [];
  alojamientosFiltrados: Alojamientos[] = [];
  imagenes: ImagenesAlojamientos[] = [];

  mostrarBoton: boolean = false;
  slides: any[] = [
    { src: 'http://172.17.131.14:3000/uploads/1742224263781.jpg', title: 'Angular' },
    { src: 'http://172.17.131.14:3000/uploads/1742224263781.jpg', title: 'React' },
    { src: 'http://172.17.131.14:3000/uploads/1742224263781.jpg', title: 'Vue' }
  ];
  constructor(private renderer: Renderer2, private apiService: ApiService) { }

  getImagenesAlojamientos(id_alojamiento: number): ImagenesAlojamientos[] {
    let imagenesAlojamientos: ImagenesAlojamientos[] = [];

    this.apiService.getImagenesAlojamientos(id_alojamiento).subscribe(data => {
      // Asignar las imágenes a la variable de clase

      imagenesAlojamientos = data.imagenes


      console.log('Imagenes de alojamientos:', imagenesAlojamientos);
    });

    return imagenesAlojamientos;
  }

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


    //Alojamientos
    this.apiService.getAlojamientosCompletos().subscribe(
      (data: any) => {
        // Obtener los alojamientos
        this.alojamientos = data.alojamientos.map((alojamiento: any) => ({
          id_alojamiento: alojamiento.id_alojamiento,
          nombre_alojamiento: alojamiento.nombre_alojamiento,
          id_destino: alojamiento.id_destino,
          precio_dia: alojamiento.precio_dia,
          descripcion: alojamiento.descripcion,
          id_usuario: alojamiento.id_usuario,
          max_personas: alojamiento.max_personas,
          direccion: alojamiento.direccion,
          pais: alojamiento.pais,
          ciudad: alojamiento.ciudad,
          correo: alojamiento.correo,
          imagenes: [] // Inicializar como un array vacío
        }));

        this.alojamientosFiltrados = [...this.alojamientos];

        // Obtener imágenes para cada alojamiento
        this.alojamientos.forEach((alojamiento) => {
          this.apiService.getImagenesAlojamientos(alojamiento.id_alojamiento).subscribe(data => {
            alojamiento.imagenes = data.imagenes; // Asignar las imágenes al alojamiento
          });
        });

        console.log('Alojamientos completos:', this.alojamientos);
      },
      (error: any) => {
        console.error('Error fetching alojamientos completos:', error);
      }
      this.alojamientosFiltrados = this.alojamientos.slice(0, 3);
    );
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
