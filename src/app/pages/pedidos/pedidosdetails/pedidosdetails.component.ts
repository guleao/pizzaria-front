import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from 'src/app/models/funcionario';
import { Pedido } from 'src/app/models/pedido';
import { Pizza } from 'src/app/models/pizza';
import { Produto } from 'src/app/models/produto';
import { Sabores } from 'src/app/models/sabor';
import { Usuario } from 'src/app/models/usuario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { SaboresService } from 'src/app/services/sabor.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss']
})
export class PedidosdetailsComponent {
  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  pedidosService = inject(PedidosService);
  usuarioService = inject(UsuarioService);
  funcionarioService = inject(FuncionarioService);
  saboresService = inject(SaboresService);


  listaDeUsuarios: Usuario[] = [];
  listaDeFuncionarios: Funcionario[] = [];

  sabores: Sabores[] = [];
  listaDePizzas: Pizza = new Pizza();

  constructor() {
  }

  salvar() {
    const usuarioSelecionado = this.listaDeUsuarios.find(usuario => usuario.id === this.pedido.usuario.id);

    if (usuarioSelecionado) {
      this.pedido.usuario = usuarioSelecionado;
    }
    this.pedidosService.save(this.pedido).subscribe({
      next: pedido => {
        this.retorno.emit(pedido);
      },
      error: erro => {
        alert('ERRO CABULOSO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }

  ngOnInit() {
    this.usuarioService.listAll().subscribe((usuarios: Usuario[]) => {
      this.listaDeUsuarios = usuarios;
    });

    this.funcionarioService.listAll().subscribe((funcionarios: Funcionario[]) => {
      this.listaDeFuncionarios = funcionarios;
    });

    this.saboresService.listAll().subscribe((sabores: Sabores[]) => {
      this.sabores = sabores;
    });
  }

  excluir(produto: Produto, indice: number) {
    this.pedido.produtos.splice(indice, 1);
  }

  excluirPizza(pizza: Pizza, indice: number) {
    this.pedido.pizzas.splice(indice, 1);
  }

  retornoProdutosList(produto: Produto) {

    if (this.pedido.produtos == null)
      this.pedido.produtos = [];

    this.pedido.produtos.push(produto);
    this.modalRef.dismiss();
  }

  retornoPizzaList(pizza: Pizza) {

    if (this.pedido.pizzas == null)
      this.pedido.pizzas = [];

    this.pedido.pizzas.push(pizza);
    this.modalRef.dismiss();
  }


  lancar(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  lancarPizza(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  definirPagamentoDinheiro(valor: boolean) {
    this.pedido.pagamentoDinheiro = valor;
  }

}
