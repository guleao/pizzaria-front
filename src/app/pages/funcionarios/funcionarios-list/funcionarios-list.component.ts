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


// import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { Observable, Subscription } from 'rxjs';
// import { Funcionario } from 'src/app/models/funcionario';
// import { Usuario } from 'src/app/models/usuario';
// import { FuncionarioService } from 'src/app/services/funcionario.service';
// import { LoginService } from 'src/app/services/login.service';
// import { UsuarioService } from 'src/app/services/usuario.service';

// @Component({
//   selector: 'app-funcionarios-list',
//   templateUrl: './funcionarios-list.component.html',
//   styleUrls: ['./funcionarios-list.component.scss']
// })
// export class FuncionariosListComponent {
//   lista: Funcionario[] = [];

//   funcionarioSelecionadaParaEdicao: Funcionario = new Funcionario();
//   indiceSelecionadoParaEdicao!: number;

//   @Input() modoLancamento: boolean = false;
//   @Output() retorno = new EventEmitter<Usuario>();


//   modalService = inject(NgbModal);
//   modalRef!: NgbModalRef;
//   funcionarioService = inject(UsuarioService);
//   loginService = new LoginService();

// //   listaObservable!: Observable<Usuario[]>;
// // listaSubscription!: Subscription;

//   constructor(private router: Router, private route: ActivatedRoute) {
//     this.listAll();
//   }


//   isAdmin = this.loginService.hasPermission('ADMIN');
//   isUser = this.loginService.hasPermission('USER');

//   listAll() {
//     this.funcionarioService.listAll().subscribe({
//       next: lista => {
//         this.lista = lista;
//       },
//       error: erro => {
//         alert('ERRO CABULOSO, VEJA O CONSOLE');
//         console.error(erro);
//       }
//     });
//   }

//   ngOnInit(): void {
//     this.listaObservable = this.funcionarioService.listAll();

//     this.listaSubscription = this.listaObservable.subscribe((usuarios: Usuario[]) => {
//       this.lista = usuarios.filter(usuario => usuario.role === 'ADMIN');
//     });

//   }
  
//   ngOnDestroy(): void {
//     if (this.listaSubscription) {
//       this.listaSubscription.unsubscribe();
//     }
//   }

//   adicionar() {
//     this.router.navigateByUrl('/cadastrarFuncionario')
//   }


//   addOuEditarFuncionario(funcionario: Funcionario) {
//     this.listAll();
//   }

//   lancamento(funcionario: Funcionario) {
//     this.retorno.emit(funcionario);
//   }


//   // editar(modal: any, produto: Funcionario, indice: number) {
//   //   this.funcionarioSelecionadaParaEdicao = Object.assign({}, produto);
//   //   this.indiceSelecionadoParaEdicao = indice;

//   //   this.modalRef = this.modalService.open(modal, { size: 'sm' });
//   // }

//   onEdit(funcionario: Funcionario) {
//     this.router.navigate(['edit', funcionario.id], { relativeTo: this.route })
//   }


//   deletar(id: number) {
//     this.funcionarioService.delete(id).subscribe({
//       next: retorno => {
//         this.listAll();
//       },
//       error: erro => {
//         alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
//         console.error(erro);
//       }
//     });
//   }


// }
