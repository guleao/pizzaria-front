import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Sabores } from 'src/app/models/sabor';
import { SaboresService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-cardapio-details',
  templateUrl: './cardapio-details.component.html',
  styleUrls: ['./cardapio-details.component.scss']
})
export class CardapioDetailsComponent {
  @Input() sabores: Sabores = new Sabores();
  @Output() retorno = new EventEmitter<Sabores>();

  saborService = inject(SaboresService);

  constructor() {

  }

  salvar() {
    if (this.sabores.id > 0) {
      this.saborService.update(this.sabores).subscribe({
        next: sabores => { // QUANDO DÁ CERTO
          this.retorno.emit(sabores);
        },
        error: erro => { // QUANDO DÁ ERRO
          alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
          console.error(erro);
        }
      });
    } else {
      this.saborService.save(this.sabores).subscribe({
        next: sabores => {
          this.retorno.emit(sabores);
        },
        error: erro => {
          alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
          console.error(erro);
        }
      });
    }
  }
}
