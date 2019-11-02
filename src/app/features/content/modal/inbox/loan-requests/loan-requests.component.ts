import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';

declare const getChat: any;

@Component({
  selector: 'loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.scss']
})
export class LoanRequestsComponent implements OnInit {
  @Input() messages: any;
  @Input() game: any;
  @Output() selectedPerson  = new EventEmitter();
  
  users: any[] = [];
  userRequestInfo: Map<String, any> = new Map();
  chatMessages: any;


  constructor(
    private sessionQuery: SessionQuery,
  ) { }

  ngOnInit() {
    console.log(this.game)
   this.getUsers();
  }


  getUsers(){
    let index = 0;
    let keys = Object.keys(this.messages);
    let user;

    for (user of keys) {
      this.users[index] = user;
      this.userRequestInfo.set(user, this.messages[user])

      index++;
    }


    console.log(this.users)
  }

  selectRequest(userRequest){
    this.chatMessages = getChat(this.sessionQuery.getValue().email, userRequest, this.game.game_name)
    this.selectedPerson.emit(this.chatMessages)
  }

}
