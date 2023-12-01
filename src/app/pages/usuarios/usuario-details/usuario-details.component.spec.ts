import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UsuarioDetailsComponent } from './usuario-details.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { By } from '@angular/platform-browser';

describe('UsuarioDetailsComponent', () => {
  let component: UsuarioDetailsComponent;
  let fixture: ComponentFixture<UsuarioDetailsComponent>;

  let usuarioService: UsuarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(UsuarioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  beforeEach(() => {
    let usuario = new Usuario();
    usuario.email = 'emailTeste';
    usuario.username = 'usuarioTst';
    usuario.telefone = 'telefoneTeste';
    usuario.senha = 'senhaTst';
    component.usuario = usuario;

    fixture.detectChanges();
  });

  it('Teste de 1 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).toEqual('usuarioTst');
  });

 

  // it('deve chamar o método save ao enviar o formulário', fakeAsync(() => { //colocar o fakeAsync toda vez que rolar coisa assíncrona
  //   let spy = spyOn(usuarioService, 'save').and.callThrough();

  //   let form = fixture.debugElement.nativeElement.querySelector('form');
  //   form.dispatchEvent(new Event('ngSubmit')); //disparar o mesmo evento que tá configurado na tag

  //   tick(); //simular uma demora assíncrona
  //   fixture.detectChanges();
  //   expect(spy).toHaveBeenCalled();
  // }));
});
