import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges
} from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { SessionService } from "src/app/core/state/session.service";
//declare const $: any;

declare const getUser: any;
declare const getNotifications;
declare const onDataChange;
declare const $: any;
declare const showToast: any;

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
  consoles: any[] = [
    "PS4",
    "Nintendo Switch",
    "PC",
    "Xbox One",
    "Xbox 360",
    "PS3",
    "PSP"
  ];

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

  updateNotifications() {
    this.notifications = getNotifications(this.email);
    let count = this.notifications.filter(e => !e.read).length;
    $(".nav .fa-bell").removeClass("active")
    if (count) {
      $(".nav .fa-bell").addClass("active");
      $(".nav .fa-bell").attr('data-content', count)
    }
  }

  ngOnInit() {
    this.url = this.router.url;
    this.email = this.sessionQuery.getValue().email; //na store estara guardado o email
    this.userInfo = getUser(this.email);
    onDataChange(() => {
      this.updateNotifications();
    })
    this.updateNotifications();


    $(".selectpicker").selectpicker();

    setTimeout(() => {
      $(".nav .bootstrap-select select").on("change", () => {
        /*    console.log("k".repeat(500));
           console.log(this.router.url) */
        if (this.router.url.includes("browse")) {

          this.updateFilters();

        } else {
          this.searchGame(true);
        }
      })
    }, 500);
    //very important function best function ever makes everything work :)
    setInterval(() => { }, 400);

    /*  console.log(this.notifications) */
  }
  getUser(e) {
    return getUser(e)
  }

  updateFilters() {
    this.router.navigate(["browse"], {
      queryParams: {
        gameName: this.search.nativeElement.value,
        consoles: this.getConsolesSelected(),
        categories: [],
        distance: 50000,
        duration: 0,
        byUser: this.email
      }
    });
  }

  searchGame(force = false) {
    if (!force && this.search.nativeElement.value.length == 0) {
      this.router.navigate(["home"]);
    } else {
      this.updateFilters();
    }
  }

  logout() {
    this.sessionService.logout();
    this.router.navigateByUrl("/login");
  }

  toggleNotifications() {
    $(".notifications").toggleClass("hidden");
    $(".fa-bell").toggleClass("clicked")
  }

  clickNotification(notification) {
    this.toggleNotifications();

    this.router.navigate(["user/inbox"], {
      queryParams: {
        game: notification.game,
        otherUser: notification.otherUser,
        myRole: notification.myRole
      }
    });
  }

  getConsolesSelected() {

    return $(".bootstrap-select select").val();

  }

  reedemPoints() {
    showToast("Not implemented, Coming Soon")
  }
}
