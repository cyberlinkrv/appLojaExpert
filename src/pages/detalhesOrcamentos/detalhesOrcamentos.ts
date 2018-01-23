import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular'; //Tem que adicionar aqui junto com NavController o NavParams
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { EditarOrcamentoPage } from '../editar-orcamento/editar-orcamento';

@Component({
  selector: 'detalhesOrcamentos',
  templateUrl: 'detalhesOrcamentos.html',
  providers: [
    AuthServiceProvider
  ]
})
export class detalhesOrcamentosPage {

  public detalhesOrcamento = new Array<any>();
  public total: String;
  public client: String;
  public cod: String;
  public controle: String;
  public status: any;
  public mStatus: String = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, // tem que adicionar aqui no contrutor tambem uma variavel do tipo NavParams
    private authServiceProvider: AuthServiceProvider,
    public alertCtrl: AlertController
  ) {
    this.detalhesDoOrcamento();
    this.totalRecebido();

    this.defineStatusPedido();
  }

  totalRecebido() {
    let tot = this.navParams.get('total'); // pega o valor recebido em uma variavel
    this.total = tot; //passa o valor para a String total.

    let cli = this.navParams.get('client');
    this.client = cli;

    let co = this.navParams.get('cod');
    this.cod = co;

  }

  detalhesDoOrcamento() {
    let resposta = this.navParams.get('selecionado'); //Recebido Numero do Controle no item selecionado
    this.controle = resposta;
    this.authServiceProvider.getOrcamento_Por_controle(resposta).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.detalhesOrcamento = objeto_retorno;

      }, Error => {
        console.log(Error);
      })
  }


  defineStatusPedido() {
    this.authServiceProvider.statusOrc(this.controle).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.status = objeto_retorno;
        this.testecase();
      }, Error => {
        console.log(Error);
      })

  }


  testecase() {

    switch (this.status) {
      case 1:
        this.mStatus = "Orçamento inserido via dispositivo Mobile. Status = ABERTO";
        break;

      case 2:
        this.mStatus = "Orçamento inserido via Desktop. Status = ABERTO";
        break;
    }
  }

  editarOrc() {

    switch (this.status) {
      case 1:
        this.puxaEdicaoTela();
        break;

      case 2:
        this.alertaeditar();
        break;
    }


  }

  alertaeditar() {
    let confirm = this.alertCtrl.create({
      title: 'ATENÇÃO',
      message: 'Somente orçamentos inseridos via dispositivo "Mobile", e com Status "ABERTO" podem ser editados nesta ferramenta.',
    });
    confirm.present()
  }

  puxaEdicaoTela() {
    let data = {
      selecionado: this.controle,
      codi: this.cod,
      clt: this.client
    };

    this.navCtrl.push(EditarOrcamentoPage, data);
  }






}
