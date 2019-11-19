import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';
declare const $: any;

declare const getChat: any;
declare const getUser: any;
declare const onDataChange: any;
declare const getRentalStatus: any;
declare const getGameDescription: any;
declare const getRentalDuration: any;

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
  gameDescription: any;
  loanDuration: any;

  constructor(
    private sessionQuery: SessionQuery,
  ) { }


  getDuration(lender, borrower, game) {
    if (!lender)
      lender = this.sessionQuery.getValue().email;
    if (!borrower)
      borrower = this.sessionQuery.getValue().email;
    return getRentalDuration(lender, borrower, game);
  }

  main() {
    /*    console.log(this.game) */
    if ($(".user.active").length) {
      var email = $(".user.active").attr("id");
      var event = { target: $(".user.active")[0] }
      this.selectRequest(email, event);
    }
    /*  console.log(this.lender) */
  }

  ngOnInit() {
    this.getUsers();

    this.gameDescription = getGameDescription(this.game.game_name)
    console.log(this.gameDescription)
    onDataChange(this.main.bind(this))
    //very important function best function ever makes everything work :)
    setInterval(() => { }, 400);
  }

  ngOnChanges() {
    this.users = [];
    this.ngOnInit();
  }


  getUsers() {
    let index = 0;
    let keys = Object.keys(this.messages);
    let user;

    for (user of keys) {
      this.users[index] = getUser(user);
      if (this.lender) {
        this.users[index]["rental_state"] = getRentalStatus(this.sessionQuery.getValue().email, user, this.game.game_name)
      }
      if (!this.lender) {
        this.users[index]["rental_state"] = getRentalStatus(user, this.sessionQuery.getValue().email, this.game.game_name)
      }

      this.userRequestInfo.set(user, this.messages[user])


      index++;
    }

    console.log(this.users)
  }

  selectRequest(userRequest, event) {

    $(".request-list .user").removeClass("active")
    if (event != "") {
      //var target = event.target.classList.contains("user") ? event.target : event.target.parentElement;
      let target = event.target;
      let limit = 1;
      while (!$(target).hasClass("user") && limit++ < 20) {
        target = target.parentElement;
      }
      target.classList.add("active")
    }

    if (this.lender)
      this.chatMessages = getChat(this.sessionQuery.getValue().email, userRequest, this.game.game_name)

    if (!this.lender)
      this.chatMessages = getChat(userRequest, this.sessionQuery.getValue().email, this.game.game_name)

    this.selectedPerson.emit([this.chatMessages, userRequest])
    setTimeout(() => {
      document.querySelector(".chat-list").scrollTo(0, 1000000)
    }, 100);
  }

  refresh() {
    this.getUsers();
  }

}
