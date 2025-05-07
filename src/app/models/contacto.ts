export interface Contacto {
    id_contacto?: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    correo: string;
    telefono: string;
    asunto: string;
    mensaje: string;
    resuelto?: boolean;
    fecha_contacto?: string; 
}
