import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {keys} from 'src/environments/keys'
@Injectable({
  providedIn: 'root'
})
export class GeolocalizationService {

  private addresses: Object
  constructor(private http: HttpClient, 
              private readonly geolocation$: GeolocationService,
  ) { }

  getPosition() {
    this.geolocation$.subscribe(position => 
      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude.toString()+","+position.coords.longitude.toString()+"&key="+keys.google).subscribe(data => 
      {
        console.log(data)
        this.addresses = data;
      }))
      return this.addresses
  }


}
