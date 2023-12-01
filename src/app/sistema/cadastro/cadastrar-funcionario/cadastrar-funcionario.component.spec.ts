import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CadastrarFuncionarioComponent } from './cadastrar-funcionario.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from 'src/app/models/funcionario';
import { of } from 'rxjs';

describe('CadastrarFuncionarioComponent', () => {
  let component: CadastrarFuncionarioComponent;
  let fixture: ComponentFixture<CadastrarFuncionarioComponent>;

  let funcionarioService: FuncionarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarFuncionarioComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
        FuncionarioService
      ]
    });
    fixture = TestBed.createComponent(CadastrarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    funcionarioService = TestBed.inject(FuncionarioService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('chamada do metodo salvar', () => {
    component.funcionario = new Funcionario();
    spyOn(funcionarioService, 'save').and.returnValue(of({} as Funcionario));
    component.save();
    expect(funcionarioService.save).toHaveBeenCalledWith(component.funcionario);
  });


  it('update no funcionario', fakeAsync(() => {
    const mockFuncionario: Funcionario = {
      id: 1,
      nomeFuncionario: 'testUser',
      email: 'test@example.com',
      senha: 'password'
    };
  
    spyOn(funcionarioService, 'update').and.returnValue(of(mockFuncionario));
    spyOn(window, 'alert');
  
    component.funcionario.id = 1;
    component.save();
    tick();
  
    expect(funcionarioService.update).toHaveBeenCalledWith(component.funcionario);
    expect(window.alert).toHaveBeenCalledWith('Atualizado com sucesso');
  }));


  it('chamar mostrar senha', () => {
    expect(component.senhaVisivel).toBeFalsy();
    component.mostrarSenha();
    expect(component.senhaVisivel).toBeTruthy();
    component.mostrarSenha();
    expect(component.senhaVisivel).toBeFalsy();
  });


  // it('teste delete', () => {
  //   const idToDelete = 1;

  //   funcionarioService.delete(idToDelete).subscribe(response => {
  //     expect(response).toBeTruthy();
  //   });

  //   const req = httpTestingController.expectOne(`http://localhost:8080/api/funcionario?id=${idToDelete}`);
  //   expect(req.request.method).toEqual('DELETE');

  //   req.flush({});
  // });


});
