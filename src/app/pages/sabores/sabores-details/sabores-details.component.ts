import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Sabores } from 'src/app/models/sabor';
import { SaboresService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-sabores-details',
  templateUrl: './sabores-details.component.html',
  styleUrls: ['./sabores-details.component.scss']
})
export class SaboresDetailsComponent {
  @Input() sabor: Sabores = new Sabores();
  @Output() retorno = new EventEmitter<Sabores>();

  saboresService = inject(SaboresService);


  constructor() {

  }

  salvar() {
    if (this.sabor.id > 0) {
      this.saboresService.update(this.sabor).subscribe({
        next: sabor => {
          this.retorno.emit(sabor);
        },
        error: erro => {
          alert('ERRO CABULOSO VEJA O CONSOLE');
          console.error(erro);
        }
      });
    } else {
      this.saboresService.save(this.sabor).subscribe({
        next: sabor => {
          this.retorno.emit(sabor);
        },
        error: erro => {
          alert('ERRO CABULOSO VEJA O CONSOLE');
          console.error(erro);
        }
      });
    }
  }
}
