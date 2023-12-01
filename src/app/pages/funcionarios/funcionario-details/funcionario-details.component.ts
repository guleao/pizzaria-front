import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario';
import { Usuario } from 'src/app/models/usuario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-funcionario-details',
  templateUrl: './funcionario-details.component.html',
  styleUrls: ['./funcionario-details.component.scss']
})
export class FuncionarioDetailsComponent {
  @Input() funcionario: Usuario = new Usuario();
  @Output() retorno = new EventEmitter<Usuario>();
  @Output() edit = new EventEmitter();


  funcionarioService = inject(UsuarioService);

  constructor(private route: ActivatedRoute) {
  }

  salvar() {
    if (this.funcionario.id > 0) {
      this.funcionarioService.update(this.funcionario).subscribe({
        next: funcionario => { 
          this.retorno.emit(funcionario);
        },
        error: erro => {
          alert('ERRO CABULOSO, VEJA O CONSOLE');
          console.error(erro);
        }
      });
    } else {
      this.funcionarioService.save(this.funcionario).subscribe({
        next: funcionario => {
          this.retorno.emit(funcionario);
        },
        error: erro => {
          alert('ERRO CABULOSO, VEJA O CONSOLE');
          console.error(erro);
        }
      });
    }
  }

  onEdit(funcionario: Funcionario) {
    this.edit.emit(funcionario);
  }
}
