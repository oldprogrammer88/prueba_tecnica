import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from '../models/general-response';
import { Usuario } from '../models/usuarios';
import { AuthService } from './auth.service';

/**
 * Servicio para consultar la API de Usuarios
 */
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  /**
   * Endpoint de la API de usuarios
   */
  private usuariosEndPoint = "usuarios/";

  constructor(private httpCliente: HttpClient, private authService: AuthService) { }

  /**
   * Método para construir una URL para las operaciones
   * @param nameEndPoint Nombre del endpoint que se va a utilizar
   * @returns La URL construida con la base y el end point de usuarios
   */
  private construirURL(nameEndPoint: string) {
    return `${environment.apiUrl}${this.usuariosEndPoint}${nameEndPoint}`;
  }

  /**
   * Método para generar los headers necesarios para la solicitud, contiene al menos el token para la autorización
   * @returns Un objeto HttpHeaders con los cabeceros necesarios
   */
  private cargarHeader() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization",this.authService.getToken());
    return headers;
  }

  /**
   * Método para listar todos los usuarios a través del EndPoint de Usuarios
   * @returns Un Observable de la consulta a la API Web
   */
  listarUsuarios(): Observable<GeneralResponse<Usuario[]>> {
    let nameEndPoint = "listar";
    let urlConsulta = this.construirURL(nameEndPoint);
    return this.httpCliente.get<GeneralResponse<Usuario[]>>(urlConsulta, {
      headers: this.cargarHeader()
    });
  }

  /**
   * Método para agregar un usuario a través del EndPoint de Usuarios
   * @param usuario Usuario que se va agregar a base de datos
   * @returns Un Observable con el resultado de la operación
   */
  agregar(usuario: Usuario): Observable<GeneralResponse<boolean>> {
    let nameEndPoint = "agregar";
    let urlAgregar = this.construirURL(nameEndPoint);
    return this.httpCliente.post<GeneralResponse<boolean>>(urlAgregar, usuario, {
      headers: this.cargarHeader()
    });
  }

  /**
   * Método para modificar un usuario a través del EndPoint de Usuarios
   * @param usuario Usuario a modificar en la base de datos
   * @returns Un Observable con el resultado de la operación
   */
  modificar(usuario: Usuario): Observable<GeneralResponse<boolean>> {
    let nameEndPoint = "actualizar";
    let urlActualizar = this.construirURL(nameEndPoint);
    return this.httpCliente.put<GeneralResponse<boolean>>(urlActualizar, usuario, {
      headers: this.cargarHeader()
    });
  }

  /**
   * Método para borrar un usuario a través del EndPoint de Usuarios
   * @param usuarioId Id del Usuario a borrar en base de datos
   * @returns Un Observable con el resultado de la operación
   */
  borrar(usuarioId: number): Observable<GeneralResponse<boolean>> {
    let nameEndPoint = `borrar/${usuarioId}`;
    let urlEliminar = this.construirURL(nameEndPoint);
    return this.httpCliente.delete<GeneralResponse<boolean>>(urlEliminar, {
      headers: this.cargarHeader()
    });
  }
}
