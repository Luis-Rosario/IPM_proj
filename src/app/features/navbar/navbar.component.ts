import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { SessionService } from 'src/app/core/state/session.service';

declare const getUser: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('search', null) search: ElementRef;

  email: String;
  userInfo: any;
  url: any;

  constructor(
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if ((val instanceof NavigationEnd) && (!val.url.startsWith("/browse?"))) {
        this.search.nativeElement.value = null;
      }

    });
  }

  ngOnInit() {
    this.email = this.sessionQuery.getValue().email; //na store estara guardado o email
    this.userInfo = getUser(this.email);
    this.url = window.location.href;
  }

  searchGame() {
    if (this.search.nativeElement.value.length == 0) {

      this.router.navigate(["home"])
    }
    else {

      this.router.navigate(['browse'], {
        queryParams: {
          "gameName": this.search.nativeElement.value,
          "consoles": [],
          "categories": [],
          "distance": 50000,
          "duration": [0, 1000],
          "byUser": this.email,
        }
      });
    }


  }

  logout(){
    this.sessionService.logout();
    this.router.navigateByUrl("/login")
  }
}
