import { Component, OnInit } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
import * as $ from "jquery";

declare const getGamesLending: any;
declare const getGamesBorrowing: any;
declare const pagesFunctions: any;
declare const addGame: any;

@Component({
  selector: "library",
  templateUrl: "./my-library.component.html",
  styleUrls: ["./my-library.component.scss"]
})
export class LibraryComponent implements OnInit {
  lendingGamesInfo: Map<String, any> = new Map();
  lendingGames: String[] = [];

  borrowingGamesInfo: Map<String, any> = new Map();
  borrowingGames: String[] = [];

  user: any;

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.user = this.sessionQuery.getValue().email;
    this.getLendingGames();
    this.getBorrowingGames();

    pagesFunctions.libraryPage();
  }

  getLendingGames() {
    let game;
    let myGamesJSON = getGamesLending(this.user);
    let index = 0;
    let keys = Object.keys(myGamesJSON);

    for (game of keys) {
      this.lendingGames[index] = game;
      this.lendingGamesInfo.set(game, myGamesJSON[game]);
      /* console.log(this.lendingGames) */
      index++;
    }

  }

  getBorrowingGames() {
    let game;
    let myBorrowedGamesJSON = getGamesBorrowing(this.user);
    let index = 0;
    let keys = Object.keys(myBorrowedGamesJSON);

    for (game of keys) {
      this.borrowingGames[index] = game;
      this.borrowingGamesInfo.set(game, myBorrowedGamesJSON[game]);

      index++;
    }
  }

  isAvailable(game) {
    return this.lendingGamesInfo.get(game).active;
  }

  addGame() {

    let name = (<HTMLInputElement>document.getElementById("name")).value
    let year = (<HTMLInputElement>document.getElementById("year")).value
    let categories = [];
    

    for(var i=0;i<$("#new-game-modal .pill.active").length;i++){
      var el = $("#new-game-modal .pill.active").eq(i).text();
      categories.push(el)
    }

    var range = $("#new-game-modal .duration-range").val().split(",")
    range[0]-=0;
    range[1]-=0;

    var jsonGame ={
      "user_email": this.user, 
      "game_name": name,
      "year": year,
      "category": categories,
      "console": "",
      "image_url": "assets/llamma.png",
      "duration_range": range,
      "active": true,
      "warned": false,
      "endDate": "",
    }
    addGame(this.user, jsonGame);
    
    this.ngOnInit();
  }
}
