import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UsuarioListComponent } from './usuario-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { of } from 'rxjs';

describe('UsuarioListComponent', () => {
  let component: UsuarioListComponent;
  let fixture: ComponentFixture<UsuarioListComponent>;

  let usuarioService: UsuarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
        UsuarioService
      ]
    });

    
    fixture = TestBed.createComponent(UsuarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

   
    usuarioService = TestBed.inject(UsuarioService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    usuarioService = TestBed.inject(UsuarioService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });

  it('teste list all usuarios', fakeAsync(() => {
    const mockUsuario: Usuario[] = [{ id: 1, username: 'Teste 1' , email: 'teste', senha: 'testeSenha', telefone: 'teste', enderecos: [], role: 'USER', token: ''}, { id: 1, username: 'Teste 1' , email: 'teste', senha: 'testeSenha', telefone: 'teste', enderecos: [], role: 'USER', token: '' }];
    spyOn(usuarioService, 'listAll').and.returnValue(of(mockUsuario));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockUsuario);
  }));
  

  
});
