import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FuncionariosListComponent } from './funcionarios-list.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from 'src/app/models/funcionario';
import { of } from 'rxjs';

describe('FuncionariosListComponent', () => {
  let component: FuncionariosListComponent;
  let fixture: ComponentFixture<FuncionariosListComponent>;

  let funcionarioService: FuncionarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionariosListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
        FuncionarioService
      ]
    });
    fixture = TestBed.createComponent(FuncionariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    funcionarioService = TestBed.inject(FuncionarioService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });

  it('teste list all funcionarios', fakeAsync(() => {
    const mockFuncionario: Funcionario[] = 
    [
      { id: 1, nomeFuncionario: 'Teste 1' , email: 'teste', senha: 'testeSenha'}, 
      { id: 1, nomeFuncionario: 'Teste 2' , email: 'teste', senha: 'testeSenha' }
    ];
    spyOn(funcionarioService, 'listAll').and.returnValue(of(mockFuncionario));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockFuncionario);
  }));
  
});
