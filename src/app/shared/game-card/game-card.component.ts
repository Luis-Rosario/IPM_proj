import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
declare const $: any;
import * as bootstrap from "node_modules/bootstrap/js/dist/";
import { Router } from "@angular/router";
import { SessionQuery } from "src/app/core/state/session.query";

declare const getActiveGameLenders;
declare const getDistanceByUser;
declare const pagesFunctions;
declare const createRentalProposal;
declare const getGameDescription: any;
declare const getUser;
declare const getRentalDaysLeft;

@Component({
  selector: "game-card",
  templateUrl: "./game-card.component.html",
  styleUrls: ["./game-card.component.scss"]
})
export class GameCardComponent implements OnInit {
  @Input() gameName: String;
  @Input() gameInfo: any;
  @ViewChild("durationselect", null) durationSelect: ElementRef;
  @ViewChild("distanceselect", null) distanceSelect: ElementRef;

  lendersOfGame: any[] = [];
  loanDuration: any;
  maxDistance: any;
  gameDescription: any;
  url: any = "";
  gameOwner: any;
  lendingDaysLeft: any;
  selectedLoanDuration: any=false;
  constructor(private router: Router, private sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.url = this.router.url;
    /*   console.log("+".repeat(1000));
      console.log(this.gameInfo); */
    this.getLoanInfo(this.gameInfo.user_email);
    this.gameDescription = getGameDescription(this.gameName);

    /*  if(this.url === '/user/library'){ */

    if (!this.gameInfo.active) {
      this.lendingDaysLeft = this.gameInfo.daysLeft; //getRentalDaysLeft(this.gameInfo)
      /*     console.log("---".repeat(1000));
          console.log(this.gameInfo.game_name, this.lendingDaysLeft); */
    }

    /*  console.log(this.lendingDaysLeft) */
    /*   } */
    if (this.url !== "/user/library") {
      this.filterLenders();
    }

    pagesFunctions.gamecard();
  }

  textareaInput(ev) {
    let msg = $(".message-page textarea").val();
    if (msg.length > 0) {
      $(ev.target.parentElement).find(".textarea-error-msg").addClass("hidden");
    }
  }

  modalClick(ev) {
    let msg = $(ev.target.parentElement.parentElement)
      .find("textarea")
      .val();
    if (msg.length == 0) {
      $(".textarea-error-msg").removeClass("hidden");
      return;
    }
    let userEmail = $(ev.target).attr("data-user");
    createRentalProposal(
      userEmail,
      this.sessionQuery.getValue().email,
      this.gameInfo.game_name,
      this.loanDuration,
      msg
    );
    $(".modal").modal("hide");
  }

  openModal(ev) {
    let distanceFilter = $(".result-filter .distance-range").val() - 0;
    let durationFilter = $(".result-filter .loan-range").val() - 0;

    console.log(distanceFilter, durationFilter)
    console.log(window["aa"] = this.durationSelect.nativeElement)
    console.log(window["bb"] = this.distanceSelect.nativeElement)
    if (durationFilter)
      $($(this.durationSelect.nativeElement).find("option")[Math.round(durationFilter)]).attr("selected", "selected")
    if (distanceFilter)
      $($(this.distanceSelect.nativeElement).find("option")[Math.round(distanceFilter / 50)]).attr("selected", "selected")

    if (
      !$(ev.target.parentElement.parentElement.parentElement).hasClass(
        "non-click"
      )
    ) {
      $(ev.target.parentElement.parentElement)
        .find(".game-page")
        .fadeToggle();
    } else {
      this.router.navigateByUrl("/user/library");
    }
  }

  openMessageModal(ev) {
    let gameCard = ev.target;
    let limit = 1;
    while (!$(gameCard).hasClass("user") && limit++ < 20) {
      gameCard = gameCard.parentElement;
    }
    console.log("openmsgmodal", this.loanDuration);
    if (this.loanDuration == 0) {
      $(".loan-error-msg").removeClass("hidden");
      //$('.game-page .game-col').scrollTo('.loan-error-msg');
      return;
    } else {
      /*     $(".game-page").fadeOut(); */
      $(gameCard)
        .find(".message-page")
        .modal("show");
    }
  }

  filterLenders() {
    //magia n tirar
    setTimeout(() => {
      this.loanDuration = Number(
        (<HTMLInputElement>this.durationSelect.nativeElement).value
      );
      if(this.loanDuration == 0){
        this.selectedLoanDuration = false;
      }
      
      this.maxDistance = Number(
        (<HTMLInputElement>this.distanceSelect.nativeElement).value
      );
      if (this.loanDuration > 0) {
        $(".loan-error-msg").addClass("hidden");
        this.selectedLoanDuration = true;
      }
      this.lendersOfGame = getActiveGameLenders(
        this.gameName,
        this.sessionQuery.getValue().email,
        {
          distance: this.maxDistance,
          duration: this.loanDuration
        }
      )
    }, 10);


  }

  closeModal(ev) {
    $(".modal").modal("hide");
  }

  getLoanInfo(userName) {
    this.gameOwner = getUser(userName);
  }

  lessThanOne(x) {
    return x < 1;
  }
}

/* FORMATO DE UM JOGO DO USER
active: true
category: (3) ["A", "B", "C"]
console: (2) ["PSP", "Switch"]
duration_range: (2) [3, 6]
game_name: "Smash"
image_url: "url.com/image"
user_email: "a@a.com"
year: 2019 */
