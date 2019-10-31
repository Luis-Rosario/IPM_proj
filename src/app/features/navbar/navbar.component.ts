import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: String;

  constructor(
    private sessionQuery: SessionQuery,
  ) { }

  ngOnInit() {
    this.username= this.sessionQuery.getValue().username;
  }

}
