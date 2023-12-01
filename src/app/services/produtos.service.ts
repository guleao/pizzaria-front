import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  API: string = 'http://localhost:8080/api/produto';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  save(produto: Produto): Observable<Produto> {
    if(produto.id){
      return this.update(produto);
    }
    return this.http.post<Produto>(this.API, produto);
  }

  update (produto: Produto): Observable <Produto>{
    return this.http.put<Produto>(`${this.API}/${produto.id}`, produto);
  }

  delete(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id.toString())
    return this.http.delete<any>(this.API, { params: params });
  }

  exemploErro(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API + '/erro');
  }
}