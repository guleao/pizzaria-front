import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { FuncionarioService } from '../services/funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioResolver implements Resolve<Funcionario> {

  funcionario: Funcionario = new Funcionario();

  constructor(private service: FuncionarioService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Funcionario> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: 0, nomeFuncionario: '', email: '', senha: '' });
  }
}

