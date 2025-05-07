import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../models/item.model'; 

@Component({
  providers: [ApiService],
  imports: [CommonModule],
  templateUrl: './destinos.component.html',
  styleUrl: './destinos.component.css'
})
export class DestinosComponent {
  items: Item[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getDestinos().subscribe((response: any) => {
      console.log("Datos de la API:", response);
      this.items = response.destinos; 
    });
  }
}
