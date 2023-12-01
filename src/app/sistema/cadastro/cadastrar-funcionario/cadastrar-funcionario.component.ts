import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Funcionario } from '../../../models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent {

  funcionario: Funcionario = new Funcionario();
  // registerService = inject(FuncionarioService);
  @Output() edit = new EventEmitter();

  
  senhaVisivel: boolean = false;

  constructor(private route: ActivatedRoute, private registerService:FuncionarioService) {
  }


  // save() {
  //   console.log('aaaaa');
  //   console.log(this.funcionario);
  //   this.registerService.save(this.funcionario).subscribe({
  //     next: retorno => {
  //       console.log(retorno);
  //       alert("Registrado com sucesso");
  //     },
  //     error: erro => {
  //       console.log(erro);
  //       alert('tratamento de erro'); ''
  //     }
  //   });
  // }

  save() {
    if (this.funcionario.id > 0) {
      this.registerService.update(this.funcionario).subscribe({
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
      this.registerService.save(this.funcionario).subscribe({
        next: retorno => {
          console.log(retorno);
          alert("Registrado com sucesso");
        },
        error: erro => {
          console.log(erro);
          if (!this.funcionario.nomeFuncionario || this.funcionario.nomeFuncionario) {
            alert('Nome inválido')
          } else {
            alert('ERRO CABULOSO VEJA O CONSOLE')
          }
        }
      });
    }
  }


  // ngOnInit(): void {
  //   this.funcionario = new Funcionario();
  //   const funcionario: Funcionario = this.route.snapshot.data['funcionario'];
  //   this.funcionario.id = funcionario.id;
  //   this.funcionario.nomeFuncionario = funcionario.nomeFuncionario;
  //   this.funcionario.email = funcionario.email;
  //   this.funcionario.senha = funcionario.senha;
  
  //   console.log(funcionario);
  // }

 
  mostrarSenha(): void {
    this.senhaVisivel = !this.senhaVisivel;
  }

}
