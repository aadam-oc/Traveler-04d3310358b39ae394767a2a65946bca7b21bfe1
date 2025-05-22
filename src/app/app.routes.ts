import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { HeroLoginComponent } from './components/hero-login/hero-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { DestinosComponent } from './components/destinos/destinos.component';
import { AlojamientosComponent } from './components/alojamientos/alojamientos.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { VehiculosAlquilerComponent } from './components/vehiculos-alquiler/vehiculos-alquiler.component';
import { ForoComponent } from './components/foro/foro.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './auth.guard';
import { PostBlogComponent } from './components/post-blog/post-blog.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { FaqComponent } from './components/faq/faq.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { EditarActividadesComponent } from './components/editar-actividades/editar-actividades.component';
import { GestionAlojamientosComponent } from './components/gestion-alojamientos/gestion-alojamientos.component';
import { GestionActividadesComponent } from './components/gestion-actividades/gestion-actividades.component';
import { GestionTiposActividadesComponent } from './components/gestion-tipos-actividades/gestion-tipos-actividades.component';
import { GestionDestinosComponent } from './components/gestion-destinos/gestion-destinos.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionRolesComponent } from './components/gestion-roles/gestion-roles.component';
import { EditarAlojamientoComponent } from './components/editar-alojamiento/editar-alojamiento.component';
import { GestionVehiculosAlquilerComponent } from './components/gestion-vehiculos-alquiler/gestion-vehiculos-alquiler.component';
import { FormularioReservaActividadComponent } from './components/formulario-reserva-actividad/formulario-reserva-actividad.component';
import { FormularioReservaComponent } from './components/formulario-reserva/formulario-reserva.component';
import { EditarTiposActividadesComponent } from './components/editar-tipos-actividades/editar-tipos-actividades.component';
import { EditarVehiculoComponent } from './components/editar-vehiculo/editar-vehiculo.component';
import { EditarRolesComponent } from './components/editar-roles/editar-roles.component';
import { EditarDestinosComponent } from './components/editar-destinos/editar-destinos.component';
import {FormularioReservaVehiculosComponent} from './components/formulario-reserva-vehiculos/formulario-reserva-vehiculos.component';
import { FormularioReservaVuelosComponent } from './components/formulario-reserva-vuelos/formulario-reserva-vuelos.component';

export const appRoutes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: HeroLoginComponent, data: { title: 'INICIO DE SESIÓN' } },
  { path: 'register', component: HeroComponent, data: { title: 'REGISTRO' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'DASHBOARD' }, canActivate: [AuthGuard] },
  { path: 'actividades', component: ActividadesComponent, data: { title: 'ACTIVIDADES' } },
  { path: 'destinos', component: DestinosComponent, data: { title: 'DESTINOS' } },
  { path: 'alojamientos', component: AlojamientosComponent, data: { title: 'ALOJAMIENTOS' } },
  { path: 'vuelos', component: VuelosComponent, data: { title: 'VUELOS' } },
  { path: 'vehiculos-alquiler', component: VehiculosAlquilerComponent, data: { title: 'VEHÍCULOS ALQUILER' } },
  { path: 'foro', component: ForoComponent, data: { title: 'FORO' } },
  { path: 'contacto', component: ContactoComponent, data: { title: 'CONTACTO' } },
  { path: 'perfil', component: PerfilComponent, data: { title: 'PERFIL' }, canActivate: [AuthGuard] },
  { path: 'post-blog', component: PostBlogComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent, data: { title: 'POLÍTICA DE PRIVACIDAD' } },
  { path: 'faq', component: FaqComponent, data: { title: 'FAQ' } },
  { path: 'editarUsuario', component: EditarUsuarioComponent, data: { title: 'EDITAR USUARIO' }, canActivate: [AuthGuard] },
  { path: 'editarActividad', component: EditarActividadesComponent, data: { title: 'EDITAR ACTIVIDADES' }, canActivate: [AuthGuard] },
  { path: 'gestionAlojamientos', component: GestionAlojamientosComponent, data: { title: 'GESTIÓN ALOJAMIENTOS' }, canActivate: [AuthGuard] },
  { path: 'gestionActividades', component: GestionActividadesComponent, data: { title: 'GESTIÓN ACTIVIDADES' }, canActivate: [AuthGuard] },
  { path: 'gestionTiposActividades', component: GestionTiposActividadesComponent, data: { title: 'GESTIÓN TIPOS ACTIVIDADES' }, canActivate: [AuthGuard] },
  { path: 'gestionDestinos', component: GestionDestinosComponent, data: { title: 'GESTIÓN DESTINOS' }, canActivate: [AuthGuard] },
  { path: 'gestionUsuarios', component: GestionUsuariosComponent, data: { title: 'GESTIÓN USUARIOS' }, canActivate: [AuthGuard] },
  { path: 'gestionRoles', component: GestionRolesComponent, data: { title: 'GESTIÓN ROLES' }, canActivate: [AuthGuard] },
  { path: 'editarAlojamiento/:id', component: EditarAlojamientoComponent, data: { title: 'EDITAR ALOJAMIENTO' }, canActivate: [AuthGuard] },
  { path: 'reserva', component: FormularioReservaComponent, data: { title: 'RESERVA ALOJAMIENTOS' }, canActivate: [AuthGuard] },
  { path: 'editarTiposActividades/:id', component: EditarTiposActividadesComponent, data: { title: 'EDITAR TIPO ACTIVIDAD' }, canActivate: [AuthGuard] },
  { path: 'editarVehiculo/:id', component: EditarVehiculoComponent, data: { title: 'EDITAR VEHÍCULO' }, canActivate: [AuthGuard] },
  { path: 'editarRol/:id', component: EditarRolesComponent, data: { title: 'EDITAR ROL' }, canActivate: [AuthGuard] },
  { path: 'editarDestinos/:id', component: EditarDestinosComponent, data: { title: 'EDITAR DESTINO' }, canActivate: [AuthGuard] },
  { path: 'reservaActividad/:id', component: FormularioReservaActividadComponent, data: { title: 'RESERVA ACTIVIDADES' }, canActivate: [AuthGuard] },
  { path: 'reservar-vehiculo/:id', component: FormularioReservaVehiculosComponent, data: { title: 'RESERVA VEHÍCULO' }, canActivate: [AuthGuard] },
  { path: 'reservar-vuelos/:id', component: FormularioReservaVuelosComponent, data: { title: 'RESERVA VUELOS' }, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];


