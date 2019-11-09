import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';
import { Router } from '@angular/router';

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

  constructor(
    private sessionQuery: SessionQuery,
    private router: Router
  ) { }

  ngOnInit() {
    this.email = this.sessionQuery.getValue().email; //na store estara guardado o email
    this.userInfo = getUser(this.email);
    /* console.log(this.userInfo) */
  }

  searchGame(event) {
    if(this.search.nativeElement.value.length==0){
      console.log("i'm going home")
      this.router.navigate(["home"])
    }
    else{
      console.log(this.search.nativeElement.value)
      this.router.navigate(['browse'], {
        queryParams: {
          "gameName":  this.search.nativeElement.value,
          "consoles": [],
          "categories": [],
          "distance": 50000,
          "duration": [0, 1000],
          "byUser": this.email,

        }
      });
    }
  

  }

}
