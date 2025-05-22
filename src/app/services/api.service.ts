import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Item } from '../models/item.model'; // Importa la interfaz


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private apiImagenesUrl = environment.apiImagenesUrl;

  constructor(private http: HttpClient) { }

  //Subida de imagenes
  subirImagen(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ imageUrl: string }>(`${this.apiImagenesUrl}`, formData);
  }

  // Subida de imagen para actividades
  subirRutaImagenActividades(imageUrl: string, id_actividad: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      nombre_imagen_actividad: imageUrl,
      id_actividad: id_actividad
    };
    // Cambia la URL al endpoint correcto de imágenes de actividades
    return this.http.post(`${this.apiUrl}/traveler/imagenes_actividades`, body, { headers });
  }

  // Subida de imagen para alojamientos
  subirRutaImagenAlojamientos(imageUrl: string, id_alojamiento: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      nombre_imagen_alojamiento: imageUrl,
      id_alojamiento: id_alojamiento
    };
    console.log('Cuerpo de la solicitud:', body);
    // Cambia la URL al endpoint correcto de imágenes de alojamientos
    return this.http.post(`${this.apiUrl}/traveler/imagenes_alojamientos`, body, { headers });
  }
  //Autorizacion
  //register
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/traveler/register`, user);
  }

  //login
  loginUser(data: any): Observable<any> {
    return this.http.post('http://172.17.22.103:3000/traveler/login', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }




  //actividades
  getActividades(): Observable<any> {
    const actividades = this.http.get(`${this.apiUrl}/traveler/actividades`);
    return actividades;
  }

  //actividad por id
  getActividadById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/actividades/${id}`);
  }

  //crear actividad
  postActividad(actividad: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post(`${this.apiUrl}/traveler/actividades`, actividad, { headers });
  }

  //actualizar actividad
  putActividad(id: number, actividad: Item): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);

    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/actividades/${id}`, actividad, { headers });
  }

  //eliminar actividad
  deleteActividad(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/traveler/actividades/${id}`, { headers });
  }

  //actividades completo
  getActividadesJoin(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/actividades_completo`);
  }

  //actividad completa sin imagen
  getActividadCompleta(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/actividades_completo_sin_imagenes`);
  }

  //actividades completo
  getActividadesJoinById(id_actividad: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/actividades_completo/${id_actividad}`);
  }

  putActividadCompleta(id_actividad: number, actividad: any): Observable<any> {

    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/actividades_completo/${id_actividad}`, actividad, { headers });
  }






  //tipos_actividades
  getTiposActividades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/tipo_actividad`);
  }

  //tipo_actividad por id
  getTipoActividadById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/tipo_actividad/${id}`);
  }

  //crear tipo_actividad
  postTipoActividad(nombre_tipo_actividad: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}/traveler/tipo_actividad`, nombre_tipo_actividad, { headers });
  }

  //actualizar tipo_actividad
  putTipoActividad(id: number, tipo_actividad: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/tipo_actividad/${id}`, tipo_actividad, { headers });
  }

  //eliminar tipo_actividad
  deleteTipoActividad(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/traveler/tipo_actividad/${id}`, { headers });
  }





  //destinos
  getDestinos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/destinos`);
  }

  //destinos por id
  getDestinoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/destinos/${id}`);
  }

  //crear destino
  postDestino(destino: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}/traveler/destinos`, destino, { headers });
  }

  //actualizar destino
  putDestino(id: number, destino: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/destinos/${id}`, destino, { headers });
  }

  //eliminar destino
  deleteDestino(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/traveler/destinos/${id}`, { headers });
  }




  //alojamientos
  getAlojamientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/alojamientos`);
  }

  //alojamientos completos
  getAlojamientosCompletos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/alojamientos_completo`);
  }

  getAlojamientoJoinById(id_alojamiento: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/alojamientos_completo/${id_alojamiento}`);
  }

  //alojamiento por id
  getAlojamientoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/alojamientos/${id}`);
  }

  //crear alojamiento
  postAlojamiento(alojamiento: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post(`${this.apiUrl}/traveler/alojamientos`, alojamiento, { headers });
  }

  //actualizar alojamiento
  putAlojamiento(id: number, alojamiento: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/alojamientos/${id}`, alojamiento, { headers });
  }

  putAlojamientoCompleto(id: number, alojamiento: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/alojamientos_completo/${id}`, alojamiento, { headers });
  }

  //eliminar alojamiento
  deleteAlojamiento(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/traveler/alojamientos/${id}`, { headers });
  }








  //usuarios
  getUsuarios(): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/usuarios`, { headers });
  }


  //usuarios completos
  getUsuariosCompletos(): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/usuarios_full`, { headers });
  }

  getUsuariosCompletosById(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/usuarios_full/${id}`, { headers });
  }

  //usuario por id
  getUsuarioById(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/usuarios/${id}`, { headers });
  }

  //crear usuario
  postUsuario(usuario: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}/traveler/usuarios`, usuario, { headers });
  }

  postUsuarioCompleto(usuario: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}/traveler/usuarios_full`, usuario, { headers });
  }

  //actualizar usuario
  putUsuario(id: number, usuario: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/usuarios/${id}`, usuario, { headers });
  }

  //actualizar usuario completo
  putUsuarioCompleto(id: number, usuario: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/usuarios_full/${id}`, usuario, { headers });
  }

  //eliminar usuario
  deleteUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/traveler/usuarios/${id}`, { headers });
  }









  //caracterisitcas_usuarios
  getCaracterisitcasUsuarios(): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/caracteristicas_usuarios`, { headers });
  }

  //caracterisitca_usuario por id
  getCaracterisitcaUsuarioById(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/caracteristicas_usuarios/${id}`, { headers });
  }

  //crear caracterisitca_usuario
  postCaracterisitcaUsuario(caracterisitca_usuario: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}/traveler/caracteristicas_usuarios`, caracterisitca_usuario, { headers });
  }

  //actualizar caracterisitca_usuario
  putCaracterisitcaUsuario(id: number, caracterisitca_usuario: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/caracteristicas_usuarios/${id}`, caracterisitca_usuario, { headers });
  }

  //eliminar caracterisitca_usuario
  deleteCaracterisitcaUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/traveler/caracteristicas_usuarios/${id}`, { headers });
  }








  //roles
  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/roles`);
  }

  //rol por id
  getRolById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/roles/${id}`);
  }

  //crear rol
  postRol(rol: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}/traveler/roles`, rol, { headers });
  }

  //actualizar rol
  putRol(id: number, rol: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/roles/${id}`, rol, { headers });
  }

  deleteRol(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete(`${this.apiUrl}/traveler/roles/${id}`, { headers });
  }









  //contacto

  getContactos(): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/contacto/contacto`, { headers });
  }

  postContacto(contacto: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/contacto/contacto`, contacto);
  }

  resuelto(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/contacto/contacto/resuelto/${id}`, {}, { headers });
  }


  //imagenes alojamientos
  getImagenesAlojamientos(id_alojamiento: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/traveler/imagenes_alojamientos/alojamiento/${id_alojamiento}`);
  }

  //Chat
  getChat(id_contacto: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/chat/${id_contacto}`, { headers });
  }

  postChat(mensaje: { id_usuario1: number; id_usuario2: number; mensaje: string }): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}/traveler/chat`, mensaje, { headers });
  }


  //Imagenes de usuario
  getImagenUsuario(id_usuario: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('TOKEN ENVIADO:', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/imagenes_usuarios/${id_usuario}`, { headers });
  }

  //Reserva Alojamientos
  postReserva(reserva: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Si necesitas autenticación
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    return this.http.post(`${this.apiUrl}/traveler/reservas_alojamientos`, reserva, { headers });
  }

  // Reserva Actividades  
  postReservaActividad(reserva: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    return this.http.post(`${this.apiUrl}/traveler/reservas_actividades`, reserva, { headers });
  }

  // Reservas de Alojamiento por usuario
  getReservasAlojamientoUsuario(id_usuario: number) {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/traveler/reservas_alojamientos/usuario/${id_usuario}`, { headers });
  }

  // Reservas de Actividades por usuario
  getReservasActividadesUsuario(id_usuario: number) {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/traveler/reservas_actividades/usuario/${id_usuario}`, { headers });
  }

  // Reservas de Vehículos por usuario
  getReservasVehiculosUsuario(id_usuario: number) {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/traveler/reservas_vehiculos/usuario/${id_usuario}`, { headers });
  }

  // Reservas de Vuelos por usuario
  getReservasVuelosUsuario(id_usuario: number) {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/traveler/reservas_vuelos/usuario/${id_usuario}`, { headers });
  }

  subirRutaImagenUsuario(imageUrl: string, id_usuario: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      nombre_imagen_usuario: imageUrl,
      id_usuario: id_usuario
    };
    console.log('Cuerpo de la solicitud:', body);
    // Cambia la URL al endpoint correcto de imágenes de usuarios
    return this.http.post(`${this.apiUrl}/traveler/imagenes_usuarios`, body, { headers });

  }

  getImagenesUsuarios(id_usuario: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.apiUrl}/traveler/imagenes_usuarios/${id_usuario}`, { headers });
  }

  putImagenUsuario(id_usuario: number, imagen: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.apiUrl}/traveler/imagenes_usuarios/${id_usuario}`, imagen, { headers });
  }

  postReservaVehiculo(reserva: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}/traveler/reservas_vehiculos`, reserva, { headers });
  }

  postReservaVuelo(reserva: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}/traveler/reservas_vuelos`, reserva, { headers });
  }
}

