import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { Contacto } from '../../models/contacto';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-gestion-contacto',
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './gestion-contacto.component.html',
  styleUrl: './gestion-contacto.component.css',
})
export class GestionContactoComponent {
  
    contactos: Contacto[] = [];
  
    constructor(private dialog: MatDialog, private apiService: ApiService, private router: Router) {}

  chat(contacto: Contacto) {
    this.dialog.open(ChatComponent, {
      data: { contacto },
      width: '500px',
    });
  }

  resuelto(id: any) {
    this.apiService.resuelto(id).subscribe(
      (data) => {
        console.log('Contacto actualizado:', data);
        // Actualiza la lista de contactos después de marcar como resuelto
        this.getAllContactos();
      });
  }
  getAllContactos() {
    this.apiService.getContactos().subscribe(data => {
      if (data && data.contacto && Array.isArray(data.contacto)) {
        this.contactos = data.contacto.map((contacto: any) => ({
          id_contacto: contacto.id_contacto,
          nombre: contacto.nombre,
          apellido1: contacto.apellido1,
          apellido2: contacto.apellido2,
          correo: contacto.correo,
          telefono: contacto.telefono,
          asunto: contacto.asunto,
          mensaje: contacto.mensaje,
          resuelto: contacto.resuelto,
          fecha_contacto: contacto.fecha_contacto,
        }));
        //console.log('Contactos:', this.contactos);
      } else {
        console.error('Unexpected data format:', data);
      }
    });
  }
  ngOnInit() {
    this.getAllContactos();
  }

}
