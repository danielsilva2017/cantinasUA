import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class CantinaProvider {
  url;
  constructor(public http: Http) {
    console.log('Hello CantinaProvider Provider');
    this.url='http://services.web.ua.pt/sas/ementas?date=week&format=json'
  }
  getall(){
     return this.http.get(this.url).map(res => res.json());;   
  }
}
