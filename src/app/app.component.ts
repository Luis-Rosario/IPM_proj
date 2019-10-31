import { Component } from '@angular/core';
import { SessionQuery } from './core/state/session.query';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private sessionQuery: SessionQuery,
  ) { }

  ngOnInit(): void {


  }

  isLogged(): Boolean {
    return this.sessionQuery.getValue().logged;
  }
}
