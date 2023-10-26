import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent {
  @Input() usuario: Usuario = new Usuario();
  @Output() retorno = new EventEmitter<Usuario>();

  usuarioService = inject(UsuarioService);

  @Output() edit = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nomeUsuario: ['', Validators.required],
      telefone: ['', Validators.maxLength(12)], // Adicione validadores necessários
      email: ['', Validators.email] // Adicione validadores necessários
    });
  }

  onEdit(usuario: Usuario) {
    this.edit.emit(usuario);
  }


  salvar() {
    if (this.usuario.id > 0) {
      if (this.usuario.id > 0) {
        this.usuarioService.update(this.usuario).subscribe({
          next: usuario => {
            this.retorno.emit(usuario);
          },
          error: erro => {
            alert('ERRO CABULOSO VEJA O CONSOLE');
            console.error(erro);
          }
        });
      } else {
        this.usuarioService.save(this.usuario).subscribe({
          next: usuario => {
            this.retorno.emit(usuario);
          },
          error: erro => {
            alert('ERRO CABULOSO VEJA O CONSOLE');
            console.error(erro);
          }
        });
      }
    }
  }
}
