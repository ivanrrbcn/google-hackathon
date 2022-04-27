import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QrGeneratorService {
  myAngularxQrCode
  constructor(private http: HttpClient) { 
    this.myAngularxQrCode = 'Your QR code data string';
  }

  generateQR(text: string){
    const response = this.http.get('http://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=100x100')
    .subscribe(data => { 
    })

  }

}
