import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PedidosdetailsComponent } from './pedidosdetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/models/pedido';


describe('PedidosdetailsComponent', () => {
  let component: PedidosdetailsComponent;
  let fixture: ComponentFixture<PedidosdetailsComponent>;

  let pedidosService: PedidosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosdetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PedidosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    pedidosService = TestBed.inject(PedidosService);

    let pedido = new Pedido();
    pedido.obs = 'abc';
    component.pedido = pedido;
    fixture.detectChanges();
  });

  it('deve chamar o método save ao enviar o formulário', fakeAsync(() => { 
    let spy = spyOn(pedidosService, 'save').and.callThrough();

    let form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('ngSubmit'));

    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));


  it('deve chamar o método save ao enviar o formulário passando objeto', fakeAsync(() => {
    let spy = spyOn(pedidosService, 'save').and.callThrough();

    let pedido = new Pedido();
    pedido.obs = 'abc';
    component.pedido = pedido;
    fixture.detectChanges();

    let form = fixture.debugElement.nativeElement.querySelector('form');
    console.log(form);
    form.dispatchEvent(new Event('ngSubmit'));

    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(pedido);
  }));

  beforeEach(() => {
    pedidosService = TestBed.inject(PedidosService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });

  


  it('teste delete', () => {
    const idToDelete = 1;

    pedidosService.delete(idToDelete).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/pedido?id=${idToDelete}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });

});
