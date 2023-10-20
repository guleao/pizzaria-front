import { Component, inject } from '@angular/core';
import { Funcionario } from '../../../models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent {
  funcionario: Funcionario = new Funcionario();
  registerService = inject(FuncionarioService);

  constructor() {
  }

  save() {
    console.log('aaaaa');
    console.log(this.funcionario);
    this.registerService.save(this.funcionario).subscribe({
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
