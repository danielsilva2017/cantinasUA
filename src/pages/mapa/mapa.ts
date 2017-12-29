import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http } from '@angular/http';

import L from "leaflet";
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-map',
  templateUrl: 'mapa.html'
})
export class MapaPage {
  propertyList = [];
  center: L.PointTuple;
  mapa;
  circle;
  circle2;
  circle3;
 //From leaflet tutorial
  constructor(public navCtrl: NavController, private link: Http) {
    this.link.get('assets/data/points.json')
    .map(res => res.json())
    .subscribe(data => {
        this.propertyList = data.properties;
    },
    //Erro
    err => console.log("You have an error :  "+err), 
      () => this.leafletMap()
    );
  }

  ionViewDidLoad() {
    //Centra o mapa
    this.mapa = L.map('mapId').setView([40.629753,-8.6598417], 13);
  
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapa);
    //Desenha 3 circulos a volta dos 3 refeitorios e se clicarmos nos circulos sai um 
    // pop-up com o nome do restaurante
    this.circle=L.circle([40.630700, -8.6594417], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 30
    }).addTo(this.mapa);
    this.circle.bindPopup("Refeitorio de Santiago");
    this.circle2=L.circle([40.631217, -8.655533], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 30
    }).addTo(this.mapa);
    this.circle2.bindPopup("Snack-Bar");
    this.circle3=L.circle([40.624853, -8.657133], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 30
    }).addTo(this.mapa);
    this.circle3.bindPopup("Refeitorio do Castro");
  }
 //Error from tutorial
  leafletMap(){
    console.log("property" + this.propertyList.length);
    for (let property of this.propertyList) {
      L.marker([property.lat, property.long]).addTo(this.mapa)
      .bindPopup(property.city)
      .openPopup();
    }
  }

}