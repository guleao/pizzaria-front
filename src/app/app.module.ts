import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './layout/index/index.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { LoginComponent } from './sistema/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PedidosdetailsComponent } from './pages/pedidos/pedidosdetails/pedidosdetails.component';
import { PedidoslistComponent } from './pages/pedidos/pedidoslist/pedidoslist.component';
import { ProdutosdetailsComponent } from './pages/produtos/produtosdetails/produtosdetails.component';
import { ProdutoslistComponent } from './pages/produtos/produtoslist/produtoslist.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardapioDetailsComponent } from './pages/cardapio/cardapio-details/cardapio-details.component';
import { CadastrarFuncionarioComponent } from './sistema/cadastro/cadastrar-funcionario/cadastrar-funcionario.component';
import { CadastrarUsuarioComponent } from './sistema/cadastro/cadastrar-usuario/cadastrar-usuario.component';
import { HeaderuserComponent } from './layout/headeruser/headeruser.component';
import { IndexUserComponent } from './layout/index-user/index-user.component';
import { FuncionariosListComponent } from './pages/funcionarios/funcionarios-list/funcionarios-list.component';
import { FuncionarioDetailsComponent } from './pages/funcionarios/funcionario-details/funcionario-details.component';
import { UsuarioListComponent } from './pages/usuarios/usuario-list/usuario-list.component';
import { UsuarioDetailsComponent } from './pages/usuarios/usuario-details/usuario-details.component';
import { SaboresListComponent } from './pages/sabores/sabores-list/sabores-list.component';
import { SaboresDetailsComponent } from './pages/sabores/sabores-details/sabores-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PizzaDetailsComponent } from './pages/pizza/pizza-details/pizza-details.component';
import { PizzaListComponent } from './pages/pizza/pizza-list/pizza-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent,
    HeaderComponent,
    CardapioComponent,
    LoginComponent,
    InicioComponent,
    PedidosdetailsComponent,
    PedidoslistComponent,
    ProdutosdetailsComponent,
    ProdutoslistComponent,
    CardapioDetailsComponent,
    CadastrarFuncionarioComponent,
    CadastrarUsuarioComponent,
    HeaderuserComponent,
    IndexUserComponent,
    FuncionariosListComponent,
    FuncionarioDetailsComponent,
    UsuarioListComponent,
    UsuarioDetailsComponent,
    SaboresListComponent,
    SaboresDetailsComponent,
    PizzaDetailsComponent,
    PizzaListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
