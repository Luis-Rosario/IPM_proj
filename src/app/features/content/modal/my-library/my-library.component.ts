import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';
/* import { GameCardComponent } from 'src/app/shared/game-card/game-card.component'; */

declare const getGamesLending: any;
declare const getGamesBorrowing: any;

@Component({
  selector: 'library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class LibraryComponent implements OnInit {

  myGames: any[]
  borrowedGames: any;
  user: any;

  constructor(
    private sessionQuery: SessionQuery,
  ) { }


  ngOnInit() {
    this.user = this.sessionQuery.getValue().email;
    this.myGames = getGamesLending(this.user);
       
    
  /*   this.borrowedGames =getGamesBorrowing(this.user);  ta a dar erro*/
  console.log(this.myGames)
    console.log(getGamesLending(this.user))
  }

}
/* Smash:
active: true
category: (3) ["A", "B", "C"]
console: (2) ["PSP", "Switch"]
duration_range: (2) [3, 6]
game_name: "Smash"
image_url: "url.com/image"
user_email: "a@a.com"
year: 2019 */