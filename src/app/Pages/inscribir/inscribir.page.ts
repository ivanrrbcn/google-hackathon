import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/event';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-inscribir',
  templateUrl: './inscribir.page.html',
  styleUrls: ['./inscribir.page.scss'],
})
export class InscribirPage implements OnInit {

  constructor(private route: ActivatedRoute, private company: CompanyService) { }

  event:Evento;

  public id: any;

  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"]
    });  

    this.event = this.company.getEvents()[this.id]

  }

}
