import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProdutosdetailsComponent } from './produtosdetails.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ProdutosService } from 'src/app/services/produtos.service';

describe('ProdutosdetailsComponent', () => {
  let component: ProdutosdetailsComponent;
  let fixture: ComponentFixture<ProdutosdetailsComponent>;

  let produtosService: ProdutosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosdetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProdutosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    let produto = new Produto;
    produto.id = 1;
    produto.nome = 'Pizza'
    produto.valor = 200
    component.produto = produto;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste de 1 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).toEqual('Pizza');
  })

  it('Teste de 2 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  })

  beforeEach(() => {
    let produto = new Produto();
    produto.id = 1;
    produto.nome = 'Pizza';
    produto.valor = 456;

    const httpSpy = TestBed.inject(HttpClient)
    spyOn(httpSpy, 'post').and.returnValue(of(produto));
    spyOn(httpSpy, 'put').and.returnValue(of(produto));

    fixture.detectChanges();
  });


  it('Teste de @Output() retorno', fakeAsync(() => {
    spyOn(component.retorno, 'emit');
    component.salvar();
    expect(component.retorno.emit).toHaveBeenCalled();
  }));

  beforeEach(() => {
    produtosService = TestBed.inject(ProdutosService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });

  it('should call produtosService.update when produto.id > 0', fakeAsync(() => {
    let produto = new Produto();
    produto.id = 1;
    produto.nome = 'Pizza';
    produto.valor = 200;
    component.produto = produto;

    spyOn(produtosService, 'update').and.returnValue(of(produto));
    component.salvar();
    tick();

    expect(produtosService.update).toHaveBeenCalledWith(produto);
  }));

  it('should call produtosService.save when produto.id is not set', fakeAsync(() => {
    let produto = new Produto();
    produto.nome = 'Pizza';
    produto.valor = 200;
    component.produto = produto;

    spyOn(produtosService, 'save').and.returnValue(of(produto));
    component.salvar();
    tick();

    expect(produtosService.save).toHaveBeenCalledWith(produto);
  }));

  
  it('teste delete', () => {
    const idToDelete = 1;

    produtosService.delete(idToDelete).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/produto?id=${idToDelete}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });
});
