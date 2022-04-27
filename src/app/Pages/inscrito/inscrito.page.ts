import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/event';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-inscrito',
  templateUrl: './inscrito.page.html',
  styleUrls: ['./inscrito.page.scss'],
})
export class InscritoPage implements OnInit {

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
