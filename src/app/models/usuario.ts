import { Endereco } from "./endereco";

export class Usuario {

    id!: number;
    username!: string;
    telefone!: string;
    email!: string;
    senha!: string;
    enderecos: Endereco[] = [];
    role!: string;
    token!: string;
}
