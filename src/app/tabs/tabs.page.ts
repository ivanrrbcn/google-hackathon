import { Product } from './../models/product';
import { model } from 'mongoose';
import { DocumentdbService } from 'src/app/Services/documentdb.service';
import { SearchProductsService } from './../Services/search-products.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BBDDService } from '../Services/bbdd.service';
import { PhotoService } from 'src/app/Services/photo.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  NumberProductsInCart:number=0;
  NumberProductsInCartObs: Subscription;
  asignarColor:number;
  diseno_iconos="";
  product: Product
  prods
  constructor(
    private search:SearchProductsService,
    private router: Router,
    private bbddService: BBDDService, 
    public photoService: PhotoService,
    private documentdbService: DocumentdbService
  ) {}

    async ngOnInit() {

      const data = await this.documentdbService.getCart(this.bbddService.username)
      console.log(data)
      const products = data["products"]
      const inventory = data["Inventory"]
      console.log(products)
      console.log(inventory)

      this.search.getProducts().subscribe(data => this.prods = data);
      for (let i = 0; i < products.length; i++) {
        for (let j=0; j<this.prods.length; j++){
          if(this.prods[j].name == products[i]){
            this.product = this.prods[j]
            console.log(this.product)
            this.product.quantity = inventory[i]
            this.bbddService.AddProductCart(this.product)
          }
        }            
      }


      this.NumberProductsInCartObs = this.bbddService.getProductsInCart().subscribe(Data => {
        if(Data) this.NumberProductsInCart = Data.length;
        else this.NumberProductsInCart=0;
      });

      this.asignarColor=this.search.ReturnConfg();
      this.DesignarStylo();
    }

    DesignarStylo(){
      if(this.asignarColor==1){
        //stylo mango
        this.diseno_iconos="tab-mango";
        //this.text_name="text1-mango";
      }else if(this.asignarColor==2){
        //stylo dona
        this.diseno_iconos="tab-selected";
        //this.text_name="text1";
      }else if(this.asignarColor==3){
        //stylo miquel
        this.diseno_iconos="tab-miquel";
        //this.text_name="text1-miquel";
      }
    }

    ngOnDestroy() {
      this.NumberProductsInCartObs.unsubscribe();
    }

    async addPhotoToGallery() {
      await this.photoService.addNewToGallery();
      if(this.photoService.productToShow != null){
        let navigationExtras: NavigationExtras = {
          queryParams: {'product': JSON.stringify(this.photoService.productToShow)}
        };
        console.log(this.photoService.productToShow)
        this.photoService.productToShow = null
        this.router.navigate(["/info-producto"], navigationExtras)
      }
  
    }

    async readQR(){
      this.router.navigate(["/qrreader"])
    }
  

}
