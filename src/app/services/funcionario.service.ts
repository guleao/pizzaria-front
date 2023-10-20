import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Funcionario } from '../models/funcionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/funcionario";

  constructor() { }

  save(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.API, funcionario);
  }
}

