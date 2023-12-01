import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { By } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario';
import { of } from 'rxjs';

describe('CadastrarUsuarioComponent', () => {
  let component: CadastrarUsuarioComponent;
  let fixture: ComponentFixture<CadastrarUsuarioComponent>;

  let usuarioService: UsuarioService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarUsuarioComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
        UsuarioService
      ]
    });
    fixture = TestBed.createComponent(CadastrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => { //MOCANDO DADOS
    let usuario = new Usuario();
    usuario.username = 'nomeUser';
    usuario.telefone = 'telefoneTst';
    usuario.email = 'tstEmail';
    component.usuario = usuario;
    fixture.detectChanges(); //refresh
  });

  it('Teste de 1 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).toEqual('nomeUser');
  });

  it('Teste de 2 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  // it('should set usuario properties on ngOnInit', () => {
  //   const usuario: Usuario = {
  //     id: 1,
  //     nomeUsuario: 'testUser',
  //     telefone: '123456789',
  //     email: 'test@example.com',
  //     senha: 'password',
  //     enderecos: []
  //   };

  //   spyOn(usuarioService, 'loadById').and.returnValue(of(usuario));

  //   component.ngOnInit();

  //   expect(component.usuario.id).toEqual(usuario.id);
  //   expect(component.usuario.nomeUsuario).toEqual(usuario.nomeUsuario);
  //   expect(component.usuario.telefone).toEqual(usuario.telefone);
  //   expect(component.usuario.email).toEqual(usuario.email);
  //   expect(component.usuario.senha).toEqual(usuario.senha);
  //   expect(component.usuario.enderecos).toEqual(usuario.enderecos);
  // });

  it('chamada do metodo getCep', fakeAsync(() => {
    const mockCepData = {
      logradouro: 'Rua Teste',
      bairro: 'Bairro Teste'
    };

    spyOn(component.viaCep, 'getCepData').and.returnValue(of(mockCepData));

    component.cepBusca = '12345678';
    component.buscarCep();
    tick();

    expect(component.usuario.enderecos.length).toEqual(1);
    expect(component.usuario.enderecos[0].rua).toEqual(mockCepData.logradouro);
    expect(component.usuario.enderecos[0].bairro).toEqual(mockCepData.bairro);
  }));

  beforeEach(() => {
    usuarioService = TestBed.inject(UsuarioService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('update no usuario', fakeAsync(() => {
    const mockUsuario: Usuario = {
      id: 1,
      username: 'testUser',
      telefone: '123456789',
      email: 'test@example.com',
      senha: 'password',
      enderecos: [],
      role: 'USER',
      token: ''
    };

    spyOn(usuarioService, 'update').and.returnValue(of(mockUsuario));
    spyOn(window, 'alert');

    component.usuario.id = 1;
    component.save();
    tick();

    expect(window.alert).toHaveBeenCalledWith('Atualizado com sucesso');
  }));

  it('teste delete', () => {
    const idToDelete = 1;

    usuarioService.delete(idToDelete).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/usuario?id=${idToDelete}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });
});
