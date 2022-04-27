import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { BBDDService } from 'src/app/Services/bbdd.service';
import { SearchProductsService } from 'src/app/Services/search-products.service';
import { NavigationExtras, Router } from '@angular/router';
import { BotService } from 'src/app/Services/bot.service';
import { CompanyService } from './../../Services/company.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})


export class ProductsPage implements OnInit{
  /*Obtienes el primer elemento en el documento con class = "ion-searchbar"
  comentario escrito por Jonathan XD*/
  searchbar = document.querySelector('ion-searchbar');
  /*Productos disponibles es la lista receptora que recibe la lista que viene del servicio*/
  productosDisponibles: any[];
  textoBuscar="";

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private bbdd: BBDDService,
              private searchProductsService: SearchProductsService,
              private router: Router,
              public bot: BotService,
              private companyService: CompanyService){
    console.log("product page created");
    /*Esto lo dejó simran(linea de abajo) al parecer es una linea no util ya que lanza el metodo handleinput
    que no se lanzará nunca porque dejó la linea comentada*/
    //this.searchbar.addEventListener('ionInput', handleInput);
  }
  ngOnInit() {
    /*Se ha suscrito a la observable para recibir todos los productos que estan en la lista del servicio con 
    nombre ProductsList*/
    
    this.searchProductsService.getProducts().subscribe(data => this.productosDisponibles = data);
    

    console.log(this.productosDisponibles);
    this.bbdd.returnSubject().subscribe(data=>{
      this.textoBuscar=data;
    });
  }

}
