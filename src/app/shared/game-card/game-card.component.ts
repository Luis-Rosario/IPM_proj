import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import * as bootstrap from 'node_modules/bootstrap/js/dist/';
import { Router } from '@angular/router';
import { SessionQuery } from 'src/app/core/state/session.query';

declare const getGameLenders;
declare const getDistanceByUser;

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() gameName: String;
  @Input() gameInfo: any
  display = 'none';

  lendersOfGame: any[] = [];
  loanDuration: any;
  maxDistance: any;

  constructor(
    private router: Router,
    private sessionQuery: SessionQuery, ) { }

  ngOnInit() {
    this.filterLenders();
    /*  console.log(this.gameInfo)
     console.log(this.loanDuration)
     console.log(this.maxDistance) */
  }

  modalClick(ev) {
    if ($(ev.target).hasClass("modal")) {
      $(".modal").fadeOut();
    }
  }

  openModal(ev) {
    if (!$(ev.target.parentElement.parentElement.parentElement).hasClass("non-click")) {
      $(ev.target.parentElement.parentElement).find(".game-page").fadeToggle();
    }
    else {
      this.router.navigateByUrl("/user/library");
    }
  }

  openMessageModal(ev) {
    /*     $(".game-page").fadeOut(); */
    let gameCard = ev.target;
    while($(gameCard).hasClass("game-page")){
      gameCard = ev.target.parentElement;
    }
    console.log(window["aa"] = $(gameCard).find(".message-page"))
    $(gameCard).find(".message-page").fadeToggle();
    alert("Say something to the lender, isto n esta fazer popUp do novo modal")
  }

  filterLenders() {
    this.loanDuration = Number((<HTMLInputElement>document.getElementById("duration-select")).value);
    this.maxDistance = Number((<HTMLInputElement>document.getElementById("distance-select")).value);
    this.lendersOfGame = getGameLenders(this.gameName, this.sessionQuery.getValue().email, {
      distance:this.maxDistance,
      duration:this.loanDuration
    });

    // this.lendersOfGame = getAllGameLenders(this.gameName);
    // console.log(this.lendersOfGame)
    // var lender = null;
    // var filteredLenders: any = [];
    // for (lender in this.lendersOfGame) {

    //   if (getDistanceByUser(this.lendersOfGame[lender].email, this.sessionQuery.getValue().email) <= this.maxDistance) {
    //     if ((this.loanDuration >= this.gameInfo.duration_range[0]) && (this.loanDuration <= this.gameInfo.duration_range[1])) {
    //       if (this.lendersOfGame[lender].email != this.sessionQuery.getValue().email)
    //         filteredLenders.push(this.lendersOfGame[lender])
    //     }
    //   }
    // }
    // console.log(filteredLenders)
    // this.lendersOfGame = filteredLenders;
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
