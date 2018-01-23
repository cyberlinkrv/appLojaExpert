import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { AlertController } from 'ionic-angular';
//This app cread by Divino J. Silva
@Component({
  selector: 'page-consultar-conv-nio-cliente',
  templateUrl: 'consultar-conv-nio-cliente.html',
  providers: [
    AuthServiceProvider
  ]
})
export class ConsultarConvNioClientePage {
  resposta: String;

  public listaClientes = new Array<any>();

  constructor(
    public navCtrl: NavController,
    private authServiceProvider: AuthServiceProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.listarClientes();
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


  consultaConvenio(id) {
    this.authServiceProvider.getConvenioCliente(id).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.resposta = objeto_retorno;

        this.presentToast();

      }
    )

  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Convênio:  ' + this.resposta,
      duration: 3000,
      position: 'middle',
      cssClass: 'aqui'
    });

    toast.present();
  }

}
