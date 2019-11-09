import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/state/session.service';


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  getAllGames = {
    "consoles": [],
    "categories": [],
    "distance": 50000,
    "duration": [0, 1000],
    "byUser": "",
  }
  
  constructor(
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.getAllGames.byUser = this.sessionService.getLoggedUser();
  }

}
