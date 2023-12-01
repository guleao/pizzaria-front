import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/services/login.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';  // Corrigir importação
import { Login } from 'src/app/models/login';
import { Usuario } from 'src/app/models/usuario';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let httpTestingController: HttpTestingController;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientModule, RouterTestingModule, HttpClientTestingModule], 
      providers: [LoginService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('chamada do método logar ao clicar no botao', () => {
    spyOn(component, 'logar');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.logar).toHaveBeenCalled();
  });

  it('teste valida login', () => {
    const mockLogin: Login = { username: 'test@example.com', senha: 'password' };
    const mockUser: Usuario = {id: 1, username: 'teste', telefone: 'testet', email: 'tst', senha: 'asd', token: 'mockToken', role: 'admin', enderecos: [] };

    loginService.logar(mockLogin).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/usuario/logar');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);

    httpTestingController.verify();
  });

  it('tratar erro de login', () => {
    const mockLogin: Login = { username: 'test@example.com', senha: 'password' };

    loginService.logar(mockLogin).subscribe({
      error: erro => {
        expect(erro).toBeTruthy();
      }
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/usuario/logar');
    expect(req.request.method).toEqual('POST');
    req.error(new ErrorEvent('mock error'));

    httpTestingController.verify();
  });

  it('teste deslogar', () => {
    loginService.deslogar().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/usuario/deslogar');
    expect(req.request.method).toEqual('GET');
    req.flush({ message: 'Logout successful' });

    httpTestingController.verify();
  });
});
