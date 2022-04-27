import { Injectable } from '@angular/core';
import {LexRuntime} from 'aws-sdk';
import { keys } from 'src/environments/keys';

@Injectable({
  providedIn: 'root'
})
export class BotService{

  lex: LexRuntime;
  userInput: string = "";
  public messages: Message[] = [];
  lexState: string = "Hi what would you like to do";
  

  constructor() { }




  async postLexText(text:string) {

    if(text.length < 1) return
    this.messages.push(new Message(text,'User'));
  
    var params = {
      botName: 'francis', 
      botAlias: '\$LATEST', 
      inputText: '', 
      userId: 'LexBotUser',
    };
    this.lex = new LexRuntime({
      accessKeyId: keys.BotAccessKeyId,
      secretAccessKey: keys.BotSecretAccessKey,
      region: keys.Botregion
    });
    params.inputText= text;
    this.lex.postText(params, (err, data)=>{
      if (err){
        console.log(err, err.stack); // an error occurred
      }
      else {
        this.lexState = data.message;
      try{
        const msgs = JSON.parse(this.lexState)
        console.log(msgs)
        for(let i = 0; i < msgs.messages.length; i++){
          this.messages.push(new Message(msgs.messages[i].value,'Bot'))
        }
      }catch(err){
        try{
          this.messages.push(new Message(this.lexState,'Bot'))
        }
        catch(err2){
          console.log(err2)
        }
      }


      }
    });

  }

  

}


export class Message {
  constructor(public content: string, public sender: string) {}
  }