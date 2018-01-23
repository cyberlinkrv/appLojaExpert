import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';

import { BemVindoPage } from '../pages/bem-vindo/bem-vindo';
import { TermosDeUsoPage } from '../pages/termos-de-uso/termos-de-uso';
import { MenuBarPage } from '../pages/menuBar/menu';
import { NovoOrAmentoClientesPage } from '../pages/novo-or-amento-clientes/novo-or-amento-clientes';
import { NovoOrAmentoProdutosPage } from '../pages/novo-or-amento-produtos/novo-or-amento-produtos';
import { ListaDeClientesPage } from '../pages/lista-de-clientes/lista-de-clientes';
import { ListaDeProdutosPage } from '../pages/lista-de-produtos/lista-de-produtos';
import { OrAmentosCadastradosPage } from '../pages/or-amentos-cadastrados/or-amentos-cadastrados';
import { ConsultarConvNioClientePage } from '../pages/consultar-conv-nio-cliente/consultar-conv-nio-cliente';
import {TermosDeUsoNoBtPage} from '../pages/termos-de-uso-no-bt/termos-de-uso-no-bt';
import {detalhesOrcamentosPage} from '../pages/detalhesOrcamentos/detalhesOrcamentos';
import {EditarOrcamentoPage} from '../pages/editar-orcamento/editar-orcamento';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';


@NgModule({
  declarations: [
    MyApp,
    BemVindoPage,
    TermosDeUsoPage,
    MenuBarPage,
    NovoOrAmentoClientesPage,
    NovoOrAmentoProdutosPage,
    ListaDeClientesPage,
    ListaDeProdutosPage,
    OrAmentosCadastradosPage,
    ConsultarConvNioClientePage,
    TermosDeUsoNoBtPage,
    detalhesOrcamentosPage,
    EditarOrcamentoPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BemVindoPage,
    TermosDeUsoPage,
    MenuBarPage,
    NovoOrAmentoClientesPage,
    NovoOrAmentoProdutosPage,
    ListaDeClientesPage,
    ListaDeProdutosPage,
    OrAmentosCadastradosPage,
    ConsultarConvNioClientePage,
    TermosDeUsoNoBtPage,
    detalhesOrcamentosPage,
    EditarOrcamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}