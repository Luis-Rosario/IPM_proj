import { Component, OnChanges } from '@angular/core';
import { SessionQuery } from './core/state/session.query';
declare const $: any;
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

  goDark() {
    $("#goLight").addClass("active")
    $("#goDark").removeClass("active")
    $("html").css("filter", "invert(1)")
    $("#root-body").addClass("dark-mode")
  }

  goLight() {
    $("#goDark").addClass("active");
    $("#goLight").removeClass("active")
    $("html").css("filter", "invert(0)")
    $("#root-body").removeClass("dark-mode")
  }



  isLogged(): Boolean {
    return this.sessionQuery.getValue().logged;
  }
}
