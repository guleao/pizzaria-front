import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { Sabores } from '../models/sabor';

@Injectable({
  providedIn: 'root'
})
export class SaboresService {

  API: string = 'http://localhost:8080/api/sabores';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Sabores[]> {
    return this.http.get<Sabores[]>(this.API);
  }

  save(sabores: Sabores): Observable<Sabores> {
    if(sabores.id){
      return this.update(sabores);
    }
    return this.http.post<Sabores>(this.API, sabores);
  }

  update (sabores: Sabores): Observable <Sabores>{
    return this.http.put<Sabores>(`${this.API}/${sabores.id}`, sabores);
  }

  delete(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id.toString())
    return this.http.delete<any>(this.API, { params: params });
  }

  exemploErro(): Observable<Sabores[]> {
    return this.http.get<Sabores[]>(this.API + '/erro');
  }
}