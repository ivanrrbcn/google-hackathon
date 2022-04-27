import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SearchProductsService } from './../../Services/search-products.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DocumentdbService } from 'src/app/Services/documentdb.service';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.page.html',
  styleUrls: ['./qrreader.page.scss'],
})
export class QrreaderPage implements OnInit {

  public transports: Transport[] = [];
  private products;
  private productToShow = null;
  constructor(private cd: ChangeDetectorRef, 
              private router: Router, 
              private searchProductsService: SearchProductsService, 
              private alertController: AlertController,
              private documentdb: DocumentdbService
              ) {
  }

  ngOnInit() {
    this.documentdb.getCart("pau");
  }

  public scanSuccessHandler($event: any) {
    console.log(event)
    this.searchProductsService.getProducts().subscribe(data => this.products = data);
    for (let i=0; i<this.products.length; i++){
      if(this.products[i].name == $event){
        this.productToShow = this.products[i]
      }
    }
    console.log(this.productToShow)
    if(this.productToShow != null){
      let navigationExtras: NavigationExtras = {
        queryParams: {'product': JSON.stringify(this.productToShow)}
      };
      this.router.navigate(["/info-producto"], navigationExtras)
      this.productToShow = null;

    }
    else{
        this.presentAlert();
    }
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass: 'alert',
      message: 'Error de lectura: El QR no corresponde a ningún producto disponible.',
      buttons: ['OK']
    });
    await alert.present();
  }

}

interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}