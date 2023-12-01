import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SaboresListComponent } from './sabores-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SaboresService } from 'src/app/services/sabor.service';
import { Sabores } from 'src/app/models/sabor';
import { of } from 'rxjs';

describe('SaboresListComponent', () => {
  let component: SaboresListComponent;
  let fixture: ComponentFixture<SaboresListComponent>;

  let saboresService: SaboresService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaboresListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SaboresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    saboresService = TestBed.inject(SaboresService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });

  it('teste list all sabores', fakeAsync(() => {
    const mockSabores: Sabores[] = [{ id: 1, nomeSabor: 'Teste 1' , ingredientes: 'teste'}, { id: 2, nomeSabor: 'Teste 2', ingredientes: 'TesteDois' }];
    spyOn(saboresService, 'listAll').and.returnValue(of(mockSabores));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockSabores);
  }));
  

  it('should open modal on adicionar', fakeAsync(() => {
    spyOn(component.modalService, 'open').and.returnValue({ componentInstance: {}, result: Promise.resolve('result') } as any);

    component.adicionar({} as any);
    tick();
    fixture.detectChanges();

    expect(component.modalService.open).toHaveBeenCalled();
  }));

  it('teste delete', fakeAsync(() => {
    spyOn(saboresService, 'delete').and.returnValue(of(null));
    const mockSabores = { id: 1, saborPizza: 'Teste' };

    component.deletar(mockSabores.id);
    tick();
    fixture.detectChanges();

    expect(saboresService.delete).toHaveBeenCalledWith(mockSabores.id);
    expect(component.lista.length).toBe(0);
  }));
});
