import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pizza } from 'src/app/models/pizza';
import { Sabores } from 'src/app/models/sabor';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.scss']
})
export class PizzaDetailsComponent {

  @Input() pizza: Pizza = new Pizza();
  @Output() retorno = new EventEmitter<Pizza>();


  sabores: Sabores[] = [];


  lista: Pizza[] = [];

  //@Output() retornoPizzas = new EventEmitter<Pizza>();
  @Input() modoLancamento: boolean = false;


  objetoSelecionadoParaEdicao: Pizza = new Pizza();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  pizzaService = inject(PizzaService);

  constructor() {
    this.pizzaService.getSaboresPizza().subscribe(sabores => {
      this.sabores = sabores;
    })
  }


  salvar() {
    if (this.pizza.id > 0) {
      this.pizzaService.update(this.pizza).subscribe({
        next: pizza => {
          this.retorno.emit(pizza);
        },
        error: erro => {
          alert('ERRO CABULOSO VEJA O CONSOLE');
          console.error(erro);
        }
      });
    } else {
      this.pizzaService.save(this.pizza).subscribe({
        next: pizza => {
          console.log(pizza);
          this.retorno.emit(pizza);

        },
        error: erro => {
          alert('ERRO CABULOSO VEJA O CONSOLE');
          console.error(erro);
        }
      });
    }
  }

  // MÉTODOS DA MODAL

  adicionar(modal: any) {
    this.objetoSelecionadoParaEdicao = new Pizza();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, pizza: Pizza, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, pizza);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'sm' });
  }

  addOuEditarPizza(pizza: Pizza) {

    this.modalService.dismissAll();
  }


  lancamento(pizza: Pizza) {
    this.retorno.emit(pizza);
  }


  deletar(id: number) {
    this.pizzaService.delete(id).subscribe({
      next: retorno => {
      },
      error: erro => {
        alert('ERRO CABULOSO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }


}
