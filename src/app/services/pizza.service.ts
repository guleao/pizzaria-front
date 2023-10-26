import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Sabores } from '../models/sabor';
import { SaboresService } from './sabor.service';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  
  API = 'http://localhost:8080/api/pizza'
  http = inject (HttpClient);

  constructor(private saboresService: SaboresService) { }

  getSaboresPizza (): Observable <Sabores[]>{
    return this.saboresService.listAll();
  }

  save(pizza: Pizza): Observable<Pizza> {
    if(pizza.id){
      return this.update(pizza);
    }
    return this.http.post<Pizza>(this.API, pizza);
  }

  update (pizza: Pizza): Observable <Pizza>{
    return this.http.put<Pizza>(`${this.API}/${pizza.id}`, pizza);
  }

  delete(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id.toString())
    return this.http.delete<any>(this.API, { params: params });
  }
}
