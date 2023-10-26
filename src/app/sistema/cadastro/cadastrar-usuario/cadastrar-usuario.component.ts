import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/models/endereco';
import { Usuario } from 'src/app/models/usuario';
import { ViaCep } from 'src/app/models/via-cep';
import { EnderecoService } from 'src/app/services/endereco.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {
  usuario: Usuario = new Usuario();
  viaCep: ViaCep = new ViaCep();

  cepBusca: string = '';
  senhaVisivel: boolean = false;
  usuarioParaEditar!: Usuario;

  @Output() edit = new EventEmitter();


  registerUserService = inject(UsuarioService);

  endereco: Endereco = new Endereco();
  enderecoService = inject(EnderecoService);


  constructor(private route: ActivatedRoute) {


  }

  buscarCep() {
    this.viaCep.getCepData(this.cepBusca).subscribe((data: any) => {

      let endereco = new Endereco();
      endereco.rua = data.logradouro;
      endereco.bairro = data.bairro;
      endereco.cep = this.cepBusca;
      endereco.id;

      if (this.usuario.enderecos == null)
        this.usuario.enderecos = [];

      this.usuario.enderecos.push(endereco);
    });
  }

  save() {
    if (this.usuario.id > 0) {
      this.registerUserService.update(this.usuario).subscribe({
        next: retorno => {
          console.log(retorno);
          alert("Atualizado com sucesso");
        },
        error: erro => {
          console.log(erro);
          alert('ERRO CABULOSO, VEJA O CONSOLE');
        }
      });
    } else {
      this.registerUserService.save(this.usuario).subscribe({
        next: retorno => {
          console.log(retorno);
          alert("Registrado com sucesso");
        },
        error: erro => {
          console.log(erro);
          if (!this.usuario.nomeUsuario || this.usuario.nomeUsuario) {
            alert('Nome inválido')
          } else if (this.usuario.telefone.length > 12 || !this.usuario.telefone) {
            alert('Telefone inválido')
          } else {
            alert('ERRO CABULOSO VEJA O CONSOLE')
          }
        }
      });
    }
  }


  ngOnInit(): void {
    const usuario: Usuario = this.route.snapshot.data['usuario'];
    this.usuario.id = usuario.id;
    this.usuario.nomeUsuario = usuario.nomeUsuario;
    this.usuario.email = usuario.email;
    this.usuario.senha = usuario.senha;
    this.usuario.telefone = usuario.telefone;
    this.usuario.enderecos = usuario.enderecos;
    console.log(usuario);
  }


  deletarEndereco(id: number) {
    this.enderecoService.delete(id).subscribe({
      error: erro => {
        alert('ERRO CABULOSO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }

  mostrarSenha(): void {
    this.senhaVisivel = !this.senhaVisivel;
  }
}
