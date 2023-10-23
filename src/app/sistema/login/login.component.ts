import { Component, inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginService = inject(LoginService);

  loginC: Login = new Login();

  constructor(private router: Router) { }

  login() {
    console.log('aaaaa');
    console.log(this.login);
    this.loginService.save(this.loginC).subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData.mensagem == "Email inválido") {
        alert("Email/Senha inválido");
      }
      else if (resultData.mensagem == "Senha inválida") {
        alert("Email/Senha Inválida");
      }
      else if (resultData.mensagem == "Login realizado com sucesso" && resultData.admin == true) {
        this.router.navigateByUrl('/home/pedidos');
      }
      else if (resultData.mensagem == "Login realizado com sucesso" && resultData.admin == false) {
        this.router.navigateByUrl('/homeUser/inicio');
      }
      else if (resultData.mensagem == "Login Inválido") {
        alert("Login inválido");
      }
    });
  }

}
