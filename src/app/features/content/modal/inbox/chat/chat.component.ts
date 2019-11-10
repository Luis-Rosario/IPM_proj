import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chat: any;
  @Input() lender: any;

  constructor() { }

  ngOnInit() {
    console.log(this.chat)
  }

  sendMessage() {
    if (!this.lender)
      this.chat.push({ user: "borrower", content: (<HTMLInputElement>document.getElementById("chat-input")).value, date: "", time: "" })

    else
      this.chat.push({ user: "lender", content: (<HTMLInputElement>document.getElementById("chat-input")).value, date: "", time: "" })

      (<HTMLInputElement>document.getElementById("chat-input")).value = null;
  }


}
