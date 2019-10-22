import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  
  borrowedGames: any[];
  chats: any[];
  lentGames: any[];

  constructor() { }

  ngOnInit() {



  }

}
