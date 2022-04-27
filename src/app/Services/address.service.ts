import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {keys} from 'src/environments/keys'
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url:string = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  
  private addresses:Object

  constructor(private http: HttpClient) { 

  }

  getAddress(address:string){
    this.http.get(this.url+"?input="+address+"&key="+keys.google).subscribe(data => 
    {
      console.log(data)
      this.addresses = data;
    })
    return this.addresses
  }
}
