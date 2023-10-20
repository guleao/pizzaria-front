import { Component, inject } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';
import { Login } from 'src/app/models/login';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/sistema/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
