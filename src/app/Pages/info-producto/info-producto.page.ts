import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { BBDDService } from 'src/app/Services/bbdd.service';
import { TextToSpeechService } from 'src/app/Services/text-to-speech.service';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.page.html',
  styleUrls: ['./info-producto.page.scss'],
})
export class InfoProductoPage implements OnInit {
  product: Product=null;
  volumeON = false; 

  ngOnInit(){}

  constructor( public alertController: AlertController,private route: ActivatedRoute,
    private bbddService: BBDDService,private toastController: ToastController, private texttospeech: TextToSpeechService) {

      this.route.queryParams.subscribe(params => {
        this.product = JSON.parse(params["product"]) as Product;
      });
  }//etiqueta de cierre del constructor


  //Para el Pop-Up (No olvidar el import ni el constructor)
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Información Nutricional',
      subHeader: 'Tamaño de la Porción  100g',
      message: 'Energía 75kj , Proteína 0,88g , Grasa 0,2g , Carbohidratos 3,92g , Colesterol 0mg',
      buttons: ['OK']
    });

    await alert.present();
    //Para el Pop-Up (No olvidar el import ni el constructor)

  }
  btnAnadirCarrito(){
    this.bbddService.AddProductCart(this.product);
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto añadido',
      duration: 500,
      cssClass:'toast', 
      position: 'top'
    });
    toast.present();
  }

  turnVolumeOn(){
    this.volumeON = true
    this.texttospeech.speak("Aquí tiene la información sobre el producto: "+this.product.name+
    ". Marca: Mercadona."+
    "Descripción:" + this.product.description+ ".Precio: "+this.product.price.toString()+
    ". Información nutricional: Tamaño de la Porción 100g. Energía 75 kj. Grasa 0,2 g. Proteína 0,88g. Colesterol 0 mg. ")
  }
  turnVolumeOff(){
    this.volumeON = false
    this.texttospeech.stop()
  }
}