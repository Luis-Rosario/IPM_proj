import { Component, OnInit, Input } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
import * as $ from "jquery";

declare const deleteGame;

declare const pagesFunctions: any;
@Component({
  selector: "lib-card",
  templateUrl: "./lib-card.component.html",
  styleUrls: ["./lib-card.component.scss"]
})
export class LibCardComponent implements OnInit {
  @Input() gameName: String;
  @Input() gameInfo: any;

  constructor(private sessionQuery: SessionQuery) {}

  ngOnInit() {
    pagesFunctions.libCard();
    var els = document.querySelectorAll(".pill");
    for (let i = 0; i < els.length; i++) {
      els[i].classList.toggle("active");
    }
  }

  deleteGame() {
    deleteGame(this.sessionQuery.getValue().email, this.gameName);
    this.ngOnInit();
    this.closeModal()
  }

  infoModalClick(event){
    $(event.target.parentElement.parentElement).find(".show-modal").fadeToggle(); 
  }

  returnModalClick(event){
    $(event.target.parentElement.parentElement).find(".return-modal").fadeToggle(); 
  }

  deleteModalClick(event){
    $(event.target.parentElement.parentElement).find(".delete-modal").fadeToggle(); 
  }

  closeModal(){
    $(".modal").fadeOut();
  }
}
