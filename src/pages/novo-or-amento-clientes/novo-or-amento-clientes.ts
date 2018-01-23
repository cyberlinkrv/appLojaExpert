import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NovoOrAmentoProdutosPage } from '../novo-or-amento-produtos/novo-or-amento-produtos';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-novo-or-amento-clientes',
  templateUrl: 'novo-or-amento-clientes.html'
})
export class NovoOrAmentoClientesPage {

  public listaClientes = new Array<any>();
  idUser4: any;
  idCliente1: any;
  nameC: any;
  ok: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.recebiIdUser();
    this.listarClientes();
  }

  recebiIdUser() {
    let idrecebido = this.navParams.get('id3');
    this.idUser4 = idrecebido;
  }

  EnviarIdUser(idUser4, idCliente1, nomeCliente) {
    let data = { id4: idUser4, idC1: idCliente1, name: nomeCliente };
    this.navCtrl.push(NovoOrAmentoProdutosPage, data);
  }


  goToNovoOrAmentoProdutos() {
    this.EnviarIdUser(this.idUser4, this.idCliente1, this.nameC);
  }


  listarClientes() {
    this.authServiceProvider.getClientes().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.listaClientes = objeto_retorno;

      }, Error => {
        console.log(Error);
      })
  }


  idCliente(id, nomeCliente) {
    this.idCliente1 = id;
    this.nameC = nomeCliente;
    this.NovoOrAmento();
    this.presentToast();
    this.goToNovoOrAmentoProdutos();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Cliente Selecionado:  ' + this.nameC,
      duration: 3000,
      position: 'middle',
      cssClass: 'aqui'
    });

    toast.present();
  }

  NovoOrAmento() {
    this.authServiceProvider.chequeTmp().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.ok = objeto_retorno;
      }
    )
  }



}
