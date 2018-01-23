import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { TermosDeUsoPage } from '../termos-de-uso/termos-de-uso';
import { TermosDeUsoNoBtPage } from '../termos-de-uso-no-bt/termos-de-uso-no-bt'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginUser } from '../../app/models/login';
import { AlertController } from 'ionic-angular';
//This app cread by Divino J. Silva
@Component({
  selector: 'page-bem-vindo',
  templateUrl: 'bem-vindo.html',
  providers: [
    AuthServiceProvider
  ]
})
export class BemVindoPage {

  public userData = {} as LoginUser;
  public userResposta = {} as LoginUser;
  public idUser1: any;

  constructor(
    public navCtrl: NavController,
    private authServiceProvider: AuthServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  goToTermosDeUsoNoBt() {
    this.navCtrl.push(TermosDeUsoNoBtPage);
  }

  logarApp(user: LoginUser) {
    this.authServiceProvider.getLogar(user).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        if (objeto_retorno === null) {
          this.presentActionSheet();
          this.userData.login = null;
          this.userData.senha = null;
        } else {
          this.userResposta = objeto_retorno;
        }
        if (this.userResposta.senha == "OK" || this.userResposta.login != null) {
          this.idUser1 = this.userResposta.id;
          this.userData.login = null;
          this.userData.senha = null;

          this.passaIdUser(this.idUser1);
        }
      }, Error => {
        console.log(Error);
      })
  }

  passaIdUser(idUser1) {
    let data = { id1: idUser1 };
    this.navCtrl.push(TermosDeUsoPage, data);
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'ACESSO NEGADO',
      subTitle: 'Usuário ou Senha Inválidos',
      cssClass: 'teste',
    });

    actionSheet.present();
  }




}
