import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraPageRoutingModule } from './camera-routing.module';
import { ProductosCardPageModule } from 'src/app/common/productos-card/productos-card.module';

import { CameraPage } from './camera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraPageRoutingModule,
    ProductosCardPageModule
  ],
  declarations: [CameraPage]
})
export class CameraPageModule {}
