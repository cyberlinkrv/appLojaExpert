import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { OrAmentosCadastradosPage } from '../or-amentos-cadastrados/or-amentos-cadastrados';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { CadProdutos } from '../../app/models/produtos';
import { CadOrcamento } from '../../app/models/orcamento';
import { AlertController } from 'ionic-angular';
import { MenuBarPage } from '../menuBar/menu';

/**
 * Generated class for the EditarOrcamentoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-editar-orcamento',
  templateUrl: 'editar-orcamento.html',
})
export class EditarOrcamentoPage {
  contro: String;// aqui esta o sequencial controle
  idOrc: String;// aqui esta o codigo do orçamento
  nomeCliente: String; // aqui esta o nome do cliente
  prodCad = {} as CadProdutos;
  valor: any; //Aqui esta o Valor do item selecionado
  idselec: any; //Aqui esta o ID do item selecionado
  nomeProduto: any;//Aqui esta o nome do produto selecionado
  orc = {} as CadOrcamento;
  public listaProdutos = new Array<CadProdutos>(); //Lista de produtos
  public addLista = new Array<CadOrcamento>();
  removerResposta: any;
  soma: any;
  idClient: any;
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
    this.preencheLista();



  }

  recebiIdUser() {
    let controle = this.navParams.get('selecionado');
    let idCliente = this.navParams.get('codi');
    let nomeCliente = this.navParams.get('clt');

    this.contro = controle;
    this.idOrc = idCliente;
    this.nomeCliente = nomeCliente;

  }

  splitValores() {
    var varlorId = this.prodCad.vrVenda.split(";");

    this.valor = varlorId[0];
    this.idselec = varlorId[1];
    this.nomeProduto = varlorId[2];

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

  preencheLista() {

    this.authServiceProvider.prencherListaOrc(this.contro).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.idClient = objeto_retorno;
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

  removerItem(idrec) {
    if (this.addLista.length != 1) {
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

    } else {
      this.proibidoSoUm();
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

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'ATENÇÃO : Informe o Produto e a Quantidade! ',
      duration: 3000,
      position: 'middle',
      cssClass: 'aqui'
    });

    toast.present();
  }

  proibidoSoUm() {
    let toast = this.toastCtrl.create({
      message: 'ATENÇÃO : O orçamento precisa de um produto, por isso não é permitido excluir este item. ',
      duration: 5000,
      position: 'middle',
      cssClass: 'aqui'
    });

    toast.present();
  }


  gravarOrc() {

    this.authServiceProvider.gravarEditadoOrc(this.idClient, this.soma, this.idOrc, this.contro).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.ok = objeto_retorno;

        this.gravadoConfirmAlert();

      }, Error => {
        console.log(Error);
      })

  }

  gravadoConfirmAlert() {
    let confirm = this.alertCtrl.create({
      title: 'Sucesso!!!',
      message: 'Orçamento número : ' + this.idOrc + ' editado com sucesso.  Deseja editar outro orçamento?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
            this.navCtrl.push(MenuBarPage);
          }
        },
        {
          text: 'SIM',
          handler: () => {
            this.navCtrl.push(OrAmentosCadastradosPage);
          }
        }
      ]
    });
    confirm.present()
  }




}
