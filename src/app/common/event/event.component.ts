import { Component, Input, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  
  @Input() event:Evento;

  public params: Object

  constructor() {
  }

  ngOnInit() {
    this.params = {id: this.event.id}
  }

}
