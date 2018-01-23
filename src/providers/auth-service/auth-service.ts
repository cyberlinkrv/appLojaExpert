import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginUser } from '../../app/models/login';
import { ListaOrcamentos } from '../../app/models/listOrcamentos';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  logUser = {} as LoginUser;

  apiUrl = "http://192.168.1.101:8084/MWS/web/serviceMobile/";


  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  getLogar(use: LoginUser) {
    return this.http.get(this.apiUrl + "Login/" + use.login + "/" + use.senha);
  }

  getProdutos() {
    return this.http.get(this.apiUrl + "ProdutosTodos");
  }

  getClientes() {
    return this.http.get(this.apiUrl + "ClienteTodos");
  }

  getListaOrcamentos() {
    return this.http.get(this.apiUrl + "Listar_Orcamentos");
  }

  getDetalhesOrcamentos() {
    return this.http.get(this.apiUrl + "Detalhes_Orcamentos");
  }

  getOrcamento_Por_controle(controle: ListaOrcamentos) {
    return this.http.get(this.apiUrl + "Orcamento_Por_controle/" + controle);
  }

  getConvenioCliente(id: String) {
    return this.http.get(this.apiUrl + "ConsultaConvenio/" + id);
  }

  getBudcarProdutoPorNome(nome: String) {
    return this.http.get(this.apiUrl + "BuscarProdPNome/" + nome);
  }

  setProdutosNaListaOrcamento(idProduto: String, vlr: String, qdt: String) {
    return this.http.get(this.apiUrl + "AddProdutoNaListaOrcamento/" + idProduto + "/" + vlr + "/" + qdt);
  }

  chequeTmp() {
    return this.http.get(this.apiUrl + "ExcluirTmpList");
  }

  somaTmp() {
    return this.http.get(this.apiUrl + "SomaTmp");
  }

  deletaItemTmp(id: String) {
    return this.http.get(this.apiUrl + "deletaItemTmp/" + id);
  }

  buscarTudotmp() {
    return this.http.get(this.apiUrl + "buscaTudotmp");
  }

  gravarOrcamento(idCliente, idUser) {
    return this.http.get(this.apiUrl + "GravarOrcamento/" + idCliente + "/" + idUser);
  }

  statusOrc(status) {
    return this.http.get(this.apiUrl + "statusOrcamento/" + status);
  }

  prencherListaOrc(cod) {
    return this.http.get(this.apiUrl + "editarListOrcament/" + cod);
  }

  gravarEditadoOrc(idClient, vrTotal, codLancament, controle) {
    return this.http.get(this.apiUrl + "GravarEditado/" + idClient + "/" + vrTotal + "/" + codLancament + "/" + controle);
  }



}
