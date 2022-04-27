import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Evento } from 'src/app/models/event';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-welcome-event',
  templateUrl: './welcome-event.page.html',
  styleUrls: ['./welcome-event.page.scss'],
})
export class WelcomeEventPage implements OnInit {

  constructor(private route: ActivatedRoute, private company: CompanyService) { }
  id: number;
  name: string;
  apellidos: string;
  email: string;
  event: Evento;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["id"]
      this.name = params["name"]
      this.apellidos = params["surname"]
      this.email = params["email"]
    });
    this.event = this.company.getEvents()[this.id]
  }

}
