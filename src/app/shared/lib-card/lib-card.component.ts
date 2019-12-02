import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
declare const $: any;

declare const deleteGame;
declare const pagesFunctions: any;
declare const markGameAsReturned;
declare const showToast;
declare const getGameDescription: any;
declare const getLendingTo: any;
declare const getUser: any;
declare const returnModal: any;

@Component({
  selector: "lib-card",
  templateUrl: "./lib-card.component.html",
  styleUrls: ["./lib-card.component.scss"]
})
export class LibCardComponent implements OnInit {
  @Input() gameName: any;
  @Input() gameInfo: any;
  @Output() change = new EventEmitter();

  description: any

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit() {
    console.log(this.gameName, this.gameInfo)

    /*    console.log(this.gameInfo); */
    var els = document.querySelectorAll(".pill");
    for (let i = 0; i < els.length; i++) {
      els[i].classList.toggle("active");
    }
    /* console.log("rreeeeeeeeeeeeee",this.gameName) */
    this.description = getGameDescription(this.gameName)
  }

  deleteGame() {
    deleteGame(this.sessionQuery.getValue().email, this.gameName);
    this.closeModal()
    this.change.emit();
  }

  markAsReturned() {
    let myMail = this.sessionQuery.getValue().email;
    let borrower = getLendingTo(myMail)[this.gameName];
    let borrowerName = getUser(borrower).first_name + " " + getUser(borrower).last_name;
    /* console.log("i marked the game as returned", borrowerName); */
    setTimeout(() => {
      $("#rate-borrower").modal("show");
      $("#rate-borrower .error-message").hide();
      $("#rate-borrower").attr("data-email", borrower);
      $("#rate-borrower").attr("data-type", "borrower");
      $("#rate-borrower .modal-header").text("Rate " + borrowerName);
    }, 100)
    markGameAsReturned(this.sessionQuery.getValue().email, this.gameName);
    showToast("Game Returned");
    this.change.emit();
  }

  // infoModalClick(event){
  //   $(event.target.parentElement.parentElement).find(".show-modal").fadeToggle(); 
  // }

  // returnModalClick(event){
  //   $(event.target.parentElement.parentElement).find(".return-modal").fadeToggle(); 
  // }

  // deleteModalClick(event){
  //   $(event.target.parentElement.parentElement).find(".delete-modal").fadeToggle(); 
  // }

  closeModal() {
    $(".modal").modal("hide");
  }
}
