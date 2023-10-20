import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/login";


  constructor() { }

  save(login: Login): Observable<Login> {
    return this.http.post<Login>(this.API, login);
  }

  
}
