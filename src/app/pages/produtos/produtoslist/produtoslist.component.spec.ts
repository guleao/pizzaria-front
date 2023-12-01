import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProdutoslistComponent } from './produtoslist.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/models/produto';
import { of } from 'rxjs';

describe('ProdutoslistComponent', () => {
  let component: ProdutoslistComponent;
  let fixture: ComponentFixture<ProdutoslistComponent>;

  let produtosService: ProdutosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoslistComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProdutoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    produtosService = TestBed.inject(ProdutosService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });

  it('teste list all produtos', fakeAsync(() => {
    const mockSabores: Produto[] = [{ id: 1, nome: 'Teste 1' , valor: 1, quantidade: 1}, { id: 2, nome: 'Teste 2' , valor: 1, quantidade: 1 }];
    spyOn(produtosService, 'listAll').and.returnValue(of(mockSabores));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockSabores);
  }));
  
});
