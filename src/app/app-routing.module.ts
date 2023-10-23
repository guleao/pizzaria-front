import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PedidoslistComponent } from './pages/pedidos/pedidoslist/pedidoslist.component';
import { ProdutoslistComponent } from './pages/produtos/produtoslist/produtoslist.component';
import { LoginComponent } from './sistema/login/login.component';
import { CadastrarUsuarioComponent } from './sistema/cadastro/cadastrar-usuario/cadastrar-usuario.component';
import { CadastrarFuncionarioComponent } from './sistema/cadastro/cadastrar-funcionario/cadastrar-funcionario.component';
import { IndexUserComponent } from './layout/index-user/index-user.component';
import { FuncionariosListComponent } from './pages/funcionarios/funcionarios-list/funcionarios-list.component';
import { UsuarioListComponent } from './pages/usuarios/usuario-list/usuario-list.component';
import { UsuarioResolver } from './guards/usuario.resolver';
import { FuncionarioResolver } from './guards/funcionario.resolver';
import { SaboresListComponent } from './pages/sabores/sabores-list/sabores-list.component';


const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "homeUser", component: IndexUserComponent, children: [
      { path: "inicio", component: InicioComponent },
      { path: "cardapio", component: CardapioComponent },
    ]
  },

  { path: "cadastrarUsuario", component: CadastrarUsuarioComponent },
  { path: "cadastrarFuncionario", component: CadastrarFuncionarioComponent},
  


  {
    path: "home", component: IndexComponent, children: [
      { path: "pedidos", component: PedidoslistComponent },
      { path: "produtos", component: ProdutoslistComponent },
      { path: "sabores", component: SaboresListComponent },
      { path: "usuarios", component: UsuarioListComponent },
      { path: 'usuarios/edit/:id', component: CadastrarUsuarioComponent, resolve: { usuario: UsuarioResolver } },
      { path: "funcionarios", component: FuncionariosListComponent },
      { path: "funcionarios/edit/:id", component: CadastrarFuncionarioComponent, resolve: { funcionario: FuncionarioResolver } },
      { path: "voltar", component: FuncionariosListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
