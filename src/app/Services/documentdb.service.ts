import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import {keys} from '../../environments/keys'
import { RequestService } from './request.service';
@Injectable({
  providedIn: 'root'
})
export class DocumentdbService {


  constructor(private http: HttpClient, private reqService: RequestService) { 

    }

    
    async getCart(user:string){
      console.log("HOLA")
      let queryParams = new HttpParams();
      queryParams = queryParams.append("user",user)
      const response = await this.reqService.get('/merakiS3V3', queryParams)
      console.log(response)
      return response
      //return this.http.get('http://localhost:3000/users?user='+user)
     
    }
}



