import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UsuarioProvider {

  clave:string;
  user:any = {};
  private doc: Subscription;

  constructor(private afDb: AngularFirestore,
              private storage:Storage,
              private platform:Platform) {
  }

  verificaUsuario(clave: string){
    
    clave = clave.toLocaleLowerCase();

    return new Promise( (resolve, reject) =>{
      this.doc = this.afDb.doc(`/usuarios/${clave}`)
          .valueChanges().subscribe( data => {
            if (data) {
              //correcto
              this.clave = clave;
              this.user = this.user;
              this.guardar_storage();
              resolve(true);
            } else {
              //incorrecto
              resolve(false);
            }
            resolve();
          })
    });
  }

  guardar_storage(){
    if (this.platform.is('cordova')) {
      //movil
      this.storage.set('clave', this.clave);
    } else {
      //escritorio
      localStorage.setItem('clave', this.clave );
    }
  }

  cargar_storage(){
    return new Promise((resolve ,reject)=>{
      if (this.platform.is('cordova')) {
        //movil
        this.storage.get('clave').then( val => {
          if (val) {
            this.clave = val
            resolve(true);
          }else{
            resolve(false);
          }
        })
      } else {
        //escritorio
        if (localStorage.getItem('clave')) {
          this.clave = localStorage.getItem('clave');
          resolve(true);
        }else{
          resolve(false);
        }
      }
    });
  }

  borrarUsuario(){
    this.clave = null;
    if (this.platform.is('cordova')) {
      this.storage.remove('clave');
    } else {
      localStorage.removeItem('clave');
    }
    this.doc.unsubscribe();
  }

}
