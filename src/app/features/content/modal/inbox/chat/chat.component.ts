import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const sendMsg;
declare const acceptRental;
declare const refuseRental;
declare const markChatAsReadBorrower;
declare const markChatAsReadLender;
declare const showToast;
declare const getRentalStatus;
declare const getRentalDuration;
declare const getLendingTo;
declare const onDataChange;
declare const $: any;
declare const getUser: any;
declare const markGameAsReturned: any;
declare const markGameAsCanceled: any;

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
  @Output() acceptedRental = new EventEmitter();

  loanState: any;
  choosen: any = false;
  targetPersonName: String;
  duration: any;
  showReturnBanner: any;
  showCancelBanner: boolean = false;
  constructor() { }

  ngOnInit() {

    this.isLoanPast();
    console.log(this.game)
    this.showReturnBanner = (!this.game.active && this.loanState == 'accepted')
    this.showCancelBanner = (this.loanState == 'pending')
    console.log(!this.game.active, this.loanState)
    if (this.lender)
      markChatAsReadLender(this.chat);
    else
      markChatAsReadBorrower(this.chat);

    onDataChange(() => {
      console.log("chat datachange hook")
      setTimeout(() => {
        document.querySelector(".chat-list").scrollTo(0, 1000000);
      }, 200)
      setTimeout(() => {
        document.querySelector(".chat-list").scrollTo(0, 1000000);
      }, 1000)
    })

    setTimeout(() => { }, 10);
    this.targetPersonName = getUser(this.targetPerson).first_name + " " + getUser(this.targetPerson).last_name;
  }

  ngOnChange() {
    console.log("changed chat");
    this.ngOnInit();
    //this.isLoanPast();
  }


  sendMessage(event) {
    if (event.type == 'click' || (event.type == 'keyup' && event.key == 'Enter')) {
      let msg = (<HTMLInputElement>document.getElementById("chat-input")).value;
      if (msg.length >= 1) {
        setTimeout(() => {
          document.querySelector(".chat-list").scrollTo(0, 1000000)
        }, 100);

        if (!this.lender) {
          /*   this.chat.push({ user: "borrower", content: (<HTMLInputElement>document.getElementById("chat-input")).value, date: "", time: "" }) */
          sendMsg(this.targetPerson, this.loggedUser, msg, this.game.game_name, "borrower");
        }

        else {
          /*    this.chat.push({ user: "lender", content: (<HTMLInputElement>document.getElementById("chat-input")).value, date: "", time: "" }) */
          sendMsg(this.loggedUser, this.targetPerson, msg, this.game.game_name, "lender");
        }
        (<HTMLInputElement>document.getElementById("chat-input")).value = null;
      }
    }
  }

  acceptModal() {
    $(".accept-loan-modal").modal("show");
  }

  refuseModal() {
    $(".refuse-loan-modal").modal("show");
  }

  returnModal() {
    $(".mark-returned-modal").modal("show");
  }
  cancelModal() {
    $(".mark-cancel-modal").modal("show");
  }

  acceptLoan() {
    this.choosen = true;
    this.showReturnBanner = true;
    console.log(this.showReturnBanner)
    acceptRental(this.loggedUser, this.targetPerson, this.game.game_name);
    this.acceptedRental.emit({ lender: this.loggedUser, borrower: this.targetPerson, game: this.game.game_name })
    $(".modal").modal("hide")
    showToast("Loan accepted!")
  }

  markReturned() {
    let myMail = this.loggedUser
    let borrower = getLendingTo(myMail)[this.game.game_name];
    let borrowerName = getUser(borrower).first_name + " " + getUser(borrower).last_name;
    /* console.log("i marked the game as returned", borrowerName); */
    setTimeout(() => {
      $("#rate-borrower").modal("show");
      $("#rate-borrower .error-message").hide();
      $("#rate-borrower").attr("data-email", borrower);
      $("#rate-borrower").attr("data-type", "borrower");
      $("#rate-borrower .modal-header").text("Rate " + borrowerName);
    }, 100)
    markGameAsReturned(this.loggedUser, this.game.game_name)
    this.showReturnBanner = false;
    this.acceptedRental.emit({ lender: this.loggedUser, borrower: this.targetPerson, game: this.game.game_name })
    //chamar funcção de marcar jogo como devolvido
    $(".modal").modal("hide")
    showToast("Game Returned")
  }

  markCancel() {
    markGameAsCanceled(this.targetPerson, this.loggedUser, this.game.game_name)
    this.showCancelBanner = false;
    this.acceptedRental.emit({ lender: this.loggedUser, borrower: this.targetPerson, game: this.game.game_name })
    $(".modal").modal("hide")
    showToast("Game request successfully canceled")
  }

  refuseLoan() {
    this.choosen = true;
    refuseRental(this.loggedUser, this.targetPerson, this.game.game_name);
    $(".modal").modal("hide")
    showToast("Loan refused!")
  }

  isLoanPast() {
    if (!this.lender) {
      this.loanState = getRentalStatus(this.targetPerson, this.loggedUser, this.game.game_name)
      console.log(this.loanState)
    }
    else {
      this.loanState = getRentalStatus(this.loggedUser, this.targetPerson, this.game.game_name)
      console.log(this.loanState)
    }

    this.showReturnBanner = (!this.game.active && this.loanState == 'accepted')

  }

  closeModal() {
    $(".modal").modal("hide")
  }

}
