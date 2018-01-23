import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-lista-de-produtos',
  templateUrl: 'lista-de-produtos.html',
  providers: [
    AuthServiceProvider
  ]

})
export class ListaDeProdutosPage {

  public listaProdutos = new Array<any>();


  constructor(
    public navCtrl: NavController,
    private authServiceProvider: AuthServiceProvider
  ) {
    this.listarProd();
  }


  listarProd() {
    this.authServiceProvider.getProdutos().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.listaProdutos = objeto_retorno;

      }, Error => {
        console.log(Error);
      })
  }



}
