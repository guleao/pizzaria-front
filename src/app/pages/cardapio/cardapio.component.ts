import { Component, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sabores } from 'src/app/models/sabor';
import { SaboresService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent {

  openModal() {
    const modelDiv = document.getElementById('myModal')
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modelDiv = document.getElementById('myModal')
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  constructor() {
  }

}
