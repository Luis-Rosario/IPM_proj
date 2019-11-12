import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/core/state/session.service";

declare const getGames: any;
declare const getGamesBorrowing: any;
declare const getGamesLending: any;
declare const pagesFunctions: any;

@Component({
  selector: "main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit {
  getAllGames = {
    consoles: [],
    categories: [],
    distance: 50000,
    duration: 0,
    byUser: ""
  };

  featuredGames: any[] = [];
  gamesBorrowed: any[] = [];
  gamesLending: any[] = [];
  lendingGamesInfo: Map<String, any> = new Map();
  borrowingGamesInfo: Map<String, any> = new Map();
  user: any = "";

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.user = this.sessionService.getLoggedUser();
    this.getAllGames.byUser = this.user;
    this.getFeatured();
    this.getBorrowing();
    this.getLending();

    pagesFunctions.libraryPage();
  }

  getFeatured() {
    let games = getGames(this.getAllGames);
    for (let i = 0; i < 5; i++) {
      this.featuredGames.push(games[i]);
    }
  }

  getBorrowing() {
    let game;
    let myBorrowedGamesJSON = getGamesBorrowing(this.user);
    let index = 0;
    let keys = Object.keys(myBorrowedGamesJSON);

    for (game of keys) {
      this.gamesBorrowed[index] = game;
      this.borrowingGamesInfo.set(game, myBorrowedGamesJSON[game]);

      index++;
    }
  }

  getLending() {
    let game;
    let myGamesJSON = getGamesLending(this.user);
    let index = 0;
    let keys = Object.keys(myGamesJSON);

    for (game of keys) {
      this.gamesLending[index] = game;
      this.lendingGamesInfo.set(game, myGamesJSON[game]);

      index++;
    }
    /*   console.log(this.lendingGamesInfo) */
  }
}
