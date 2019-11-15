import { Component, OnChanges } from '@angular/core';
import { SessionQuery } from './core/state/session.query';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  url: any = ""
  constructor(
    private sessionQuery: SessionQuery,
    private router: Router,
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    }
    )
  }

  ngOnInit(): void {
    /* setTimeout(()=>{
      $('<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>').appendTo(document.body);
    },200); */
  }


  isLogged(): Boolean {
    return this.sessionQuery.getValue().logged;
  }
}
