import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
//This app cread by Divino J. Silva
@Component({
  selector: 'page-lista-de-clientes',
  templateUrl: 'lista-de-clientes.html',
  providers: [
    AuthServiceProvider
  ]
})
export class ListaDeClientesPage {

  public listaClientes = new Array<any>();

  constructor(
    public navCtrl: NavController,
    private authServiceProvider: AuthServiceProvider
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

}
