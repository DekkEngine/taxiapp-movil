import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { UsuarioProvider } from "../usuario/usuario";
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UbicacionProvider {

  taxista: AngularFirestoreDocument<any>;
  private watch: Subscription;

  constructor(private geolocation:Geolocation,
              private afDB:AngularFirestore,
              public _usuarioProvi:UsuarioProvider) {
  }

  inicializarTaxista(){
    this.taxista = this.afDB.doc(`/usuarios/${this._usuarioProvi.clave}`);
  }

  iniciarGeolocalizacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.taxista.update({
        lat: resp.coords.latitude,
        lng : resp.coords.longitude,
        clave: this._usuarioProvi.clave
      });
      this.watch = this.geolocation.watchPosition()
      .subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        
        this.taxista.update({
          lat: data.coords.latitude,
          lng : data.coords.longitude,
          clave: this._usuarioProvi.clave
      });
      
      });
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  detenerUbicacion(){
    try {
      this.watch.unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }

}
