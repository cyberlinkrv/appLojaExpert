import { Component } from '@angular/core';
import { NavController, App, NavParams } from 'ionic-angular';
import { NovoOrAmentoClientesPage } from '../novo-or-amento-clientes/novo-or-amento-clientes';
import { ListaDeClientesPage } from '../lista-de-clientes/lista-de-clientes';
import { ListaDeProdutosPage } from '../lista-de-produtos/lista-de-produtos';
import { OrAmentosCadastradosPage } from '../or-amentos-cadastrados/or-amentos-cadastrados';
import { ConsultarConvNioClientePage } from '../consultar-conv-nio-cliente/consultar-conv-nio-cliente';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
//This app cread by Divino J. Silva


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',

})
export class MenuBarPage {

  idUser3: any;
  ok: any;
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private authServiceProvider: AuthServiceProvider
  ) {
    this.recebiIdUser();
  }

  recebiIdUser() {
    //let idrecebido = this.navParams.get('id2');
    this.idUser3 = 1;
  }

  EnviarIdUser(idUser3) {
    let data = { id3: idUser3 };
    this.navCtrl.push(NovoOrAmentoClientesPage, data);
  }
  NovoOrAmento() {
    this.authServiceProvider.chequeTmp().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.ok = objeto_retorno;
      }
    )

    this.EnviarIdUser(this.idUser3);
  }


  goToMenu() {
    this.navCtrl.push(MenuBarPage);
  }
  ListaDeClientes() {
    this.navCtrl.push(ListaDeClientesPage);
  }
  ListaDeProdutos() {
    this.navCtrl.push(ListaDeProdutosPage);
  }
  ListarOrcamentos() {
    this.navCtrl.push(OrAmentosCadastradosPage);
  }
  ConvenioCliente() {
    this.navCtrl.push(ConsultarConvNioClientePage);
  }


  //---- função para fechar a aplicação
  logout() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
