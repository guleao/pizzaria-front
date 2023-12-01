import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SaboresDetailsComponent } from './sabores-details.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SaboresService } from 'src/app/services/sabor.service';
import { Sabores } from 'src/app/models/sabor';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('SaboresDetailsComponent', () => {
  let component: SaboresDetailsComponent;
  let fixture: ComponentFixture<SaboresDetailsComponent>;

  let saboresService: SaboresService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaboresDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SaboresDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    let sabor = new Sabores();
    sabor.id = 1;
    sabor.nomeSabor= 'Catupiry';
    component.sabor = sabor;
    fixture.detectChanges(); 
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Teste de 1 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).toEqual('Catupiry');
  });


  it('Teste 2 de @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  beforeEach(() => {
    saboresService = TestBed.inject(SaboresService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });


  it('deve chamar o método save ao enviar o formulário passando objeto', fakeAsync(() => {
    let spy = spyOn(saboresService, 'save').and.callThrough();

    let sabor = new Sabores();
    sabor.nomeSabor = 'Catupiry';
    component.sabor = sabor;
    fixture.detectChanges();

    let form = fixture.debugElement.nativeElement.querySelector('form');
    console.log(form);
    form.dispatchEvent(new Event('ngSubmit'));

    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(sabor);
  }));

  it('update de sabores', fakeAsync(() => {
    let sabores = new Sabores();
    sabores.id = 1;
    sabores.nomeSabor = 'testeSabor';
    sabores.ingredientes = 'tstIngrediente';
    component.sabor = sabores;

    spyOn(saboresService, 'update').and.returnValue(of(sabores));
    component.salvar();
    tick();

    expect(saboresService.update).toHaveBeenCalledWith(sabores);
  }));


  it('teste delete', () => {
    const idToDelete = 1;

    saboresService.delete(idToDelete).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/sabores?id=${idToDelete}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });


});
