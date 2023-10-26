import { Funcionario } from "./funcionario";
import { Pizza } from "./pizza";
import { Produto } from "./produto";
import { Usuario } from "./usuario";

export class Pedido {
    id!: number;
    obs!: string;
    produtos!: Produto[];
    usuario: Usuario = new Usuario;
    funcionario: Funcionario = new Funcionario;
    pedidoPreco!: number;
    // status!: Status
    delivery!: boolean;
    pizzas: Pizza[] = [];
   pagamentoCartao!: boolean;
    pagamentoDinheiro!: boolean;
    cancelado!: boolean;
    entrega!: boolean;

}
