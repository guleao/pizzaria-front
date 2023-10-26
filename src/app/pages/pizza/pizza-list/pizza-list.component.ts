import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent {
  lista: Pizza[] = [];

  @Output() retorno = new EventEmitter<Pizza>();
  @Input() modoLancamento: boolean = false;


  objetoSelecionadoParaEdicao: Pizza = new Pizza();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  pizzaService = inject(PizzaService);

  constructor() {
    // this.listAll();
  }


  // listAll() {

  //   this.pizzaService.listAll().subscribe({
  //     next: lista => {
  //       this.lista = lista;
  //     },
  //     error: erro => {
  //       alert('ERRO CABULOSO VEJA O CONSOLE');
  //       console.error(erro);
  //     }
  //   });

  // }



  
}
