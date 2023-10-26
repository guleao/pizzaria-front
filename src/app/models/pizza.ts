import { Sabores } from "./sabor";
import { Tamanho } from "./tamanho";

export class Pizza {
    id!: number;
    sabores: Sabores[] = [];
    precoPizza!: number;
    quantPizza!: number;
    tamanho!: Tamanho;
}
