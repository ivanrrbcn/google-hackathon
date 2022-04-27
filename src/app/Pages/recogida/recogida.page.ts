import { Place } from './../../models/place';
import { SearchProductsService } from './../../Services/search-products.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TimeDelivery } from 'src/app/models/timeDelivery';
import { BBDDService } from 'src/app/Services/bbdd.service';
import { CompanyService } from 'src/app/Services/company.service';
import { AddressService } from 'src/app/Services/address.service';
import { GeolocalizationService } from './../../Services/geolocalization.service';

@Component({
  selector: 'app-recogida',
  templateUrl: './recogida.page.html',
  styleUrls: ['./recogida.page.scss'],
})
export class RecogidaPage {
  // Variable initialized onInit of the component
  lista_opciones_entrega: string[];
  lista_tipo_recogida: string[];
  lista_matricula: string[];
  DeliveryLocations: Place[];
  DeliveryHours: TimeDelivery[];
  // Variable representing the id of
  // the selected paramters among the available ones
  SelectedDeliveryLocId: number;
  SelectedDeliveryHourId: number;
  SelectedDeliveryType: String;
  SelectedMatricula: String;
  SelectedAddress: String

  addressSelected:boolean = false;
  asignarColor:number;
  button_trami_reco:string="";
  bordes:string="";
  recogidaCasa:boolean = null;
  address:string = "";
  list_adresses = []
  place: Place = null
  geo:boolean = false

  constructor(private search:SearchProductsService,
              private bbddService: BBDDService,
              private companyService: CompanyService,
              private router: Router,
              private alertController: AlertController,
              private addressservice: AddressService,
              private geoloc: GeolocalizationService
              ) {
  }
  ngOnInit(){
    this.initSetup();
    this.asignarColor=this.search.ReturnConfg();
    this.DesignarStylo();

    //setInterval(()=> { this.showAddress() }, 1000);

  }

  DesignarStylo(){
    if(this.asignarColor==1){
      //stylo mango
      this.button_trami_reco="btnTramitar-mango";
      this.bordes="borde_mango";
    }else if(this.asignarColor==2){
      //stylo dona
      this.button_trami_reco="btnTramitar";
      this.bordes="borde";
    }
    else if(this.asignarColor==3){
      //stylo miquel
      this.button_trami_reco="btnTramitar-miquel";
      this.bordes="borde_miquel";
    }
  }

  /**
   * Method used to initialize the variables of this component
   * @variables `lista_tipo_recogida` `lista_matricula` `DeliverHours` `DeliveryLocations`
   */
  initSetup(){
    this.lista_opciones_entrega = ["Recibir en casa", "Recoger en tienda"]
    this.lista_tipo_recogida = ["Parking", "Click and Collect"];
    this.lista_matricula = ["3376MKD"];
    this.companyService.getDeliveryLocation().then(data => { this.DeliveryLocations = data })
    this.DeliveryHours = this.companyService.getDeliveryHour();
  }
  /**
   * @check if the required information is provided.
   * @output Present alert to the user 
   * @output Update the delivery information and lead to the next payment page
   */
  clickBtnContinuar() {
    if ( (!(this.SelectedDeliveryHourId > -1 && this.SelectedDeliveryLocId > -1)) && (!(this.SelectedDeliveryHourId > -1 && this.place != null))) {
      this.presentAlert('Los campos con * son obligatorios');
    }
    else {
      this.setDeliveryInfo();
      this.router.navigate(["/payout"]);
    }
  }
  /**
   * This method presents an alert to the user indicating the missing data
   * @output ``Los campos con * son obligatorios``
   */
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      message: msg,
    });
    await alert.present();
  }
  
  /**
   * This method sets the information of delivery in bbddService
   * @parameters updated: `location` `time` `cost` `type`
   */
  setDeliveryInfo() {
    if(!this.recogidaCasa) this.place = this.DeliveryLocations[this.SelectedDeliveryLocId]
    this.bbddService.setDelivery({
      location: this.place,
      time: this.DeliveryHours[this.SelectedDeliveryHourId],
      cost: this.companyService.getDeliveryCost(),
      type: "compra"
    })
    console.log(this.bbddService.getDelivery())
  }

  Servicio: string;
  Entrega: string;

  CambioParking(dato: string){
    console.log("Hola");
    console.log(dato);
    this.search.AsignarValor(dato);
  }

  CambioEntrega(dato:string){
    if(dato == "Recibir en casa") this.recogidaCasa = true
    else this.recogidaCasa = false
  }

  showAddress(){
    this.geo = false
    if(this.addressSelected == false){
      const data = this.addressservice.getAddress(this.address)
      this.list_adresses = data["predictions"]

    }
    this.addressSelected = false
  }


//And call it
  async selectAddress(direccion: Object){
    console.log(direccion)
    this.address = direccion["description"];

    try {
      //this.place = {street:  direccion["street"], postal: parseInt(direccion["postcode"]), city: direccion["city"], number: direccion["housenumber"]}
      this.place = {street:  direccion["description"]}
    }
    catch (error) {
      this.presentAlert(error)
      console.error(error);
    }
    this.list_adresses = []
    this.addressSelected = true

  }

  geolocalization(){
    this.geo = true
    const data = this.geoloc.getPosition()
    this.list_adresses = data["results"]
    console.log(this.list_adresses)
  }

  async selectAddress2(direccion: Object){
    console.log(direccion)

    this.address = direccion["formatted_address"];

    try {
      this.place = {street:  direccion["formatted_address"]}
    }
    catch (error) {
      this.presentAlert(error)
      console.error(error);
    }
    this.list_adresses = []
    this.addressSelected = true

  }


  /**
   * TEst environment
   */
  PopoverOptions= {
    cssClass: 'alert',
    translucent: true
  }
}


