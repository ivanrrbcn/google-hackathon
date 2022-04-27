import { SearchProductsService } from './search-products.service';
import { RequestService } from './request.service';
import { Injectable, OnInit } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import {keys} from '../../environments/keys'



//declare function uploadJPG():void;


@Injectable({
  providedIn: 'root'
})


export class PhotoService implements OnInit {
  products;
  capturedPhoto;
  photo: Photo
  constructor(private reqService: RequestService,
              private searchProductsService: SearchProductsService,
              private http: HttpClient  ) {}
  productToShow = null;


    ngOnInit(){
      uploadJPG()
    }

  async detectLabels(s1:string, s2:string): Promise<string[]>{
/*
    process.env.AWS_REGION = 'us-west-2'
    process.env.AWS_ACCESS_KEY_ID = 'test-key'
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret'
*/
    const bucket = s1 // the bucketname without s3://
    const foto = s2 // the name of file
    const config = new AWS.Config()
    AWS.config.region = keys.AWSregion;
    AWS.config.accessKeyId =  keys.AWSaccessKeyId
    AWS.config.secretAccessKey = keys.AWSsecretAccessKey
    const params = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: foto
        },
      },
      MaxLabels: 10,
      MinConfidence: 60
    }
    let etiquetas = null
    const client = new AWS.Rekognition();
    client.detectLabels(params, function(err, response) {
      if (err) {
        console.log(err, err.stack); // if an error occurred
      } 
      else {
        etiquetas = response.Labels
        console.log(`Detected labels for: ${this.photo}`)
        response.Labels.forEach(label => {
          console.log(`Label: ${label.Name}`)

          console.log(`Confidence: ${label.Confidence}`)
          console.log("Instances:")
          label.Instances.forEach(instance => {
            let box = instance.BoundingBox
            console.log(" Bounding box:")
            console.log(` Top: ${box.Top}`)
            console.log(` Left: ${box.Left}`)
            console.log(` Width: ${box.Width}`)
            console.log(` Height: ${box.Height}`)
            console.log(` Confidence: ${instance.Confidence}`)
          })
          console.log("Parents:")
          label.Parents.forEach(parent => {
            console.log(` ${parent.Name}`)
          })
          console.log("------------")
          console.log("")
        }) // for response.labels
      } // if
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(etiquetas);
        }, 1500);
      });
  }

  private AddtoCart(label: string){
    this.searchProductsService.getProducts().subscribe(data => this.products = data);
    for (let i=0; i<this.products.length; i++){
      if(this.products[i].awsname == label){
        console.log("Show " + this.products[i].name + " description")
        this.productToShow = this.products[i]
      }
    }
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async savePicture(cameraPhoto: CameraPhoto) { 
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    console.log(savedFile)

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return base64Data

  }
  
  public async addNewToGallery() {
    this.capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100,
    });
    
    // Transformacions de format
    let savedImageFile = await this.savePicture(this.capturedPhoto);


    const fileName = new Date().getTime() + '.jpg';

    this.photo = {
      data: [savedImageFile.substring(savedImageFile.indexOf(",") + 1), fileName],
      secret: "innocenter"
    };


    const response = await this.reqService.post('/merakiS3V3', this.photo)
   /* 
    console.log(response["data"])

    await this.uploadFile(fileName, response["data"])*/

    console.log(response)
  
    const labels  = await this.detectLabels("bucket-rekognition-lab", fileName)

    labels.forEach(label => {
      this.AddtoCart((label["Name"]))
    })
  
    this.deleteFile(fileName)
  }

  async deleteFile(name: string) {
      const bucket = new S3(
        {
            accessKeyId: keys.AWSaccessKeyId,
            secretAccessKey: keys.AWSsecretAccessKey,
            region: keys.AWSregion
        }
      );var params = {
        Bucket: 'bucket-rekognition-lab', 
        Key: name
      };
      
      bucket.deleteObject(params, function(err, data) {
          if (err) console.log(err)     
          else console.log("Successfully deleted object");   
      });
    
  }

}


export interface Photo {
  data;
  secret: string;
}

