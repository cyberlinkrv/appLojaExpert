import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { MenuBarPage } from '../menuBar/menu';
import { NovoOrAmentoClientesPage } from '../novo-or-amento-clientes/novo-or-amento-clientes';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { CadProdutos } from '../../app/models/produtos';
import { CadOrcamento } from '../../app/models/orcamento';
import { AlertController } from 'ionic-angular';
//This app cread by Divino J. Silva
@Component({
  selector: 'page-novo-or-amento-produtos',
  templateUrl: 'novo-or-amento-produtos.html'
})
export class NovoOrAmentoProdutosPage {

  public listaProdutos = new Array<CadProdutos>(); //Lista de produtos
  idUser5: any; // Aqui esta o id do Usuário que esta logado
  idCliente: any; //Aqui esta o id do Cliente Selecionado
  nomeCliente: any; //Aqui esta o nome do Cliente Selecionado
  valor: any; //Aqui esta o Valor do item selecionado
  idselec: any; //Aqui esta o ID do item selecionado
  nomeProduto: any; //Aqui esta o nome do produto selecionado
  soma: any;
  removerResposta: any;
  prodCad = {} as CadProdutos;
  public addLista = new Array<CadOrcamento>();
  orc = {} as CadOrcamento;
  resposta: any;
  ok: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.recebiIdUser();
    this.listarProd();
  }

  recebiIdUser() {
    //let idUsuarioLogado = this.navParams.get('id4');
    let idCliente = this.navParams.get('idC1');
    let nomeCliente = this.navParams.get('name');

    this.idUser5 = 1;
    this.idCliente = idCliente;
    this.nomeCliente = nomeCliente;

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

  goToMenu() {
    this.navCtrl.push(MenuBarPage);
  }

  splitValores() {
    var varlorId = this.prodCad.vrVenda.split(";");

    this.valor = varlorId[0];
    this.idselec = varlorId[1];
    this.nomeProduto = varlorId[2];

  }

  addInList() {
    if (this.orc.qdt != null || this.idselec != null) {
      this.authServiceProvider.setProdutosNaListaOrcamento(this.idselec, this.valor, this.orc.qdt).subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.addLista = objeto_retorno;

          this.totalSoma();

          this.orc.qdt = null;

        }, Error => {
          console.log(Error);
        })
    } else {
      this.presentToast();
    }
  }

  totalSoma() {
    this.authServiceProvider.somaTmp().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.soma = objeto_retorno;

      }, Error => {
        console.log(Error);
      })
  }

  removerItem(idrec) {
    this.authServiceProvider.deletaItemTmp(idrec).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.removerResposta = objeto_retorno;

        this.soma = null;
        this.atualizaLista();
        this.totalSoma();

      }, Error => {
        console.log(Error);
      })

  }

  atualizaLista() {

    this.authServiceProvider.buscarTudotmp().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.addLista = objeto_retorno;

      }, Error => {
        console.log(Error);
      })

  }


  doConfirmAlert(idrec, nomeProd) {
    let confirm = this.alertCtrl.create({
      title: 'ATENÇÃO',
      message: 'Você deseja realmente remover o item ' + nomeProd + ' da lista?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
          }
        },
        {
          text: 'SIM',
          handler: () => {
            this.removerItem(idrec);
          }
        }
      ]
    });
    confirm.present()
  }

  gravarOrc() {

    this.authServiceProvider.gravarOrcamento(this.idCliente, this.idUser5).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.resposta = objeto_retorno;

        this.gravadoConfirmAlert(this.resposta);

      }, Error => {
        console.log(Error);
      })

  }

  gravadoConfirmAlert(co) {
    if (this.addLista.length != 0){
      let confirm = this.alertCtrl.create({
      title: 'Sucesso!!!',
      message: 'Orçamento número : ' + co + ' .    Deseja cadastrar um novo Orçamento?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
            this.navCtrl.push(MenuBarPage);
            this.NovoOrAmento();
          }
        },
        {
          text: 'SIM',
          handler: () => {
            this.navCtrl.push(NovoOrAmentoClientesPage);
            this.NovoOrAmento();
          }
        }
      ]
    });
    confirm.present()
  }else {
    this.presentToast();
  }
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

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'ATENÇÃO : Informe o Produto e a Quantidade!! ',
      duration: 3000,
      position: 'middle',
      cssClass: 'aqui'
    });

    toast.present();
  }




}
