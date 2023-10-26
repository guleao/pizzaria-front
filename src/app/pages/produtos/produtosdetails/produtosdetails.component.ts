import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtosdetails',
  templateUrl: './produtosdetails.component.html',
  styleUrls: ['./produtosdetails.component.scss']
})
export class ProdutosdetailsComponent {
  @Input() produto: Produto = new Produto();
  @Output() retorno = new EventEmitter<Produto>();

  produtosService = inject(ProdutosService);


  constructor() {

  }

  salvar() {
    if (this.produto.id > 0) {
      this.produtosService.update(this.produto).subscribe({
        next: produto => {
          this.retorno.emit(produto);
        },
        error: erro => {
          alert('ERRO CABULOSO VEJA O CONSOLE');
          console.error(erro);
        }
      });
    } else {
      this.produtosService.save(this.produto).subscribe({
        next: produto => {
          this.retorno.emit(produto);
        },
        error: erro => {
          alert('ERRO CABULOSO VEJA O CONSOLE');
          console.error(erro);
        }
      });
    }
  }



}
