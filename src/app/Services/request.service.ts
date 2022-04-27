import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {

    this.ROOT_URL = "https://retail-lab-backend.rke.innocenter.t-systems.es"
  }

  
  loading = true;
  errorMessage = "Error";
 
 
 async get(uri: string, payload){
    console.log(this.ROOT_URL+uri)

    return this.http.get(this.ROOT_URL+uri, {params: payload}).toPromise()
    /*subscribe(data => 
      {
        console.log("pre", data);
        return data
      })*/
    }
  async post(uri: string, payload: Object){
    console.log(this.ROOT_URL+uri, payload)
    return this.http.post(this.ROOT_URL+uri, payload).toPromise()
  }
  delete(uri: string){
    console.log(this.ROOT_URL+uri)
    this.http.delete(this.ROOT_URL+uri).subscribe(data =>
      {
        console.log("delete", data)
      })
  }
}
