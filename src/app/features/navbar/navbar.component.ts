import { Component, OnInit, ViewChild, ElementRef, OnChanges } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { SessionService } from "src/app/core/state/session.service";
import * as $ from 'jquery';

declare const getUser: any;
declare const getNotifications;


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  @ViewChild("search", null) search: ElementRef;

  email: String;
  userInfo: any;
  url: any = "";
  notifications: any[] = [];


  constructor(
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private router: Router
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd && !val.url.startsWith("/browse?")) {
        this.search.nativeElement.value = null;
      }
    });
  }

  ngOnInit() {
    this.url = this.router.url;
    this.email = this.sessionQuery.getValue().email; //na store estara guardado o email
    this.userInfo = getUser(this.email);
    this.notifications = getNotifications(this.email);
    console.log(this.notifications)
  }

  searchGame() {
    if (this.search.nativeElement.value.length == 0) {
      this.router.navigate(["home"]);
    } else {
      this.router.navigate(["browse"], {
        queryParams: {
          gameName: this.search.nativeElement.value,
          consoles: [],
          categories: [],
          distance: 50000,
          duration: 0,
          byUser: this.email
        }
      });
    }
  }

  logout() {
    this.sessionService.logout();
    this.router.navigateByUrl("/login");
  }

  toggleNotifications() {
    if ($(".notifications").hasClass("hidden"))
      $(".notifications").removeClass("hidden")

    else {
      $(".notifications").addClass("hidden")
    }
  }

  clickNotification(notification){

    this.router.navigate(["user/inbox"], {
      queryParams: {
        game:notification.game,
        otherUser: notification.otherUser,
        myRole: notification.myRole,
      }
    });
  }
}
