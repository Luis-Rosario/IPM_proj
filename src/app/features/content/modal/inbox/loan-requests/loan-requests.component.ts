import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';
import * as $ from 'jquery';

declare const getChat: any;
declare const getUser: any;
declare const onDataChange: any;

@Component({
  selector: 'loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.scss']
})
export class LoanRequestsComponent implements OnInit {
  @Input() messages: any;
  @Input() game: any;
  @Input() lender: any;
  @Output() selectedPerson = new EventEmitter();

  users: any[] = [];
  userRequestInfo: Map<String, any> = new Map();
  chatMessages: any;


  constructor(
    private sessionQuery: SessionQuery,
  ) { }

  main(){
    console.log(this.game)
    if($(".user.active").length){
     var email = $(".user.active").attr("id");
     var event = {target: $(".user.active")[0]}
     this.selectRequest(email,event);
    }
    console.log(this.lender)
  }

  ngOnInit() {
    this.getUsers();
    onDataChange(this.main.bind(this))
    //very important function best function ever makes everything work :)
    setInterval(()=>{},400);
  }


  getUsers() {
    let index = 0;
    let keys = Object.keys(this.messages);
    let user;

    for (user of keys) {
      this.users[index] =  getUser(user);
      this.userRequestInfo.set(user, this.messages[user])

      index++;
    }

    console.log(this.users)
  }

  selectRequest(userRequest, event) {

    $(".request-list .user").removeClass("active")
    var target = event.target.classList.contains("user") ? event.target : event.target.parentElement;
    target.classList.add("active")
    console.log(this.lender)

    if (this.lender)
      this.chatMessages = getChat(this.sessionQuery.getValue().email, userRequest, this.game.game_name)

    if (!this.lender)
      this.chatMessages = getChat(userRequest, this.sessionQuery.getValue().email, this.game.game_name)

    this.selectedPerson.emit(this.chatMessages)
    setTimeout(()=>{
      document.querySelector(".chat-list").scrollTo(0,1000000)
    },100);
  }

}
