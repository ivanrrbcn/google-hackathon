import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CompanyService } from 'src/app/Services/company.service';
import { Evento } from 'src/app/models/event';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private company: CompanyService,
    private alertController: AlertController) { }

  id: any;
  event: Evento;
  name: string; 
  apellidos: string;
  email: string;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["id"]
    });
    this.event = this.company.getEvents()[this.id]
  }

  submit(){
    if (this.name == null || this.apellidos == null || this.email == null ) {
      this.presentAlert('Todos los campos son obligatorios.');
    }
    else{
      const navigationExtras: NavigationExtras = {
        queryParams: {name:this.name, surname: this.apellidos, email:this.email, id: this.id}
      }
      this.router.navigate(["/welcome-event"], navigationExtras)
    }

  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      message: msg,
    });
    await alert.present();
  }

}
