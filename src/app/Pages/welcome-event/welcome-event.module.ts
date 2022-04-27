import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeEventPageRoutingModule } from './welcome-event-routing.module';

import { WelcomeEventPage } from './welcome-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeEventPageRoutingModule
  ],
  declarations: [WelcomeEventPage]
})
export class WelcomeEventPageModule {}
