import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { keys } from 'src/environments/keys'
import * as saveAs from 'file-saver';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})


export class TextToSpeechService {

  constructor(private http: HttpClient, private reqService: RequestService) { }

  private audio;
  
  async speak(text:string){

    const fileName = new Date().getTime() + '.mp3';

    const req = await this.http.post('https://texttospeech.googleapis.com/v1/text:synthesize?key='+keys.google, 
    {
      input: {text: text},
      voice:{languageCode: 'en-UK', ssmlGender: 'MALE'},
      audioConfig:{audioEncoding: 'MP3'}
    }).toPromise()

    console.log("post", req);
    this.audio = {
      data: [req["audioContent"], fileName],
      secret: "innocenter"
    };
  
   
    //await this.reqService.post('/text-to-speech', this.audio)

    console.log("AUDIO")
    this.playAudio(req["audioContent"]);

  }

 async playAudio(url:string){
    console.log(url)
    this.audio = new Audio();
    this.audio.src = "data:audio/mp3;base64," + url;
    this.audio.load();
    await this.audio.play();
    
    this.reqService.delete('/file')
  }

  async stop(){
    this.audio.pause()
  }

}
