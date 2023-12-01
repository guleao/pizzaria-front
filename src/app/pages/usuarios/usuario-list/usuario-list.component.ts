import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuario';
import { EnderecoService } from 'src/app/services/endereco.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent {
  lista: Usuario[] = [];

  usuarioSelecionadaParaEdicao: Usuario = new Usuario();
  indiceSelecionadoParaEdicao!: number;

  @Input() modoLancamento: boolean = false;
  @Output() retorno = new EventEmitter<Usuario>();
  @Output() edit = new EventEmitter();


  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  usuarioService = inject(UsuarioService);
  enderecoService = inject(EnderecoService);


  constructor(private router: Router, private route: ActivatedRoute) {
    this.listAll();
  }


  listAll() {
    this.usuarioService.listAll().subscribe({
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
    this.router.navigateByUrl('/cadastrarUsuario')
  }


  addOuEditarUsuario(usuario: Usuario) {
    this.listAll();
  }

  lancamento(usuario: Usuario) {
    this.retorno.emit(usuario);
  }


  // editar(modal: any, usuario: Usuario, indice: number) {
  //   this.usuarioSelecionadaParaEdicao = Object.assign({}, usuario);
  //   this.indiceSelecionadoParaEdicao = indice;


  //   this.router.navigateByUrl('/cadastrarUsuario');
  //   // this.modalRef = this.modalService.open(modal, { size: 'sm' });
  // }

  onEdit(usuario: Usuario) {
    this.router.navigate(['edit', usuario.id], { relativeTo: this.route })
  }


  deletar(id: number) {
    this.usuarioService.delete(id).subscribe({
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
