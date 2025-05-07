import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'app-contacto',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  contactData: Contacto []= [];
  contactoForm: FormGroup;
  submitted = false;

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    const contactData: Contacto = {
      nombre: this.contactoForm.value.nombre,
      apellido1: this.contactoForm.value.apellido1,
      apellido2: this.contactoForm.value.apellido2,
      correo: this.contactoForm.value.correo,
      telefono: this.contactoForm.value.telefono,
      asunto: this.contactoForm.value.asunto,
      mensaje: this.contactoForm.value.mensaje
    };

    this.apiService.postContacto(contactData).subscribe(
      response => {
        console.log('Contacto enviado:', response);
        this.contactoForm.reset(); 
      }
    );
  }
}
