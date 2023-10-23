import { HttpClient, HttpParams } from '@angular/common/http';
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
    if (usuario.id !== undefined && usuario.id > 0) {
      return this.update(usuario);
    }
    return this.http.post<Usuario>(this.API, usuario);
  }

  update(usuario: Partial<Usuario>) {
    return this.http.put<Usuario>(`${this.API}/${usuario.id}`, usuario);
  }

  delete(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id.toString())
    return this.http.delete<any>(this.API, { params: params });
  }

  listAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  loadById(id: number) {
    return this.http.get<Usuario>(`${this.API}/${id}`);
  }
}
