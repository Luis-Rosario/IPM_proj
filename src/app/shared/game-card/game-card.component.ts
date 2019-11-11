import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import * as bootstrap from 'node_modules/bootstrap/js/dist/';

declare const getAllGameLenders;

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

  constructor() { }

  ngOnInit() {
    this.lendersOfGame = getAllGameLenders(this.gameName);
  }

  modalClick(ev){
    if($(ev.target).hasClass("modal")){
      $(".modal").fadeOut();
    }
  }
  
  openModal(ev) {
    $(ev.target.parentElement.parentElement).find(".game-page").fadeToggle(); 
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
