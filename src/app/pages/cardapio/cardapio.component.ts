import { Component, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sabores } from 'src/app/models/sabor';
import { SaboresService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent {

  openModal() {
    const modelDiv = document.getElementById('myModal')
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modelDiv = document.getElementById('myModal')
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  lista: Sabores[] = [];


  objetoSelecionadoParaEdicao: Sabores = new Sabores();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  saboresService = inject(SaboresService);

  constructor() {

    this.listAll();
    //this.exemploErro();

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

    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  editar(modal: any, sabores: Sabores, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, sabores);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  addOuEditarSabor(sabores: Sabores) {

    this.listAll();

    this.modalService.dismissAll();

  }
}
