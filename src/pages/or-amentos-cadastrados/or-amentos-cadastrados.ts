import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ListaOrcamentos } from '../../app/models/listOrcamentos';
import { detalhesOrcamentosPage } from '../../pages/detalhesOrcamentos/detalhesOrcamentos';

@Component({
  selector: 'page-or-amentos-cadastrados',
  templateUrl: 'or-amentos-cadastrados.html',
  providers: [
    AuthServiceProvider
  ]
})

export class OrAmentosCadastradosPage {
  detalhesOrcamentoPage: any;

  public orcamentosData = {} as ListaOrcamentos;
  public listaOrcament = new Array<any>();
  public detalhesOrcamento = new Array<any>();



  constructor(
    public navCtrl: NavController,
    private authServiceProvider: AuthServiceProvider
  ) {
    this.listOrcaments();
  }

  listOrcaments() {
    this.authServiceProvider.getListaOrcamentos().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.listaOrcament = objeto_retorno;

      }, Error => {
        console.log(Error);
      })
  }


  detalhes(controle, vr_total, nomeCliente, codigo) {

    let data = {
      selecionado: controle,
      total: vr_total,
      client: nomeCliente,
      cod: codigo
    };

    this.navCtrl.push(detalhesOrcamentosPage, data);
  }






}
