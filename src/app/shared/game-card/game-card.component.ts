import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import * as $ from "jquery";
import * as bootstrap from "node_modules/bootstrap/js/dist/";
import { Router } from "@angular/router";
import { SessionQuery } from "src/app/core/state/session.query";

declare const getGameLenders;
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

  constructor(private router: Router, private sessionQuery: SessionQuery) {}

  ngOnInit() {
    this.url = this.router.url;
    console.log("+".repeat(1000));
    console.log(this.gameInfo);
    this.getLoanInfo(this.gameInfo.user_email);
    this.gameDescription = getGameDescription(this.gameName);

    /*  if(this.url === '/user/library'){ */

    if (!this.gameInfo.active) {
      this.lendingDaysLeft = this.gameInfo.daysLeft; //getRentalDaysLeft(this.gameInfo)
      console.log("---".repeat(1000));
      console.log(this.gameInfo.game_name, this.lendingDaysLeft);
    }

    /*  console.log(this.lendingDaysLeft) */
    /*   } */
    if (this.url !== "/user/library") {
      this.filterLenders();
    }

    pagesFunctions.gamecard();
  }

  modalClick(ev) {
    let msg = $(ev.target.parentElement.parentElement)
      .find("textarea")
      .val();
    let userEmail = $(ev.target).attr("data-user");
    createRentalProposal(
      userEmail,
      this.sessionQuery.getValue().email,
      this.gameInfo.game_name,
      this.loanDuration,
      msg
    );
    $(".modal").fadeOut();
  }

  openModal(ev) {
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
    /*     $(".game-page").fadeOut(); */
    let gameCard = ev.target;
    let limit = 1;
    while ($(gameCard).hasClass("game-page") && limit++ < 20) {
      gameCard = ev.target.parentElement;
    }
    $(gameCard)
      .find(".message-page")
      .fadeToggle();
  }

  filterLenders() {
    //magia n tirar
    setTimeout(() => {
      this.loanDuration = Number(
        (<HTMLInputElement>this.durationSelect.nativeElement).value
      );
      this.maxDistance = Number(
        (<HTMLInputElement>this.distanceSelect.nativeElement).value
      );
    }, 1);

    this.lendersOfGame = getGameLenders(
      this.gameName,
      this.sessionQuery.getValue().email,
      {
        distance: this.maxDistance,
        duration: this.loanDuration
      }
    );
  }

  closeModal(ev) {
    $(".modal").fadeOut();
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
