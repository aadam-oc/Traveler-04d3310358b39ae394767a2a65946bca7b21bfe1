
export interface Vuelos {
  id_vuelo: number; // ID del vuelo
  id_origen?: number; // Opcional si no lo necesitas en el frontend
  id_destino?: number; // Opcional si no lo necesitas en el frontend
  origen_pais: string; // País de origen
  origen_ciudad: string; // Ciudad de origen
  destino_pais: string; // País de destino
  destino_ciudad: string; // Ciudad de destino
  dia: string; // Fecha del vuelo en formato YYYY-MM-DD
  hora: string; // Hora del vuelo en formato HH:mm:ss
  imagen_url?: string; // URL de la imagen del vuelo (opcional)
  
}