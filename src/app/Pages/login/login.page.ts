import { SearchProductsService } from 'src/app/Services/search-products.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { BBDDService } from 'src/app/Services/bbdd.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MatomoTracker } from '@ngx-matomo/tracker';
import { indices } from 'src/app/app.module';
import { PhotoService } from 'src/app/Services/photo.service';

import { TextToSpeechService } from 'src/app/Services/text-to-speech.service';
import { VoiceRecognitionService } from 'src/app/Services/voice-recognition.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

 
  count = 0;
  PageName: string = "Login";
  headerVisible: boolean = false;
  asignarStylo="";
  img_app="";
  img_dona="../../../assets/imgs/logo_mercadona.png";
  img_mango="../../../assets/vestidos/mango_logo2.jpg";
  img_miquel="../../../assets/imgs/miquelAlimentacio.jpg";
  button_arriba_style="";
  button_abajo_style="";
  addUser:boolean = false; 
  userName: string;
  volumeON: boolean = false;
  serviceON: boolean = false;
  text;

  constructor(private readonly tracker: MatomoTracker,
    private photoser:PhotoService,
    private routeInfo:ActivatedRoute,
    private search:SearchProductsService,
    private bbddService: BBDDService,
    private router: Router,
    public service : VoiceRecognitionService,
    private texttospeech: TextToSpeechService) {
    this.PageName = this.bbddService.PageName(1);
    this.service.init()
    
  }

 turnVolumeOn(){
  this.volumeON = true
 }

  ngOnInit() {
      
      //informa en el dashboard cuantos han entrado en mi web
      this.tracker.setUserId("Juanito");
      //informa que se ha visitado  la pagina
      this.tracker.trackPageView("Han entrado en login");
      console.log(this.tracker.getMatomoUrl());

      this.asignarStylo=this.routeInfo.snapshot.params['stylo'];
      console.log(this.asignarStylo);
      this.CambiarSass(this.asignarStylo);
      this.search.CargarProductos();
      this.DesignarStylo();   
  }




 
  CambiarSass(dato:string){this.search.styloActual(dato);}
  
  DesignarStylo(){
    this.search.styloActual(this.asignarStylo)

    if(this.asignarStylo=="mango"){
      this.button_arriba_style="main-button-mango2"
      this.button_abajo_style="main-button-mango";
      this.img_app=this.img_mango;
    }else if(this.asignarStylo=="dona"){
      this.button_arriba_style="secondary-button"
      this.button_abajo_style="main-button";
      this.img_app=this.img_dona;
    } else if(this.asignarStylo=="miquel"){
      this.button_arriba_style="main-button-miquel2"
      this.button_abajo_style="main-button-miquel";
      this.img_app=this.img_miquel;
    }
 
  }

  getPhoto(){
    this.photoser.addNewToGallery();
  }

  Cambiarstylo(diseno:string){
      this.ngOnInit();
  }
  OpenComprar() {
    this.tracker.trackEvent("Seccion de productos","cliente clicó en ir a productos");

    let navigationExtras: NavigationExtras = {
      queryParams: {'user': JSON.stringify(this.userName)}
    };
    console.log("Redirecting to home page");
    this.router.navigate(["../tabs/Home"], navigationExtras);
    console.log("Soy comprar");
  }
  OpenEventos(){
    const navigationExtras: NavigationExtras = { state: { prova: "prova" } };
    this.router.navigate(["/events"], navigationExtras)
    console.log("Soy eventos");
  }
  Login(){
    this.addUser = true
  }
  Confirm(user:string){
    this.bbddService.username = user
  }

  Tracker(){
    this.tracker.trackEvent('Productos', 'han entrado a la seccion de productos', 'Entrando a Comprar', ++this.count);
    console.log("Soy el tracker");
  }

  changeStatus(){
    this.serviceON = !this.serviceON
    if(this.serviceON) this.service.start()
    else this.service.stop()
  }

}
