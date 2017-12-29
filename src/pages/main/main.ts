import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { HomePage } from '../home/home';
import {MapaPage} from '../mapa/mapa';
@Component({
    selector: 'page-main',
    templateUrl: 'main.html'
  })
  export class MainPage {

  constructor(public navCtrl: NavController,public modalCtrl:ModalController,public modalctrl2:ModalController){}
  // Vai para a HomePage
  public goToTab():void{
    let modal=this.modalCtrl.create(HomePage);
    modal.present();
  }
  //Vai para a MapaPage- pagina do mapa
  public goToTab2():void{
    let modal=this.modalctrl2.create(MapaPage);
    modal.present();
  }


}
