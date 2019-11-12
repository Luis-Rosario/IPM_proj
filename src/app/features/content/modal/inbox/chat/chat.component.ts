import { Component, OnInit, Input } from '@angular/core';

declare const sendMsg;

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chat: any;
  @Input() lender: any;
  @Input() loggedUser: any;
  @Input() targetPerson: any;
  @Input() game: any;

  constructor() { }

  ngOnInit() {
    console.log(this.game)
  }

  sendMessage(event) {
    if (event.type == 'click' || (event.type == 'keyup' && event.key == 'Enter')) {
      setTimeout(()=>{
        document.querySelector(".chat-list").scrollTo(0,1000000)
      },100);

      if (!this.lender) {
      /*   this.chat.push({ user: "borrower", content: (<HTMLInputElement>document.getElementById("chat-input")).value, date: "", time: "" }) */
        sendMsg(this.targetPerson, this.loggedUser, (<HTMLInputElement>document.getElementById("chat-input")).value, this.game.game_name, this.lender);
      }

      else {
     /*    this.chat.push({ user: "lender", content: (<HTMLInputElement>document.getElementById("chat-input")).value, date: "", time: "" }) */
        sendMsg(this.loggedUser, this.targetPerson, (<HTMLInputElement>document.getElementById("chat-input")).value, this.game.game_name, this.lender);
      }
      (<HTMLInputElement>document.getElementById("chat-input")).value = null;
    }
  }

}
