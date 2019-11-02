import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';

declare const getGamesLending: any;
declare const getGamesBorrowing: any;

@Component({
  selector: 'library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class LibraryComponent implements OnInit {

  lendingGamesInfo: Map<String, any> = new Map();
  lendingGames: String[] = [];

  borrowingGamesInfo: Map<String, any> = new Map();
  borrowingGames: String[] = [];
  
  user: any;

  constructor(
    private sessionQuery: SessionQuery,
  ) { }


  ngOnInit() {
    this.user = this.sessionQuery.getValue().email;
    this.getLendingGames();
    this.getBorrowingGames();
  }


  getLendingGames() {
    let game;
    let myGamesJSON = getGamesLending(this.user);
    let index = 0;
    let keys = Object.keys(myGamesJSON);


    for (game of keys) {
      this.lendingGames[index] = game;
      this.lendingGamesInfo.set(game, myGamesJSON[game])

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
      this.borrowingGamesInfo.set(game, myBorrowedGamesJSON[game])

      index++;
    }
  }
}
