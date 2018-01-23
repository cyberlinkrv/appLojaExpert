import { Component } from '@angular/core';
import { NavController, App, NavParams } from 'ionic-angular';
import { MenuBarPage } from '../menuBar/menu';
import { NovoOrAmentoClientesPage } from '../novo-or-amento-clientes/novo-or-amento-clientes';
import { OrAmentosCadastradosPage } from '../or-amentos-cadastrados/or-amentos-cadastrados';


@Component({
  selector: 'page-termos-de-uso',
  templateUrl: 'termos-de-uso.html',
  template: `
  <ion-tabs >
    <ion-tab tabIcon="menu" tabTitle="Menu" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="pricetags" tabTitle="Novo Orçamento" [root]="tab2"></ion-tab>
    <ion-tab tabIcon="archive" tabTitle="Lista Orçamentos" [root]="tab3"></ion-tab>    
  </ion-tabs>`, 
})
export class TermosDeUsoPage {

  idUser2: any;
  tab1: any = MenuBarPage;
  tab2: any = NovoOrAmentoClientesPage;
  tab3: any = OrAmentosCadastradosPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App
  ) {
    this.idUserRecebido();
  }

  idUserRecebido() {
    let idrecebido = this.navParams.get('id1');
    this.idUser2 = idrecebido;
  }

  EnviarIdUser(idUser2) {
    let data = { id2: idUser2 };
    this.navCtrl.push(MenuBarPage, data);
   
  }

  goToMenu() {
    this.EnviarIdUser(this.idUser2);
  }







}
