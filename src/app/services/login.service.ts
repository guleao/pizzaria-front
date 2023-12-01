import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 
  constructor() { }

  // save(login: Login): Observable<Login> {
  //   return this.http.post<Login>(this.API, login);
  // }

  API: string = 'http://localhost:8080/api/usuario';
  http = inject(HttpClient);


  logar(login: Login): Observable<Usuario> {
    return this.http.post<Usuario>(this.API + '/logar', login);
  }

  deslogar(): Observable<any> {
    return this.http.get<any>(this.API + '/deslogar');
  }



  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }


  // jwtDecode() {
  //   let token = this.getToken();
  //   if (token) {
  //     return jwtDecode<JwtPayload>(token);
  //   }
  //   return "";
  // }

  hasPermission(roleToCheck:any) {
    const userToken = this.getToken();

    if (userToken) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(userToken) as Usuario;
        if (decodedToken && decodedToken.role.includes(roleToCheck)) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return false;
      }
    } else {
      console.error('Token de usuário não encontrado');
      return false;
    }
  }

  
}
