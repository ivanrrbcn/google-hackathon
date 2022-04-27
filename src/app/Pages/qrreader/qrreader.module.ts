import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { IonicModule } from '@ionic/angular';

import { QrreaderPageRoutingModule } from './qrreader-routing.module';

import { QrreaderPage } from './qrreader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrreaderPageRoutingModule,
    ZXingScannerModule    
  ],
  declarations: [QrreaderPage]
})
export class QrreaderPageModule {}
