import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/Services/photo.service';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {

  imageUrl: string;
  constructor(public photoService: PhotoService, private router: Router) {}


  addPhotoToGallery() {
    this.photoService.addNewToGallery();

  }

}

