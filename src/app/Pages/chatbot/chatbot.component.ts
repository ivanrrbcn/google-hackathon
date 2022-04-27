import { AfterViewChecked,  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { BBDDService } from 'src/app/Services/bbdd.service';
import { BotService } from 'src/app/Services/bot.service';
import { CompanyService } from 'src/app/Services/company.service';
import { SearchProductsService } from 'src/app/Services/search-products.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit, AfterViewChecked {

  productosDisponibles: any[];
  textoBuscar="";
  show = false;
  inputText = ""

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  constructor(private bbdd: BBDDService,
              private searchProductsService: SearchProductsService,
              private router: Router,
              public bot: BotService,
              private companyService: CompanyService
    ) { }

  ngOnInit() {
        
    this.searchProductsService.getProducts().subscribe(data => this.productosDisponibles = data);
    

    console.log(this.productosDisponibles);
    this.bbdd.returnSubject().subscribe(data=>{
      this.textoBuscar=data;
    });
  }


  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  sendMessageBot() {
    var promise = new Promise((resolve, reject) => {
      this.bot.postLexText(this.inputText)
      this.inputText = ""
      let msg;
      setTimeout( () => {
        console.log(this.inputText)
        msg = this.bot.messages[this.bot.messages.length-1].content

        this.checkFunctionalities(msg)

        if (Error) {
          console.log(Error)
          reject();
        } else {
          console.log(msg)
          if(msg.startsWith("Mostrando evento")){
            let event = msg.substr(msg.indexOf(" ") + 1)
            event = event.substr(event.indexOf(" ") + 1)
            const events = this.companyService.getEvents();
            events.forEach((currentValue, index) => {
              if(currentValue.title.toUpperCase() == event.split('.')[0].toUpperCase()){
                console.log(events[index])
                this.show = false;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                //location.replace("/inscribir;id="+JSON.stringify( events[index].id))
                this.router.navigate(['/inscribir', { id: events[index].id }])
              }
            });
          }
          resolve('');
        }
      }, 1000);

    });



    //return promise;
  }



  async checkFunctionalities(msg: string){
    console.log(msg)
    if( msg.startsWith("He añadido")) {
      const quantity = parseInt(msg.split(' ')[2])
      let productName = msg.split(' ')[3].split('.')[0]
      productName = productName.charAt(0).toUpperCase() + productName.slice(1)
      console.log('Starts with he añadido')

      for (let i = 0; i<this.productosDisponibles.length; i++){
        if ((this.productosDisponibles[i].name == productName || this.productosDisponibles[i].name == productName.slice(0, -1)) && !isNaN(quantity)) {
          let product: Product = this.productosDisponibles[i]
          product.quantity = quantity
          console.log(product)
          this.bbdd.AddProductCart(product)
        }
      }
    }
    else if(msg.startsWith("Mostrando evento")){
      let event = msg.substr(msg.indexOf(" ") + 1)
      event = event.substr(event.indexOf(" ") + 1)
      const events = this.companyService.getEvents();
      events.forEach((currentValue, index) => {
        if(currentValue.title.toUpperCase() == event.split('.')[0].toUpperCase()){
          console.log(events[index])
          this.show = false;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          //location.replace("/inscribir;id="+JSON.stringify( events[index].id))
          this.router.navigate(['/inscribir', { id: events[index].id }])
        }
      });
    }
    else if(msg.startsWith("Mostrando")){
      let productName = msg.split(' ')[1].split('.')[0]
      productName = productName.charAt(0).toUpperCase() + productName.slice(1)
      console.log('Starts with mostrando')
      console.log(productName)
      for (let i = 0; i<this.productosDisponibles.length; i++){
        if ((this.productosDisponibles[i].name == productName || this.productosDisponibles[i].name == productName.slice(0, -1))) {
          let navigationExtras: NavigationExtras = {
            queryParams: {'product': JSON.stringify(this.productosDisponibles[i])}
          };
          this.router.navigate(["/info-producto"], navigationExtras)
       }
      }
    }
  }


}
