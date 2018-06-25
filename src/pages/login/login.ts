import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { UsuarioProvider } from "../../providers/usuario/usuario";
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              private alertCtrl:AlertController, 
              private loadingCtrl:LoadingController,
              public _up:UsuarioProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  mostrarInput(){
    this.alertCtrl.create({
      title : "Login" ,
      inputs : [
        {
          name: 'usuario',
          placeholder : 'Usuario'
        }
      ],
      buttons : [
        {
          text : 'Cancel',
          role : 'cancel',
          handler : data =>{

          }
        },
        {
          text : 'login',
          handler : data =>{
            // console.log(data);
            this.verificarUsuario( data.usuario );
          }
        }
      ]
    }).present();
  }

  verificarUsuario( clave:string ){
    let loading = this.loadingCtrl.create({
      content : 'Verificando'
    });
    loading.present();
    this._up.verificaUsuario( clave )
        .then( exite =>{
          loading.dismiss();
          if (exite) {
            this.slides.lockSwipes(false);
            this.slides.freeMode = true;
            this.slides.slideNext();
            this.slides.lockSwipes(true);
            this.slides.freeMode = false;
          } else {
            this.alertCtrl.create({
              title : "Usuario incorrecto",
              subTitle : "hablar con dekk",
              buttons : ['OK']
            }).present();
          }
        } );
  }

  ingresar(){
    this.navCtrl.setRoot(HomePage);
  }

}
