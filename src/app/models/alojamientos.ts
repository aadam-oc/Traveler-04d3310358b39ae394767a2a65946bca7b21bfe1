import { ImagenesAlojamientos } from "./imagenes-alojamientos";

export interface Alojamientos {
    id_alojamiento: number;
    nombre_alojamiento: string;
    id_destino: number;
    ciudad: string;
    pais: string;
    precio_dia: number;
    descripcion: string;
    id_usuario: number;
    correo: string;
    max_personas: number;
    direccion: string;
    imagenes: ImagenesAlojamientos[]; 
    hora_entrada: string;
    hora_salida: string;
}
