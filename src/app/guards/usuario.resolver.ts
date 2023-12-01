import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolver implements Resolve<Usuario> {

  usuario: Usuario = new Usuario();

  constructor(private service: UsuarioService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    if (route.params && route.params['id']) {

      return this.service.loadById(route.params['id'])
    }
    return of({ id: 0, username: '', telefone: '', email: '', senha: '', enderecos: [], role: '', token: '' });
  }
}

