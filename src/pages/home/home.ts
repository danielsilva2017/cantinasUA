import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CantinaProvider } from '../../providers/cantina/cantina';
import { InfoPage } from '../info/info';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  food:Object[];
  global ='global';
  constructor(public navCtrl: NavController, private cantinaProvider: CantinaProvider, private storage: Storage) {

  }

  ionViewWillEnter(){
    //Storage    
    this.storage.get('menu').then((val) => {
      try{
        //Baseado num tutorial
        this.cantinaProvider.getall().subscribe(food => {
          var almoco=[];
          var jantar=[];
          var menus=food.menus.menu;
          var i=0;
          //numero de cantinas (0,1,2,)
          var k=2;
          var dia="";
          var ultDia="";
          var title="";
          var str="";
          var res=[];
          for(var menu in menus){
            var entry=menus[menu];
            dia=entry['@attributes'].weekday;
            
            if(ultDia!="" && dia!=ultDia){
              title="Lunch on "+ultDia;
              res[i]={
                title:title,str:almoco
              }
              title="Dinner on "+ultDia;
              i++;
              res[i]={
                title:title,
                str:jantar
              }
              i++;
              almoco=[];
              jantar=[];
            }

            var canteen =entry['@attributes'].canteen;
            var disabled= entry['@attributes'].disabled;
            if(disabled!="0"){str =disabled;}
            else{
              str="";
              //Lista de refeiçoes
              var items= entry.items.item;
              var n=0;
              for(var item in items){
                if (JSON.stringify(items[item]).indexOf("{")==-1){
                  n++;
                  str += n+"º "+items[item] +"\n";
                }
              }
            }

            if(entry['@attributes'].meal=="Almoço"){
              if(k!=2){k++;}
              else{k++;}
              almoco[k]={canteen:canteen,str:str}
            }
            else{
              jantar[k]={
                canteen:canteen,str:str
              }
            }
            ultDia=dia;
          }
         
          
          this.food=res;
          this.storage.set('menu',this.food);
        },err => {
          this.food=val;
        }
      );
      }catch(e){
        this.food=val;
      }   
    });
  }

  getInfo(info:any){
    
    this.storage.set(this.global,JSON.stringify(info));
    this.navCtrl.push(InfoPage,info);
}
}

