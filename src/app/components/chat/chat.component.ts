import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [
    FormsModule, 
    CommonModule 
  ],
})
export class ChatComponent {
  contactoSeleccionado: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ChatComponent>
  ) {
    this.contactoSeleccionado = data.contacto;
  }

  enviarCorreo() {
    const email = this.contactoSeleccionado?.correo || 'example@example.com';
    const subject = encodeURIComponent('Asunto del correo');
    const body = encodeURIComponent('Escribe aquí el contenido del correo.');
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}&from=ayudatraveler@gmail.com`;
    window.open(mailtoLink, '_blank');
  }

  cerrarChat() {
    this.dialogRef.close();
  }
}