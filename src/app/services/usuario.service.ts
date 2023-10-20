import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/usuario";

  constructor() { }


  save(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }
}
