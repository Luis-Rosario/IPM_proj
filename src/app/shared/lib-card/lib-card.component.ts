import { Component, OnInit, Input } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
import * as $ from "jquery";

declare const deleteGame;

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
    $(".pill").click(function() {
      $(this).toggleClass("active");
    });
  }


  deleteGame(){
    deleteGame(this.sessionQuery.getValue().email,this.gameName)
    this.ngOnInit()
  }

  showInfo(){

  }

  markAsReturned(){

  }

  returnGame(){

  }
}
