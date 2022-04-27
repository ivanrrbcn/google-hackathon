import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { QrGeneratorService } from 'src/app/Services/qr-generator.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-qrevento',
  templateUrl: './qrevento.page.html',
  styleUrls: ['./qrevento.page.scss'],
})
export class QreventoPage implements OnInit {
   
  elementType = NgxQrcodeElementTypes.URL
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
  value = "http://localhost:4200/checkin"
  id: any
  constructor(private qrGenerator: QrGeneratorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = "?id="+ params["id"]
    });  
  }

  descargarQR(){

    const fileNameToDownload = 'image_qrcode';
    const base64Img = document.getElementsByClassName('coolQRCode')[0].children[0]['src'];

    fetch(base64Img)
      .then(res => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileNameToDownload;
        link.click();         
      })

  }


}
