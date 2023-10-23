import { Endereco } from "./endereco";

export class Usuario {

    id!: number;
    nomeUsuario!: string;
    telefone!: string;
    email!: string;
    senha!: string;
    enderecos: Endereco[] = [];
}
