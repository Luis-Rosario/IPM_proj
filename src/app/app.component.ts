import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { LoggedInGuard } from './login/logged-in.guard';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  logged: Boolean = false;

  ngOnInit(): void {


  }

  logUser() {
    this.logged = true;
  }
}
