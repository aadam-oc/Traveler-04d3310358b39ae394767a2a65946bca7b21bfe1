import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isActive: boolean;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  imports: [ CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqSections: FaqSection[] = [];

  ngOnInit(): void {
    this.initializeFaqData();
  }

  toggleFaqItem(item: FaqItem): void {
    // Opción 1: Solo abre/cierra el elemento clickeado
    item.isActive = !item.isActive;

    // Opción 2 (comentada): Cierra otros elementos cuando uno se abre
    // this.faqSections.forEach(section => {
    //   section.items.forEach(faqItem => {
    //     if (faqItem !== item) {
    //       faqItem.isActive = false;
    //     }
    //   });
    // });
  }

  private initializeFaqData(): void {
    this.faqSections = [
      {
        title: 'Reservas',
        items: [
          {
            question: '¿Cómo puedo hacer una reserva?',
            answer: 'Puedes realizar una reserva directamente en nuestro sitio web seleccionando tu vuelo, alojamiento, actividad o alquiler de vehículo y completando el proceso de pago.',
            isActive: false
          },
          {
            question: '¿Puedo modificar o cancelar mi reserva?',
            answer: 'Sí, puedes modificar o cancelar tu reserva dentro del plazo permitido. Consulta las políticas de cancelación en la confirmación de tu reserva.',
            isActive: false
          }
        ]
      },
      {
        title: 'Pagos',
        items: [
          {
            question: '¿Qué métodos de pago aceptan?',
            answer: 'Aceptamos tarjetas de crédito y débito, PayPal y transferencias bancarias en algunos casos.',
            isActive: false
          },
          {
            question: '¿Los precios incluyen impuestos y tasas?',
            answer: 'Sí, todos los precios incluyen impuestos y tasas obligatorias, salvo que se indique lo contrario.',
            isActive: false
          }
        ]
      },
      {
        title: 'Confirmación y Documentación',
        items: [
          {
            question: '¿Cómo recibiré mi confirmación de reserva?',
            answer: 'Recibirás un correo electrónico con los detalles de tu reserva una vez que el pago haya sido procesado correctamente.',
            isActive: false
          },
          {
            question: '¿Necesito imprimir mi confirmación?',
            answer: 'No es necesario, puedes mostrar la confirmación en tu dispositivo móvil al momento del check-in o la actividad.',
            isActive: false
          }
        ]
      },
      {
        title: 'Seguridad y Privacidad',
        items: [
          {
            question: '¿Es seguro reservar en su sitio web?',
            answer: 'Sí, utilizamos protocolos de seguridad avanzados para proteger tu información y garantizar transacciones seguras.',
            isActive: false
          },
          {
            question: '¿Qué hacen con mis datos personales?',
            answer: 'Utilizamos tus datos únicamente para procesar tu reserva y cumplir con nuestras políticas de privacidad. No compartimos información sin tu consentimiento.',
            isActive: false
          }
        ]
      },
      {
        title: 'Atención al Cliente',
        items: [
          {
            question: '¿Cómo puedo contactar con el servicio de atención al cliente?',
            answer: 'Puedes contactarnos a través de nuestro correo electrónico support@traveler.com o llamarnos al +34 900 123 456.',
            isActive: false
          },
          {
            question: '¿Tienen servicio de asistencia 24/7?',
            answer: 'Sí, nuestro equipo de soporte está disponible las 24 horas del día para atender cualquier consulta o emergencia relacionada con tu reserva.',
            isActive: false
          }
        ]
      }
    ];
  }
}
