import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sabores } from 'src/app/models/sabor';
import { SaboresService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-sabores-list',
  templateUrl: './sabores-list.component.html',
  styleUrls: ['./sabores-list.component.scss']
})
export class SaboresListComponent {
  lista: Sabores[] = [];

  @Output() retorno = new EventEmitter<Sabores>();
  @Input() modoLancamento: boolean = false;


  objetoSelecionadoParaEdicao: Sabores = new Sabores();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  saboresService = inject(SaboresService);

  constructor() {
    this.listAll();
  }


  listAll() {
    this.saboresService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }

  exemploErro() {

    this.saboresService.exemploErro().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }



  // MÉTODOS DA MODAL

  adicionar(modal: any) {
    this.objetoSelecionadoParaEdicao = new Sabores();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, sabor: Sabores, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, sabor);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'sm' });
  }

  addOuEditarSabor(sabor: Sabores) {

    this.listAll();

    this.modalService.dismissAll();
  }


  lancamento(sabor: Sabores){
    this.retorno.emit(sabor);
  }


  deletar(id:number) {
    this.saboresService.delete(id).subscribe({
      next: retorno => {
        this.listAll();
      },
      error: erro => { 
        alert('ERRO CABULOSO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }
}
