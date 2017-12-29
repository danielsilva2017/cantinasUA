import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  info: Object[];
  title ="";
  global='info';
  constructor(public navCtrl: NavController,private storage:Storage) {
  }

  ionViewDidLoad() {
    this.storage.get(this.global).then((val) => {
      var parse=JSON.parse(val);
      console.log(parse.title);
      console.log(parse.content);
      this.title=parse.title;
      console.log(this.title);
      this.info=parse.content;
      console.log(this.info + "Im here");
    });
  }

}