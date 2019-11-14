import { Component, OnChanges } from '@angular/core';
import { SessionQuery } from './core/state/session.query';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private sessionQuery: SessionQuery,
    private router: Router,
  ) { }


  

  ngOnInit(): void {
  /*   setTimeout(()=>{
      $('<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>').appendTo(document.body);
    },200); */
    /* setInterval(()=>{
      this.url = window.location.href;
    },100); */
  }
  

  isLogged(): Boolean {
    return this.sessionQuery.getValue().logged;
  }
}
