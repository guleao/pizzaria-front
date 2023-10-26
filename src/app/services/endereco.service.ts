import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Endereco } from '../models/endereco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/endereco";


  constructor() { }

  update(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.API}/${endereco.id}`, endereco);
  }

  delete(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id.toString())
    return this.http.delete<any>(this.API, { params: params });
  }
}
