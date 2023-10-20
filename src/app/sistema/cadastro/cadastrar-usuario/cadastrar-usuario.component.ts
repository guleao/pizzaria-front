import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { Usuario } from 'src/app/models/usuario';
import { ViaCep } from 'src/app/models/via-cep';
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

  registerUserService = inject(UsuarioService);

  constructor() {
  }

  buscarCep() {
    this.viaCep.getCepData(this.cepBusca).subscribe((data: any) => {

      let endereco = new Endereco();
      endereco.rua = data.logradouro;
      endereco.bairro = data.bairro;
      endereco.cep = this.cepBusca;

      if (this.usuario.enderecos == null)
        this.usuario.enderecos = [];

      this.usuario.enderecos.push(endereco);

      // Preencha os campos do endereço com os dados obtidos
    });
  }


  save() {
    console.log('aaaaa');
    console.log(this.usuario);
    this.registerUserService.save(this.usuario).subscribe({
      next: retorno => {
        console.log(retorno);
        alert("Registrado com sucesso");
      },
      error: erro => {
        console.log(erro);
        alert('tratamento de erro'); ''
      }
    });

  }
}
