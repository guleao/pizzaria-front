import { HttpClient, HttpParams } from '@angular/common/http';
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

  // update(funcionario: Funcionario): Observable<Funcionario> {
  //   return this.http.put<Funcionario>(`${this.API}/${funcionario.id}`, funcionario);
  // }

  update(funcionario: Partial<Funcionario>) {
    return this.http.put<Funcionario>(`${this.API}/${funcionario.id}`, funcionario);
  }


  delete(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id.toString())
    return this.http.delete<any>(this.API, { params: params });
  }

  listAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.API);
  }

  loadById(id: number) {
    return this.http.get<Funcionario>(`${this.API}/${id}`);
  }



}

