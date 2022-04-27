import { LoginPage } from './../Pages/login/login.page';
import { SearchProductsService } from './search-products.service';
import { BBDDService } from './bbdd.service';
import { Injectable } from '@angular/core';
import { TextToSpeechService } from 'src/app/Services/text-to-speech.service';

declare var webkitSpeechRecognition: any;


@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  numeros = {
    "un": 1,
    "una": 1,
    "dos": 2,
    "tres": 3,
    "cuatro": 4,
    "cinco": 5,
    "seis": 6,
    "siete": 7,
    "ocho": 8,
    "nueve": 9,
    "diez": 10,
    
  }
  keywords = {
    "cansado":10,
    "restaurante":11
  }



  deleate = {"eliminar":1}
  num=0;

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords;
  productosDisponibles: any[];
  serviceON: boolean = false;
  volumeON: boolean = false;
  

  constructor(private bbddservice: BBDDService,
              private search: SearchProductsService,private texttospeech: TextToSpeechService
    ) {     
    }

  turnVolumeOff(){
    this.volumeON = false
    this.texttospeech.stop()
  }

  turnVolumeON(){
    this.volumeON=true
  }

  init() {

    this.search.getProducts().subscribe(data => this.productosDisponibles = data);


    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.addProduct(this.tempWords)
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }

  addProduct(words: string){
    let quantity;
    let product; 
    let eliminar;
    let num;


    console.log(words)
    let x = words.split(" ");
    for(let i = 0; i < x.length; i++){
      console.log(x[i])

      if(x[i] == "Google"){
        console.log("Hola google")
        this.turnVolumeON()
        this.texttospeech.speak("Good morning Smith family, who is inside me?")
        this.turnVolumeOff()
      }

      else if(x[i] == "plan"){
        console.log("this is munich")
        this.turnVolumeON()
        this.texttospeech.speak("Yes, of course. The shortest way is 8hours 50 minutes. However, I it is snowing in Hamburg. I recommend 15 min longer route which is less risky. Do you want to take this route?")
        this.turnVolumeOff()
      }

      
      else if(x[i] == "risky"){
        console.log("risky")
        this.turnVolumeON()
        this.texttospeech.speak("Before you start the trip: Do you want to subscribe to Fun&Drive service? It will make more trip more entertaining - especially with kids on board")
        this.turnVolumeOff()
      }

          
      else if(x[i] == "holiday"){
        console.log("holiday")
        this.turnVolumeON()
        this.texttospeech.speak("Frank, you have a meeting planned in 15 minutes, but you are also in holidays. Do you want me to connect you to the meeting? Or should I sent a message to the organizator that you will not be connected?")
        this.turnVolumeOff()
      }

      else if(x[i] == "accident"){
        console.log("accident")
        this.turnVolumeON()
        this.texttospeech.speak("I planned to return to the original route in 5 minutes. But there is an accident in 10 km. I recommend taking an alternative route to avoid 1 hour of delay. Is that okay?")
        this.turnVolumeOff()
      }

      else if(x[i] == "paul"){
        console.log("paul")
        this.turnVolumeON()
        this.texttospeech.speak("Hello there, I noticed Paul crying. How about I search for a Playground or can I can play some  music if you like?")
        this.turnVolumeOff()
      }

      else if(x[i] == "playground"){
        console.log("playground")
        this.turnVolumeON()
        this.texttospeech.speak("I propose to go to the Maislabyrinth in 7 km. There is also a playground. In 500 m distance there is a charging station. I recommend charging there to be able to drive home without any other stop.")
        this.turnVolumeOff()
      }

      else if(x[i] == "break"){
        console.log("break")
        this.turnVolumeON()
        this.texttospeech.speak("Frank, according to your health app we recommend having a break. It is a good time for lunch.")
        this.turnVolumeOff()
      }
      else if(x[i] == "restaurant"){
        console.log("restaurant")
        this.turnVolumeON()
        this.texttospeech.speak("I recommend the Waldcafe Forellenteich. It has a vegetarian menu and is close to a lake . It is located 10 min from here and the google community rated it with 4 stars. Do you want to try it?")
        this.turnVolumeOff()
      }


      else if(x[i] == "journey"){
        console.log("journey")
        this.turnVolumeON()
        this.texttospeech.speak("Great.Do you want to rate your stay at the Waldcafé?")
        this.turnVolumeOff()
      }

      else if(x[i] == "vegetarian"){
        console.log("vegetarian")
        this.turnVolumeON()
        this.texttospeech.speak("Thank you I will add it to the google recommendation of the Waldcafé.")
        this.turnVolumeOff()
      }
      
      else if(x[i] == "bad"){
        console.log("bad")
        this.turnVolumeON()
        this.texttospeech.speak("The sight of the upcoming route is very bad due to heavy rain and the sunset. You have been driving for 2 hours. Do you prefer to take a safer route?")
        this.turnVolumeOff()
      }

      
      else if(x[i] == "bucket"){
        console.log("bucket")
        this.turnVolumeON()
        this.texttospeech.speak("Done. You can pick up in 30 minutes at Hornbach Tübingen. I changed the route accordingly.")
        this.turnVolumeOff()
      }

      
      else if(x[i] == "upcoming "){
        console.log("upcoming")
        this.turnVolumeON()
        this.texttospeech.speak("We arrived. Should I save details of this trip in your favourites for upcoming ones?")
        this.turnVolumeOff()
      }





    }

    
  }

}