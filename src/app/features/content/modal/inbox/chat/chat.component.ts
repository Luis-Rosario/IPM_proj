import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chat: any;

  constructor() { }

  ngOnInit() {
    console.log(this.chat)
  }

  
  

}
