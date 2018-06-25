import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UbicacionProvider } from "../../providers/ubicacion/ubicacion";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number;
  lng: number;

  user:any = {};

  constructor(public navCtrl: NavController,
              public _userProvider:UsuarioProvider,
              public _upd:UbicacionProvider) {

   this._upd.iniciarGeolocalizacion();
   this._upd.inicializarTaxista();
   this._upd.taxista.valueChanges()
       .subscribe( data => {
         this.user = data;
       });
  }

  salir(){
    this._upd.detenerUbicacion();
    this._userProvider.borrarUsuario();
    this.navCtrl.setRoot(LoginPage);
  }

}
