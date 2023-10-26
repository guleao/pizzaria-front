import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionarios-list',
  templateUrl: './funcionarios-list.component.html',
  styleUrls: ['./funcionarios-list.component.scss']
})
export class FuncionariosListComponent {
  lista: Funcionario[] = [];

  funcionarioSelecionadaParaEdicao: Funcionario = new Funcionario();
  indiceSelecionadoParaEdicao!: number;

  @Input() modoLancamento: boolean = false;
  @Output() retorno = new EventEmitter<Funcionario>();


  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  funcionarioService = inject(FuncionarioService);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.listAll();
  }


  listAll() {
    this.funcionarioService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }

  adicionar() {
    this.router.navigateByUrl('/cadastrarFuncionario')
  }


  addOuEditarFuncionario(funcionario: Funcionario) {
    this.listAll();
  }

  lancamento(funcionario: Funcionario) {
    this.retorno.emit(funcionario);
  }


  // editar(modal: any, produto: Funcionario, indice: number) {
  //   this.funcionarioSelecionadaParaEdicao = Object.assign({}, produto);
  //   this.indiceSelecionadoParaEdicao = indice;

  //   this.modalRef = this.modalService.open(modal, { size: 'sm' });
  // }

  onEdit(funcionario: Funcionario) {
    this.router.navigate(['edit', funcionario.id], { relativeTo: this.route })
  }


  deletar(id: number) {
    this.funcionarioService.delete(id).subscribe({
      next: retorno => {
        this.listAll();
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}
