import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PizzaDetailsComponent } from './pizza-details.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Pizza } from 'src/app/models/pizza';
import { Tamanho } from 'src/app/models/tamanho';
import { Sabores } from 'src/app/models/sabor';
import { By } from '@angular/platform-browser';
import { PizzaService } from 'src/app/services/pizza.service';
import { of } from 'rxjs';


describe('PizzaDetailsComponent', () => {
  let component: PizzaDetailsComponent;
  let fixture: ComponentFixture<PizzaDetailsComponent>;

  let pizzaService: PizzaService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PizzaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
  beforeEach(() => {
    let pizza = new Pizza();

    pizza.id = 1;
    pizza.precoPizza = 30;
    pizza.quantPizza = 1;
    pizza.tamanho = Tamanho.P;
    pizza.sabores = [{id: 1, nomeSabor: 'testeSabor', ingredientes: 'tstIngrediente'}];
    component.pizza = pizza;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form elements correctly', () => {
    const formElement = fixture.debugElement.query(By.css('form'));
    expect(formElement).toBeTruthy();
  });

  it('teste de seleção de sabor', () => {
    const saborSelect = fixture.debugElement.query(By.css('#sabores'));
  
    saborSelect.nativeElement.value = [
      { id: 1, nomeSabor: 'testeSabor', ingredientes: 'tstIngrediente' }
    ];
    saborSelect.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  
    expect(component.pizza.sabores).toEqual([
      { id: 1, nomeSabor: 'testeSabor', ingredientes: 'tstIngrediente' }
    ]);
  });

  it('Teste de 1 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="quantidadePizza"]'));
    expect(elemento.nativeElement.ngModel).toEqual(1);
  });


  it('Teste 2 de @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="quantidadePizza"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });


  it('Teste de 3 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('select[name="pizzaSelect"]'));
    expect(elemento.nativeElement.ngModel).toEqual(Tamanho.P);
  });

  it('Teste de 4 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('select[name="pizzaSelect"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  it('Teste de 5 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('select[name="pizzaSelect"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  beforeEach(() => {
    pizzaService = TestBed.inject(PizzaService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('teste de envio de form', () => {
    spyOn(component, 'salvar');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.salvar).toHaveBeenCalled();
  });

  it('metodo update', () => {
    const pizzaToUpdate: Pizza = {
      id: 1,
      tamanho: Tamanho.P,
      sabores: [],
      precoPizza: 15,
      quantPizza: 2
      // ... other properties
    };

    pizzaService.update(pizzaToUpdate).subscribe(updatedPizza => {
      expect(updatedPizza).toEqual(pizzaToUpdate);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/pizza/${pizzaToUpdate.id}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(pizzaToUpdate);

    const updatedPizza: Pizza = {
      id: 1,
      tamanho: Tamanho.P,
      sabores: [],
      precoPizza: 15,
      quantPizza: 2
    };

    req.flush(updatedPizza);
  });

  it('teste delete', () => {
    const idToDelete = 1;

    pizzaService.delete(idToDelete).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/pizza?id=${idToDelete}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });
});
